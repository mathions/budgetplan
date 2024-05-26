"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CloseSquare, DirectInbox, AddCircle, CloseCircle, Trash, Note, DollarCircle } from "iconsax-react";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table-rab";
import { Input } from "@/components/ui/input-rab";
import { GrupItem, Item, Akun, MataUang, Kurs } from "@/lib/definitions";
import { postItems, updateKurs } from "@/lib/service";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { Dialog, DialogTrigger, DialogHeader, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Check, CheckIcon, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Salin } from "./salin"
import { postItemsPenyesuaian } from "@/lib/service-admin";


export default function PenyesuaianRAB({
  items,
  uuid,
  token,
  account,
  currency,
}: {
  items: [Item];
  uuid: string;
  token: string;
  account: Akun[];
  currency: any;
}) {
  const [itemsData, setItemsData] = useState<Item[]>(items);
  const grupItem: GrupItem = {};
  const router = useRouter();
  const [isSaveLoading, setIsSaveLoading] = useState(false);

  let total = 0;
  let totalSarana = 0;

  if (Array.isArray(itemsData)) {
    itemsData.forEach((item) => {
      if (!grupItem[item.code_number]) {
        grupItem[item.code_number] = { name: "", total: 0, accounts: {} };
      }
      if (!grupItem[item.code_number].accounts[item.account_number]) {
        grupItem[item.code_number].accounts[item.account_number] = {
          number: "",
          name: "",
          total: 0,
          items: [],
        };
      }
      grupItem[item.code_number].total += item.harga_total;
      grupItem[item.code_number].name = item.code;
      grupItem[item.code_number].accounts[item.account_number].total += item.harga_total;
      grupItem[item.code_number].accounts[item.account_number].number = item.account_number;
      grupItem[item.code_number].accounts[item.account_number].name = item.account;
      grupItem[item.code_number].accounts[item.account_number].items.push(item);

      total += item.harga_total;
      if(item.code_number !== "058") {
        totalSarana += item.harga_total;
      }
    });
  } else {
    console.error('itemsData is not an array');
  }

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    no_urut: string
  ) => {
    const { name, value } = e.target;
    const editData = itemsData.map((item) =>
      item.no_urut === no_urut && name ? { ...item, [name]: value } : item
    );
    setItemsData(editData);
  };

  const onChangeNumber = (
    e: React.ChangeEvent<HTMLInputElement>,
    no_urut: string
  ) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);
    const editData = itemsData.map((item) =>
      item.no_urut === no_urut && name
        ? { ...item, [name]: numericValue }
        : item
    );

    const newDataWithTotal = editData.map((item) => {
      const harga_satuan = item.harga_satuan;
      const jumlah = item.jumlah;
      const kurs  = currency?.kurs;
      const harga_total =
        isNaN(harga_satuan) || isNaN(jumlah) ? 0 : harga_satuan * jumlah * kurs;
      return {
        ...item,
        harga_total: harga_total,
      };
    });
    setItemsData(newDataWithTotal);
  };

  const saveItem = async () => {
    const newItemsData = itemsData.map((item) => {
      const { no_urut, output_number, output, code, account, ...rest } = item;
      return rest;
    });
    console.log(newItemsData);
    setIsSaveLoading(true);
    try {
      const res = await postItemsPenyesuaian(token, uuid, newItemsData);
      console.log(res);
      if (res.ok) {
        setIsSaveLoading(false);
        router.refresh();
        toast({
          title: "RAB berhasil disimpan",
        });
      } else {
        setIsSaveLoading(false);
        toast({
          title: "Gagal menyimpan RAB",
          description: res.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const addRow = (
    code_number: string,
    code: string,
    account_number: string,
    account: string,
  ) => {
    const no_urut = String(itemsData.length + 1);
    const newRow = {
      no_urut: no_urut,
      output_number: "",
      output: "",
      code_number: code_number,
      code: code,
      account_number: account_number,
      account: account,
      uraian: "",
      jumlah: 0,
      harga_satuan: 0,
      harga_total: 0,
    };
    setItemsData([...itemsData, newRow]);
  };

  const deleteRow = (no_urut: string) => {
    const updatedData = itemsData.filter((item) => item.no_urut !== no_urut);
    setItemsData(updatedData);
  };

  const deleteAccount = (code_number: string, account_number: string) => {
    const updatedData = itemsData.filter(
      (item) => !(item.account_number === account_number && item.code_number === code_number)
    );
    setItemsData(updatedData);
  }

  const AddAccount = ({code_number, code} : {code_number: string, code:string}) => {
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    return(
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="link" className="p-2 block mx-auto"><Note className="h-6 w-6"/></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[480px]">
          <div className="space-y-6">
            <DialogHeader>
              <h4>Tambah Akun</h4>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Kode Akun</Label>
                <Popover>
                  <PopoverTrigger asChild>        
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >{number
                        ? account.find((account) => account.account_number === number)?.account_number
                        : "Cari kode akun..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                  <PopoverContent side="bottom" className="h-60">
                    <Command>
                      <CommandInput placeholder="Cari kode akun" />
                      <CommandEmpty>
                        Akun tidak ditemukan.
                      </CommandEmpty>
                    <ScrollArea className="h-52">
                      <CommandGroup>
                        {account.map((account) => (
                          <CommandItem 
                            key={account.account_number} 
                            value={account.account_number}
                            onSelect={() => {
                              setName(account.account_name)
                              setNumber(account.account_number)
                            }}>
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                account.account_number === number
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {account.account_number} - {account.account_name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      </ScrollArea>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>Uraian Akun</Label>
                <p>{name}</p>
              </div>
            </div>
            <div className="flex justify-start gap-4">
              <Button disabled={isLoading} onClick={() => addRow(code_number, code, number, name)}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Tambah Akun
              </Button>
              <DialogClose asChild>
                <Button variant="secondary">Batal</Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  const DeleteAccount = ({code_number, account_number} : {code_number: string, account_number: string}) => {
    const [open, setOpen] = useState(false);
    return(
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="link" className="p-2"><Trash className="h-6 w-6"/></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[480px]">
          <div className="space-y-6">
            <DialogHeader>
              <h4>Hapus Akun?</h4>
            </DialogHeader>
            <div className="flex justify-start gap-4">
              <Button variant="destructive" onClick={() => deleteAccount(code_number, account_number)}>
                Hapus Akun
              </Button>
              <DialogClose asChild>
                <Button variant="secondary" className="border-destructive text-destructive">Batal</Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  useEffect(() => {
    setItemsData(items);
  }, [items]);

  return (
    <Card className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-end">
        <h4>Rencana Anggaran Biaya</h4>
        <div className="flex gap-4">
          <Salin uuid={uuid} token={token}/>
          <Button variant="secondary" disabled={isSaveLoading} onClick={saveItem}>{isSaveLoading && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
            <DirectInbox className="mr-2 w-5 h-5" />Simpan
          </Button>
        </div>
      </div>
      <div className="flex">
        <div className="basis-40">
          <div>Mata Uang</div>
          <div>Kode</div>
          <div>Nilai Tukar</div>
        </div>
        <div className="flex-1">
          <div>: {currency?.name}</div>
          <div>: {currency?.initial}</div>
          <div>: Rp {currency?.kurs}</div>
        </div>
      </div>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Kode</TableHead>
              <TableHead className="w-80">Uraian RO/Komponen/Akun/Detil</TableHead>
              <TableHead className="w-32">Jumlah Unit</TableHead>
              <TableHead className="w-36">Harga Satuan</TableHead>
              <TableHead className="w-36">Jumlah</TableHead>
              <TableHead className="w-24">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="font-semibold">
              <TableCell>6023</TableCell>
              <TableCell>Pengelolaan BMN dan Umum</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">Rp {total.toLocaleString("id-ID")}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow className="font-semibold">
              <TableCell>6023.EBB.951</TableCell>
              <TableCell>Layanan Sarana Internal</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">Rp {totalSarana.toLocaleString("id-ID")}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow className="font-semibold">
              <TableCell>055</TableCell>
              <TableCell>Kendaraan Bermotor Perwakilan RI</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">Rp {grupItem["055"]?.total.toLocaleString("id-ID")}</TableCell>
              <TableCell><AddAccount code_number={"055"} code={"Kendaraan Bermotor Perwakilan RI"}/></TableCell>
            </TableRow>
            {grupItem["055"] ? (
              Object.keys(grupItem["055"].accounts).map((accountNumber) => (
                <>
                  <TableRow key={accountNumber}>
                    <TableCell>{grupItem["055"].accounts[accountNumber].number}</TableCell>
                    <TableCell>{grupItem["055"].accounts[accountNumber].name}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right">Rp {grupItem["055"].accounts[accountNumber].total.toLocaleString("id-ID")}</TableCell>
                    <TableCell>
                      <div className="flex justify-center"> 
                        <Button onClick={() => addRow("055", "Kendaraan Bermotor Perwakilan RI", grupItem["055"].accounts[accountNumber].number, grupItem["055"].accounts[accountNumber].name)} variant="link" className="p-2"><AddCircle className="h-6 w-6"/></Button>
                        <DeleteAccount code_number={"055"} account_number={grupItem["055"].accounts[accountNumber].number}/>
                      </div>
                    </TableCell>
                  </TableRow>
                  {grupItem["055"].accounts[accountNumber].items.map((item) => (
                    <TableRow key={item.no_urut}>
                      <TableCell></TableCell>
                      <TableCell><Input name="uraian" autoComplete="off" spellCheck={false} value={item.uraian} onChange={(e) =>onChange(e, item.no_urut)}></Input></TableCell>
                      <TableCell><Input name="harga_satuan" type="number" min="0" className="text-right" value={item.harga_satuan} onChange={(e) => onChangeNumber(e, item.no_urut)}></Input></TableCell>
                      <TableCell><Input name="jumlah" type="number" min="0" className="text-right" value={item.jumlah} onChange={(e) =>onChangeNumber(e, item.no_urut)}></Input></TableCell>
                      <TableCell className="text-right">Rp {item.harga_total.toLocaleString("id-ID")}</TableCell>
                      <TableCell><Button onClick={() => deleteRow(item.no_urut)} variant="link" className="p-2 block mx-auto"><CloseSquare className="h-6 w-6"/></Button></TableCell>
                    </TableRow>
                  ))}
                </>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}><AddAccount code_number={"055"} code={"Kendaraan Bermotor Perwakilan RI"}></AddAccount></TableCell>
              </TableRow>
            )}
            <TableRow className="font-semibold">
              <TableCell>056</TableCell>
              <TableCell>
                Perangkat Pengolah Data dan Komunikasi Perwakilan
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">Rp {grupItem["056"]?.total.toLocaleString("id-ID")}</TableCell>
              <TableCell><AddAccount code_number={"056"} code={"Perangkat Pengolah Data dan Komunikasi Perwakilan"}/></TableCell>
            </TableRow>
            {grupItem["056"] ? (
              Object.keys(grupItem["056"].accounts).map((accountNumber) => (
                <>
                  <TableRow key={accountNumber}>
                    <TableCell>{grupItem["056"].accounts[accountNumber].number}</TableCell>
                    <TableCell>{grupItem["056"].accounts[accountNumber].name}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right">Rp {grupItem["056"].accounts[accountNumber].total.toLocaleString("id-ID")}</TableCell>
                    <TableCell>
                      <div className="flex justify-center"> 
                        <Button onClick={() => addRow("056", "Perangkat Pengolah Data dan Komunikasi Perwakilan", grupItem["056"].accounts[accountNumber].number, grupItem["056"].accounts[accountNumber].name)} variant="link" className="p-2"><AddCircle className="h-6 w-6"/></Button>
                        <DeleteAccount code_number={"056"} account_number={grupItem["056"].accounts[accountNumber].number}/>
                      </div>
                    </TableCell>
                  </TableRow>
                  {grupItem["056"].accounts[accountNumber].items.map((item) => (
                    <TableRow key={item.no_urut}>
                      <TableCell></TableCell>
                      <TableCell><Input name="uraian" autoComplete="off" spellCheck={false} value={item.uraian} onChange={(e) =>onChange(e, item.no_urut)}></Input></TableCell>
                      <TableCell><Input name="harga_satuan" type="number" min="0" className="text-right" value={item.harga_satuan} onChange={(e) => onChangeNumber(e, item.no_urut)}></Input></TableCell>
                      <TableCell><Input name="jumlah" type="number" min="0" className="text-right" value={item.jumlah} onChange={(e) =>onChangeNumber(e, item.no_urut)}></Input></TableCell>
                      <TableCell className="text-right">Rp {item.harga_total.toLocaleString("id-ID")}</TableCell>
                      <TableCell><Button onClick={() => deleteRow(item.no_urut)} variant="link" className="p-2 block mx-auto"><CloseSquare className="h-6 w-6"/></Button></TableCell>
                  </TableRow>
                  ))}
                </>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}><AddAccount code_number={"056"} code={"Perangkat Pengolah Data dan Komunikasi Perwakilan"}></AddAccount></TableCell>
              </TableRow>
            )}
            <TableRow className="font-semibold">
              <TableCell>057</TableCell>
              <TableCell>Peralatan Fasilitas Perkantoran Perwakilan</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">Rp {grupItem["057"]?.total.toLocaleString("id-ID")}</TableCell>
              <TableCell><AddAccount code_number={"057"} code={"Peralatan Fasilitas Perkantoran Perwakilan"}/></TableCell>
            </TableRow>
            {grupItem["057"] ? (
              Object.keys(grupItem["057"].accounts).map((accountNumber) => (
                <>
                  <TableRow key={accountNumber}>
                    <TableCell>{grupItem["057"].accounts[accountNumber].number}</TableCell>
                    <TableCell>{grupItem["057"].accounts[accountNumber].name}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right">Rp {grupItem["057"].accounts[accountNumber].total.toLocaleString("id-ID")}</TableCell>
                    <TableCell>
                      <div className="flex justify-center"> 
                        <Button onClick={() => addRow("057", "Peralatan Fasilitas Perkantoran Perwakilan", grupItem["057"].accounts[accountNumber].number, grupItem["057"].accounts[accountNumber].name)} variant="link" className="p-2"><AddCircle className="h-6 w-6"/></Button>
                        <DeleteAccount code_number={"057"} account_number={grupItem["057"].accounts[accountNumber].number}/>
                      </div>
                    </TableCell>
                  </TableRow>
                  {grupItem["057"].accounts[accountNumber].items.map((item) => (
                    <TableRow key={item.no_urut}>
                      <TableCell></TableCell>
                      <TableCell><Input name="uraian" autoComplete="off" spellCheck={false} value={item.uraian} onChange={(e) =>onChange(e, item.no_urut)}></Input></TableCell>
                      <TableCell><Input name="harga_satuan" type="number" min="0" className="text-right" value={item.harga_satuan} onChange={(e) => onChangeNumber(e, item.no_urut)}></Input></TableCell>
                      <TableCell><Input name="jumlah" type="number" min="0" className="text-right" value={item.jumlah} onChange={(e) =>onChangeNumber(e, item.no_urut)}></Input></TableCell>
                      <TableCell className="text-right">Rp {item.harga_total.toLocaleString("id-ID")}</TableCell>
                      <TableCell><Button onClick={() => deleteRow(item.no_urut)} variant="link" className="p-2 block mx-auto"><CloseSquare className="h-6 w-6"/></Button></TableCell>
                    </TableRow>
                  ))}
                </>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}><AddAccount code_number={"057"} code={"Peralatan Fasilitas Perkantoran Perwakilan"}></AddAccount></TableCell>
              </TableRow>
            )}
            <TableRow className="font-semibold">
              <TableCell>6023.EBB.971</TableCell>
              <TableCell>Layanan PraSarana Internal</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>Rp</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow className="font-semibold">
              <TableCell>058</TableCell>
              <TableCell>
                Pembangunan/Renovasi Gedung dan Bangunan Perwakilan RI
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">Rp {grupItem["058"]?.total.toLocaleString("id-ID")}</TableCell>
              <TableCell><AddAccount code_number={"058"} code={"Pembangunan/Renovasi Gedung dan Bangunan Perwakilan RI"}/></TableCell>
            </TableRow>
            {grupItem["058"] ? (
              Object.keys(grupItem["058"].accounts).map((accountNumber) => (
                <>
                  <TableRow key={accountNumber}>
                    <TableCell>{grupItem["058"].accounts[accountNumber].number}</TableCell>
                    <TableCell>{grupItem["058"].accounts[accountNumber].name}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right">Rp {grupItem["058"].accounts[accountNumber].total.toLocaleString("id-ID")}</TableCell>
                    <TableCell>
                      <div className="flex justify-center"> 
                        <Button onClick={() => addRow("058", "Pembangunan/Renovasi Gedung dan Bangunan Perwakilan RI", grupItem["058"].accounts[accountNumber].number, grupItem["058"].accounts[accountNumber].name)} variant="link" className="p-2"><AddCircle className="h-6 w-6"/></Button>
                        <DeleteAccount code_number={"058"} account_number={grupItem["058"].accounts[accountNumber].number}/>
                      </div>
                    </TableCell>
                  </TableRow>
                  {grupItem["058"].accounts[accountNumber].items.map((item) => (
                    <TableRow key={item.no_urut}>
                      <TableCell></TableCell>
                      <TableCell><Input name="uraian" autoComplete="off" spellCheck={false} value={item.uraian} onChange={(e) =>onChange(e, item.no_urut)}></Input></TableCell>
                      <TableCell><Input name="harga_satuan" type="number" min="0" className="text-right" value={item.harga_satuan} onChange={(e) => onChangeNumber(e, item.no_urut)}></Input></TableCell>
                      <TableCell><Input name="jumlah" type="number" min="0" className="text-right" value={item.jumlah} onChange={(e) =>onChangeNumber(e, item.no_urut)}></Input></TableCell>
                      <TableCell className="text-right">Rp {item.harga_total.toLocaleString("id-ID")}</TableCell>
                      <TableCell><Button onClick={() => deleteRow(item.no_urut)} variant="link" className="p-2 block mx-auto"><CloseSquare className="h-6 w-6"/></Button></TableCell>
                    </TableRow>
                  ))}
                </>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6}><AddAccount code_number={"058"} code={"Pembangunan/Renovasi Gedung dan Bangunan Perwakilan RI"}></AddAccount></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}