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

export default function Proposal ({ items, slug, token, office, year } : { items: [Item]; slug: string, token: string, office: string, year: string }) {
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

  // Group items based on code_id and then account_id
  itemsData.forEach((item) => {
    if (!groupedItems[item.output_id]) {
      groupedItems[item.output_id] = { name: "", total: 0, codes: {} };
    }
    if (!groupedItems[item.output_id].codes[item.code_id]) {
      groupedItems[item.output_id].codes[item.code_id] = { name: "", total: 0, accounts: {} };
    }
    if (!groupedItems[item.output_id].codes[item.code_id].accounts[item.account_id]) {
      groupedItems[item.output_id].codes[item.code_id].accounts[item.account_id] = { name: "", total: 0, items: [] };
    }
    groupedItems[item.output_id].total += parseInt(item.total_harga, 10);
    groupedItems[item.output_id].name = item.output;
    groupedItems[item.output_id].codes[item.code_id].total += parseInt(item.total_harga, 10);
    groupedItems[item.output_id].codes[item.code_id].name = item.code;
    groupedItems[item.output_id].codes[item.code_id].accounts[item.account_id].total += parseInt(item.total_harga, 10);
    groupedItems[item.output_id].codes[item.code_id].accounts[item.account_id].name = item.account;
    groupedItems[item.output_id].codes[item.code_id].accounts[item.account_id].items.push(item);
    total += parseInt(item.total_harga, 10);
  });

  const addRow = (output_id:string, output:string, code_id: string, code: string, account_id: string, account: string) => {
    const newNoUrut = String(itemsData.length + 1);
    const newRow = { no_urut: newNoUrut, output_id: output_id, output: output, code_id: code_id, code: code, account_id: account_id, account: account, uraian: '', jumlah: '', harga_satuan: '', total_harga: '0' };
    setItemsData([...itemsData, newRow]);
  };

  const deleteRow = (no_urut:string) => {
    const updatedData = itemsData.filter((item) => item.no_urut !== no_urut);
    setItemsData(updatedData);
  };

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const handleClick = async () => {
    setIsLoading(true);
    setError('');

    const newItemsData = itemsData.map(item => {
      const { no_urut, output_id, output, code, account, ...rest } = item;
      return rest;
    });
    function mapCodeIdToValue(codeId:string) {
      switch (codeId) {
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
      code_id: mapCodeIdToValue(item.code_id)
    }));

    if (!file) return

    try {
      const res1 = await postItems(token, slug, newData)
      console.log(res1)

      const data = new FormData()
      data.set('file', file)
      console.log(data)
      const res2 = await postBrafaks(token,slug, data)
      console.log(res2)

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
              Brafaks
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
                    <TableCell className="w-[100px]">Kode</TableCell>
                    <TableCell>Uraian RO/Komponen/Akun/Detil</TableCell>
                    <TableCell>Jml Unit</TableCell>
                    <TableCell>Harga Satuan</TableCell>
                    <TableCell>Jumlah</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>6023</TableCell>
                    <TableCell colSpan={3}>Pengelolaan Keuangan BMN dan Umum</TableCell>
                    <TableCell>Rp {total}</TableCell>
                  </TableRow>
                  
                  {Object.keys(groupedItems).map((outputId) => (
                    <>
                      <TableRow key={`output_${outputId}`}>
                        <TableCell>{outputId}</TableCell>
                        <TableCell colSpan={3}>{groupedItems[outputId].name}</TableCell>
                        <TableCell>{`Rp ${groupedItems[outputId].total}`}</TableCell>
                      </TableRow>

                      {Object.keys(groupedItems[outputId].codes).map((codeId) => (
                        <>
                          <TableRow key={`code_${codeId}`}>
                            <TableCell>{codeId}</TableCell>
                            <TableCell colSpan={3}>{groupedItems[outputId].codes[codeId].name}</TableCell>
                            <TableCell>{`Rp ${groupedItems[outputId].codes[codeId].total}`}</TableCell>
                            <TableCell>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="ghost"><PlusIcon/></Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                  <DialogHeader>
                                    <DialogTitle>Akun Belanja</DialogTitle>
                                    <DialogDescription>
                                      Make changes to your profile here. Click save when you're done.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                      <Label htmlFor="name" className="text-right">
                                        Akun
                                      </Label>
                                      <Select onValueChange={setAkun} >
                                        <SelectTrigger className="w-[180px]">
                                          <SelectValue placeholder="Pilih akun" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectGroup>
                                            <SelectItem value="532111, Belanja Modal">532111</SelectItem>
                                            <SelectItem value="532112, Belanja Modal">532112</SelectItem>
                                            <SelectItem value="532113, Belanja Modal">532113</SelectItem>
                                            <SelectItem value="532114, Belanja Modal">532114</SelectItem>
                                            <SelectItem value="532115, Belanja Modal">532115</SelectItem>
                                          </SelectGroup>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                  <DialogFooter>
                                  <DialogClose asChild>
                                    <Button onClick={() => addRow(outputId, groupedItems[outputId].name, codeId, groupedItems[outputId].codes[codeId].name, tambahAkun[0], tambahAkun[1])}>Tambah</Button>
                                  </DialogClose>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                          {Object.keys(groupedItems[outputId].codes[codeId].accounts).map((accountId) => (
                            <>
                              <TableRow key={`code_${codeId}_account_${accountId}`}>
                                <TableCell></TableCell>
                                <TableCell colSpan={3}>{`${accountId} - ${groupedItems[outputId].codes[codeId].accounts[accountId].name}`}</TableCell>
                                <TableCell>{`Rp ${groupedItems[outputId].codes[codeId].accounts[accountId].total}`}</TableCell>
                                <TableCell className="flex justify-between">
                                  <Button variant="ghost" onClick={() => addRow(outputId, groupedItems[outputId].name, codeId, groupedItems[outputId].codes[codeId].name, accountId, groupedItems[outputId].codes[codeId].accounts[accountId].name)}><PlusIcon/></Button>
                                  <Button variant="ghost"><Cross2Icon/></Button>
                                </TableCell>
                              </TableRow>
                              {groupedItems[outputId].codes[codeId].accounts[accountId].items.map((item) => (
                                <TableRow key={item.no_urut}>
                                  <TableCell> </TableCell>
                                  <TableCell><Input value={item.uraian} type="text" name="uraian" onChange={(e) => onChange(e, item.no_urut)}></Input></TableCell>
                                  <TableCell><Input value={item.jumlah} type="number" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" name="jumlah" onChange={(e) => onChange(e, item.no_urut)}></Input></TableCell>   
                                  <TableCell><Input value={item.harga_satuan} type="number" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" name="harga_satuan" onChange={(e) => onChange(e, item.no_urut)}></Input></TableCell>
                                  <TableCell><Input value={item.total_harga} type="number" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" name="total_harga" onChange={(e) => onChange(e, item.no_urut)}></Input></TableCell>
                                  <TableCell className="flex justify-end">
                                    <Button variant="ghost" onClick={() => deleteRow(item.no_urut)}><Cross2Icon/></Button>
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