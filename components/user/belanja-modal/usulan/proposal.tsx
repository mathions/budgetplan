"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Item, GroupedItems } from "@/lib/definitions"
import { editStatusBelmod, postFiles, postItems } from "@/lib/service";
import { useState } from "react";
import { Cross2Icon, PlusIcon } from "@radix-ui/react-icons"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, } from "@/components/ui/select"


export default function Proposal ({ files, items, uuid, token } : { files: any, items: [Item]; uuid: string, token: string }) {
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

  // const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>, no_urut: string) => {
  //   const { name, value } = e.target;
  //   const numericValue = parseFloat(value);
  //   const editData = itemsData.map((item) =>
  //     item.no_urut === no_urut && name ? { ...item, [name]: numericValue } : item
  //   );
  //   setItemsData(editData);
  // };

  const onChangeNumber = (e: React.ChangeEvent<HTMLInputElement>, no_urut: string) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);
    const editData = itemsData.map((item) =>
      item.no_urut === no_urut && name ? { ...item, [name]: numericValue } : item
    );

    // Calculate harga_total when either jumlah or harga_satuan changes
    const newDataWithTotal = editData.map(item => {
        const harga_satuan = item.harga_satuan;
        const jumlah = item.jumlah;
        const harga_total = isNaN(harga_satuan) || isNaN(jumlah) ? 0 : harga_satuan * jumlah;
        return {
            ...item,
            harga_total: harga_total
        };
    });

    setItemsData(newDataWithTotal);
};
  
  const groupedItems: GroupedItems = {};
  let total = 0;

  const addRow = (output_number:string, output:string, code_number: string, code: string, account_number: string, account: string) => {
    const newNoUrut = String(itemsData.length + 1);
    const newRow = { no_urut: newNoUrut, output_number: output_number, output: output, code_number: code_number, code: code, account_number: account_number, account: account, uraian: '', jumlah: 0, harga_satuan: 0, harga_total: 0 };
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

  console.log(itemsData)
  const showProposal = () => {
    // Ensure itemsData is an array
    if (!Array.isArray(itemsData)) {
      console.error('itemsData is not an array');
      return;
    }
  // Function to add rows for each missing code_number
    ['058', '057', '056', '055'].forEach(code_number => {
      // Check if code_number is not present in itemsData
      if (!itemsData.some(item => item.code_number === code_number)) {
        addRowForCodeNumber(code_number);
      }
    });

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
      groupedItems[item.output_number].total += item.harga_total;
      groupedItems[item.output_number].name = item.output;
      groupedItems[item.output_number].codes[item.code_number].total += item.harga_total;
      groupedItems[item.output_number].codes[item.code_number].name = item.code;
      groupedItems[item.output_number].codes[item.code_number].accounts[item.account_number].total += item.harga_total;
      groupedItems[item.output_number].codes[item.code_number].accounts[item.account_number].name = item.account;
      groupedItems[item.output_number].codes[item.code_number].accounts[item.account_number].items.push(item);
      total += item.harga_total;
    });
  };

  showProposal();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const saveClick = async () => {
    setIsLoading(true);
    setError('');
    const newItemsData = itemsData.map(item => {
      const { no_urut, output_number, output, code, account, ...rest } = item;
      return rest;
    });
    if (!file) {
      const res1 = await postItems(token, uuid, newItemsData)
      console.log(res1)
      setError('Berhasil menyimpan RAB');
      setIsLoading(false);
      window.location.reload();
      return;
    }
    try {
      const res1 = await postItems(token, uuid, newItemsData)
      console.log(res1)
      const data = new FormData()
      data.set('file', file)
      console.log(data)
      const res2 = await postFiles(token,uuid, data)
      console.log(res2)
      setError('Berhasil mengunggah Dokumen dan menyimpan RAB')
      window.location.reload();
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

  const finalClick = async () => {
    setIsLoading(true);
    setError('');
    try {
      const res = await editStatusBelmod(token, uuid)
      console.log(res)
      setError('Usulan berhasil diajukan')
      window.location.reload();
    } catch (error) {
      setError('Error');
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <>
      <div className="space-y-3">
        <p className="text-sm font-semibold leading-none">
          Dokumen Brafaks
        </p>
        <div className="w-full rounded-md border p-4">
          <div className="flex flex-wrap w-full gap-4 mb-4">
            {files.map((item: { path: string }, index: number) => (
              <div key={index} className="rounded-md border text-sm p-2">
                {item.path.length > 20 ? `${item.path.slice(0, 20)}...` : item.path}
                <div className="text-muted-foreground ">{item.path.split('.').pop()?.toUpperCase()}</div>
              </div>
            ))}
          </div>
          <Input type="file" name="file" className="border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground hover:cursor-pointer" onChange={(e) => setFile(e.target.files?.[0])} />
        </div>
        {/* <p>{files[files.length - 1]?.name}</p> */}
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <p className="text-sm font-semibold leading-none">
            Rencana Anggaran Biaya
          </p>
          {/* <p className="text-sm">
            Kurs : USD/IDR <span className="font-semibold">15.000</span>
          </p> */}
        </div>
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
                <TableCell className="font-semibold"><p className="pl-2 text-end">Rp {total.toLocaleString('id-ID')}</p></TableCell>
              </TableRow>
              
              {Object.keys(groupedItems).map((outputNumber) => (
                <>
                  <TableRow key={`output_${outputNumber}`}>
                    <TableCell className="text-center font-semibold">{outputNumber}</TableCell>
                    <TableCell className="font-semibold" colSpan={3}>{groupedItems[outputNumber].name}</TableCell>
                    <TableCell className="font-semibold"><p className="pl-2 text-end">{`Rp ${groupedItems[outputNumber].total.toLocaleString('id-ID')}`}</p></TableCell>
                  </TableRow>

                  {Object.keys(groupedItems[outputNumber].codes).map((codeNumber) => (
                    <>
                      <TableRow key={`code_${codeNumber}`}>
                        <TableCell className="text-center font-semibold">{codeNumber}</TableCell>
                        <TableCell className="font-semibold" colSpan={3}>{groupedItems[outputNumber].codes[codeNumber].name}</TableCell>
                        <TableCell className="font-semibold"><p className="pl-2 text-end">{`Rp ${groupedItems[outputNumber].codes[codeNumber].total.toLocaleString('id-ID')}`}</p></TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost"><PlusIcon/></Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Tambah Akun</DialogTitle>
                              </DialogHeader>
                              <div className="grid gap-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Select onValueChange={setAkun}>
                                    <SelectTrigger className="w-[360px]">
                                      <SelectValue placeholder="Pilih akun"/>
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
                            <TableCell className="font-medium" colSpan={3}>{`${accountNumber} - ${groupedItems[outputNumber].codes[codeNumber].accounts[accountNumber].name}`}</TableCell>
                            <TableCell className="font-medium"><p className="pl-2 text-end">{`Rp ${groupedItems[outputNumber].codes[codeNumber].accounts[accountNumber].total.toLocaleString('id-ID')}`}</p></TableCell>
                            <TableCell className="flex justify-between">
                              <Button variant="ghost" onClick={() => addRow(outputNumber, groupedItems[outputNumber].name, codeNumber, groupedItems[outputNumber].codes[codeNumber].name, accountNumber, groupedItems[outputNumber].codes[codeNumber].accounts[accountNumber].name)}><PlusIcon/></Button>
                              {/* <Button variant="ghost" onClick={() => deleteAccount(accountNumber)}><Cross2Icon/></Button> */}
                              {Object.keys(groupedItems[outputNumber].codes[codeNumber].accounts).length !== 1 && (
                                  <Button variant="ghost" onClick={() => deleteAccount(accountNumber)}><Cross2Icon/></Button>
                                )}
                            </TableCell>
                          </TableRow>
                          {groupedItems[outputNumber].codes[codeNumber].accounts[accountNumber].items.map((item, index) => (
                            <TableRow key={item.no_urut}>
                              <TableCell> </TableCell>
                              <TableCell><Input value={item.uraian} type="text" className="border-foreground/30" name="uraian" onChange={(e) => onChange(e, item.no_urut)}></Input></TableCell>
                              <TableCell><Input value={item.jumlah} type="number" className="border-foreground/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" name="jumlah" onChange={(e) => onChangeNumber(e, item.no_urut)}></Input></TableCell>   
                              <TableCell className="relative"><Input value={item.harga_satuan} type="number" className="border-foreground/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none peer block w-full pl-8" name="harga_satuan" onChange={(e) => onChangeNumber(e, item.no_urut)}></Input><div className="absolute left-3 top-1/2 -translate-y-1/2 ml-2">Rp</div></TableCell>      
                              {/* <TableCell className="relative"><Input value={item.harga_total} type="number" className="border-foreground/30 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none peer block w-full pl-8" name="harga_total" onChange={(e) => onChangeNumber(e, item.no_urut)}></Input><div className="absolute left-3 top-1/2 -translate-y-1/2 ml-2">Rp</div></TableCell> */}
                              <TableCell className="font-medium text-end"><p className="pl-2">{`Rp ${item.harga_total.toLocaleString('id-ID')}`}</p></TableCell>
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
        <div className="space-x-3">
          <Button onClick={saveClick} disabled={isLoading} variant="outline" className="w-[96px]">
            {isLoading ? 'Loading...' : 'Simpan'}
          </Button>
          <Button onClick={finalClick} disabled={isLoading} className="w-[96px]">
            {isLoading ? 'Loading...' : 'Ajukan'}
          </Button>
        </div>
      </div>
      <div className="flex justify-end">
          {error && <p>{error}</p>}
      </div>
    </>
  )
}