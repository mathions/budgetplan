"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Item, GroupedItems } from "@/lib/definitions"
import { postBrafaks, postItems } from "@/lib/service";
import { useState } from "react";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"

export default function Proposal ({ items, uuid, token, office, year } : { items: [Item]; uuid: string, token: string, office: string, year: string }) {
  const [itemsData, setItemsData] = useState<Item[]>(items);
  const [akun, setAkun] = useState("");
  const [file, setFile] = useState<File>()

  const delimiter = ",";
  const tambahAkun = akun.split(delimiter);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>, no_urut: string) => {
    const { name, value } = e.target;

    const editData = itemsData.map((item) =>
      item.no_urut === no_urut && name ? { ...item, [name]: value } : item
    );

    setItemsData(editData);
  };

  const groupedItems: GroupedItems = {};
  let total = 0;

  // Group items based on code_number and then account_number
  itemsData.forEach((item) => {
    if (!groupedItems[item.output_number]) {
      groupedItems[item.output_number] = { name: "", total: 0, codes: {} };
    }
    if (!groupedItems[item.output_number].codes[item.code_number]) {
      groupedItems[item.output_number].codes[item.code_number] = { name: "", total: 0, accounts: {} };
    }
    if (!groupedItems[item.output_number].codes[item.code_number].accounts[item.account_number]) {
      groupedItems[item.output_number].codes[item.code_number].accounts[item.account_number] = { name: "", total: 0, items: [] };
    }
    groupedItems[item.output_number].total += parseInt(item.total_harga, 10);
    groupedItems[item.output_number].name = item.output;
    groupedItems[item.output_number].codes[item.code_number].total += parseInt(item.total_harga, 10);
    groupedItems[item.output_number].codes[item.code_number].name = item.code;
    groupedItems[item.output_number].codes[item.code_number].accounts[item.account_number].total += parseInt(item.total_harga, 10);
    groupedItems[item.output_number].codes[item.code_number].accounts[item.account_number].name = item.account;
    groupedItems[item.output_number].codes[item.code_number].accounts[item.account_number].items.push(item);
    total += parseInt(item.total_harga, 10);
  });

  const addRow = (output_number:string, output:string, code_number: string, code: string, account_number: string, account: string) => {
    const newNoUrut = String(itemsData.length + 1);
    const newRow = { no_urut: newNoUrut, output_number: output_number, output: output, code_number: code_number, code: code, account_number: account_number, account: account, uraian: '', jumlah: '', harga_satuan: '', total_harga: '0' };
    setItemsData([...itemsData, newRow]);
  };

  const deleteRow = (no_urut:string) => {
    const updatedData = itemsData.filter((item) => item.no_urut !== no_urut);
    setItemsData(updatedData);
  };

  const deleteAccount = (account_number:string) => {
    const updatedData = itemsData.filter((item) => item.account_number !== account_number);
    setItemsData(updatedData);
  };
  
  // Function to add a row for a specific code_number
  const addRowForCodeNumber = (code_number: string) => {
    let output_number = '', output = '', code='', account_number = '', account = '';
    // Assign values based on code_number
    switch(code_number) {
      case '055':
        output_number = "6023.EBB.951";
        output = "Layanan Sarana Internal";
        code = "Kendaraan Bermotor Perwakilan RI"
        account_number = "532111";
        account = "Belanja Modal Peralatan dan Mesin";
        break;
      case '056':
        output_number = "6023.EBB.951";
        output = "Layanan Sarana Internal";
        code = "Perangkat Pengolah Data dan Komunikasi Perwakilan"
        account_number = "532111";
        account = "Belanja Modal Peralatan dan Mesin";
        break;
      case '057':
        output_number = "6023.EBB.951";
        output = "Layanan Sarana Internal";
        code = "Peralatan Fasilitas Perkantoran Perwakilan"
        account_number = "532111";
        account = "Belanja Modal Peralatan dan Mesin";
        break;
      case '058':
        output_number = "6023.EBB.971";
        output = "Layanan Prasarana Internal";
        code = "Pembangunan/Renovasi Gedung dan Bangunan Perwakilan RI"
        account_number = "533111";
        account = "Belanja Modal Gedung dan Bangunan";
        break;
      default:
        break;
    }

    // Call addRow with the calculated values
    addRow(output_number, output, code_number, code, account_number, account);
  };

  // Function to add rows for each missing code_number
  const addMissingCodeNumbers = () => {
    ['055', '056', '057', '058'].forEach(code_number => {
      // Check if code_number is not present in itemsData
      if (!itemsData.some(item => item.code_number === code_number)) {
        addRowForCodeNumber(code_number);
      }
    });
  };

  addMissingCodeNumbers();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = async () => {
    setIsLoading(true);
    setError('');
    const newItemsData = itemsData.map(item => {
      const { no_urut, output_number, output, code, account, ...rest } = item;
      return rest;
    });
    function mapCodeNumberToValue(codeNumber:string) {
      switch (codeNumber) {
        case '055':
          return 1;
        case '056':
          return 2;
        case '057':
          return 3;
        default:
          return 4;
      }
    }
    const newData = newItemsData.map(item => ({
      ...item,
      code_number: mapCodeNumberToValue(item.code_number)
    }));

    if (!file) {
      const res1 = await postItems(token, uuid, newItemsData)
      console.log(res1)
      setError(res1?.message);
      setIsLoading(false);
      return;
    }

    try {
      const res1 = await postItems(token, uuid, newItemsData)
      console.log(res1)
      const data = new FormData()
      data.set('file', file)
      console.log(data)
      const res2 = await postBrafaks(token,uuid, data)
      console.log(res2)
      setError('Berhasil mengunggah Brafaks dan memperbarui RAB')
      if (res2.status === 'error') {
        throw new Error('Failed to fetch from API 1');
      }
      console.log('Both requests succeeded');
    } catch (error) {
      setError('File is invalid');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{office}</CardTitle>
          <CardDescription>Tahun Anggaran {year}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <p className="text-sm font-medium leading-none">
              Daftar Isian Pelaksanaan Anggaran (DIPA)
            </p>
            <Input type="file" name="file" className="file-input" onChange={(e) => setFile(e.target.files?.[0])} />
          </div>
          <div className="space-y-3">
            <p className="text-sm font-medium leading-none">
              Rencana Anggaran Biaya
            </p>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell className="w-[100px] text-center font-bold">Kode</TableCell>
                    <TableCell className="text-center font-bold">Uraian RO/Komponen/Akun/Detil</TableCell>
                    <TableCell className="w-[200px] text-center font-bold">Jumlah Unit</TableCell>
                    <TableCell className="w-[200px] text-center font-bold">Harga Satuan</TableCell>
                    <TableCell className="w-[200px] text-center font-bold">Jumlah</TableCell>
                    <TableCell className="w-[100px] text-center font-bold"></TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-center font-semibold">6023</TableCell>
                    <TableCell className="font-semibold" colSpan={3}>Pengelolaan Keuangan BMN dan Umum</TableCell>
                    <TableCell className="font-semibold">Rp {total}</TableCell>
                  </TableRow>
                  
                  {Object.keys(groupedItems).map((outputNumber) => (
                    <>
                    <TableRow key={`output_${outputNumber}`}>
                      <TableCell className="text-center font-semibold">{outputNumber}</TableCell>
                      <TableCell className="font-semibold" colSpan={3}>{groupedItems[outputNumber].name}</TableCell>
                      <TableCell className="font-semibold">{`Rp ${groupedItems[outputNumber].total}`}</TableCell>
                    </TableRow>

                      {Object.keys(groupedItems[outputNumber].codes).map((codeNumber) => (
                        <>
                          <TableRow key={`code_${codeNumber}`}>
                            <TableCell className="text-center font-semibold">{codeNumber}</TableCell>
                            <TableCell className="font-semibold" colSpan={3}>{groupedItems[outputNumber].codes[codeNumber].name}</TableCell>
                            <TableCell className="font-semibold">{`Rp ${groupedItems[outputNumber].codes[codeNumber].total}`}</TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost"><PlusIcon/></Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle>Tambah Akun</DialogTitle>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Select onValueChange={setAkun} >
                                        <SelectTrigger className="w-[360px]">
                                          <SelectValue placeholder="Pilih akun" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectGroup>
                                            <SelectItem value="532111, Belanja Modal Peralatan dan Mesin">532111 - Belanja Modal Peralatan dan Mesin</SelectItem>
                                            <SelectItem value="532112, Belanja Modal Bahan Baku Peralatan dan Mesin">532112 - Belanja Modal Bahan Baku Peralatan dan Mesin</SelectItem>
                                            <SelectItem value="532113, Belanja Modal Upah Tenaga dan Honor Pengelola Peralatan dan Mesin">532113 - Belanja Modal Upah Tenaga dan Honor Pengelola Peralatan dan Mesin</SelectItem>
                                            <SelectItem value="532114, Belanja Modal Sewa Peralatan dan Mesin">532114 - Belanja Modal Sewa Peralatan dan Mesin</SelectItem>
                                            <SelectItem value="532115, Belanja Modal Perencanaan dan Pengawasan Peralatan dan Mesin">532115 - Belanja Modal Perencanaan dan Pengawasan Peralatan dan Mesin</SelectItem>
                                          </SelectGroup>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                  <DialogClose asChild>
                                    <Button onClick={() => addRow(outputNumber, groupedItems[outputNumber].name, codeNumber, groupedItems[outputNumber].codes[codeNumber].name, tambahAkun[0], tambahAkun[1])}>Tambah</Button>
                                  </DialogClose>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                          {Object.keys(groupedItems[outputNumber].codes[codeNumber].accounts).map((accountNumber) => (
                            <>
                              <TableRow key={`code_${codeNumber}_account_${accountNumber}`}>
                                <TableCell></TableCell>
                                <TableCell colSpan={3}>{`${accountNumber} - ${groupedItems[outputNumber].codes[codeNumber].accounts[accountNumber].name}`}</TableCell>
                                <TableCell>{`Rp ${groupedItems[outputNumber].codes[codeNumber].accounts[accountNumber].total}`}</TableCell>
                                <TableCell className="flex justify-between">
                                  <Button variant="ghost" onClick={() => addRow(outputNumber, groupedItems[outputNumber].name, codeNumber, groupedItems[outputNumber].codes[codeNumber].name, accountNumber, groupedItems[outputNumber].codes[codeNumber].accounts[accountNumber].name)}><PlusIcon/></Button>
                                    {Object.keys(groupedItems[outputNumber].codes[codeNumber].accounts).length !== 1 && (
                                    <Button variant="ghost" onClick={() => deleteAccount(accountNumber)}><Cross2Icon/></Button>
                                  )}
                                </TableCell>
                              </TableRow>
                              {groupedItems[outputNumber].codes[codeNumber].accounts[accountNumber].items.map((item, index) => (
                                <TableRow key={item.no_urut}>
                                  <TableCell> </TableCell>
                                  <TableCell><Input value={item.uraian} type="text" name="uraian" onChange={(e) => onChange(e, item.no_urut)}></Input></TableCell>
                                  <TableCell><Input value={item.jumlah} type="number" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" name="jumlah" onChange={(e) => onChange(e, item.no_urut)}></Input></TableCell>   
                                  <TableCell><Input value={item.harga_satuan} type="number" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" name="harga_satuan" onChange={(e) => onChange(e, item.no_urut)}></Input></TableCell>
                                  <TableCell><Input value={item.total_harga} type="number" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" name="total_harga" onChange={(e) => onChange(e, item.no_urut)}></Input></TableCell>
                                  <TableCell className="flex justify-end">
                                    {index !== 0 && (
                                    <Button variant="ghost" onClick={() => deleteRow(item.no_urut)}><Cross2Icon/></Button>
                                  )}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </>
                          ))}
                          <TableRow>
                            <TableCell colSpan={5}><p className="text-background">|</p></TableCell>
                          </TableRow>
                        </>
                      ))}
                    </>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="flex justify-end">
            <div>
            <Button onClick={handleClick} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Simpan'}
            </Button>
            {error && <p>Error: {error}</p>}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}