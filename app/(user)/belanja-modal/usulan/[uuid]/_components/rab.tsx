"use client";

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CloseSquare, DirectInbox, AddCircle, CloseCircle, Trash, Note, DollarCircle } from "iconsax-react";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table-rab";
import { Input } from "@/components/ui/input-rab";
import { GrupItem, Item, Akun, MataUang, Kurs } from "@/lib/definitions";
import { getExcelUsulan, postItems, updateKurs } from "@/lib/service";
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


export default function RAB({
  items,
  uuid,
  token,
  account,
  currency,
  kurs,
}: {
  items: [Item];
  uuid: string;
  token: string;
  account: [Akun];
  currency: any;
  kurs: [Kurs];
}) {
  const [itemsData, setItemsData] = useState<Item[]>(items);
  const grupItem: GrupItem = {};
  const router = useRouter();
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isExportLoading, setIsExportLoading] = useState(false);

  let total = 0;
  let totalSarana = 0;

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
    }).filter(item => !(item.uraian === '' || item.jumlah === 0 || item.harga_satuan === 0));

    console.log(newItemsData);
    setIsSaveLoading(true);
    try {
      const res = await postItems(token, uuid, newItemsData);
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

  async function exportUsulan() {
    setIsExportLoading(true);
    try {
      const res = await getExcelUsulan(token, uuid);
      console.log(res);
      if (res.ok) {
        const pdfBlob = await res.blob();
        const url = window.URL.createObjectURL(new Blob([pdfBlob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'RAB.xlsx');
        document.body.appendChild(link);
        link.click();
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
        window.URL.revokeObjectURL(url);
        setIsExportLoading(false);
          toast({
            title: "RAB berhasil diekspor",
          });
      } else {
        setIsExportLoading(false);
        toast({
          title: "Gagal mengekspor RAB",
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

  const ChangeCurrency = () => {
    const [isLoading, setIsLoading] = useState(false);
    const FormSchema = z.object({
      name: z.string({
        required_error: "Mata uang perlu dipilih",
      }),
    });
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
    });
    const [open, setOpen] = useState(false);
    const [kursUuid, setKursUuid] = useState("");
    async function onSubmit(data: z.infer<typeof FormSchema>) {
      setIsLoading(true);
      try {
        const res = await updateKurs(token, uuid, kursUuid);
        console.log(res);
        if (res.ok) {
          setIsLoading(false);
          setOpen(false);
          router.refresh();

          toast({
            title: "Mata uang berhasil diubah",
          });
        } else {
          setIsLoading(false);
          setOpen(false);
          toast({
            title: "Gagal mengubah mata uang",
            description: res.message,
            variant: "destructive",
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
    return(
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary" className="">Ubah Mata Uang</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[480px]">
          <div className="space-y-6">
            <DialogHeader>
              <h4>Ubah Mata Uang</h4>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-y-2">
                        <FormLabel>Mata Uang</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "justify-between",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value
                                  ? kurs.find(
                                      (kurs) => kurs.name === field.value
                                    )?.name
                                  : "Pilih mata uang"}
                                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="p-0">
                            <Command>
                              <CommandInput placeholder="Cari mata uang..." />
                              <CommandEmpty>
                                Mata uang tidak ditemukan.
                              </CommandEmpty>
                              <CommandGroup>
                                {kurs.map((kurs) => (
                                  <CommandItem
                                    value={kurs.name}
                                    key={kurs.uuid}
                                    onSelect={() => {
                                      form.setValue("name", kurs.name);
                                      setKursUuid(kurs.uuid);
                                    }}
                                  >
                                    <CheckIcon
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        kurs.name === field.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                    {kurs.name}
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex justify-start gap-4">
                  <Button disabled={isLoading} type="submit">
                    {isLoading && (
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Ubah Mata Uang
                  </Button>
                  <DialogClose asChild>
                    <Button variant="secondary">Batal</Button>
                  </DialogClose>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  useEffect(() => {
    const newDataWithTotal = itemsData.map((item) => {
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
  }, [currency]);

  return (
    <Card className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-end">
        <h4>Rencana Anggaran Biaya</h4>
        <div className="flex gap-4">
          <ChangeCurrency/>
          <Button variant="secondary" disabled={isExportLoading} onClick={exportUsulan}>{isExportLoading && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
            Ekspor
          </Button>
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
        <div className="flex-1 font-semibold">
          <div>: {currency?.name}</div>
          <div>: {currency?.initial}</div>
          <div>: Rp {currency?.kurs.toLocaleString("id-ID")}</div>
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
              <TableCell className="text-center">6023</TableCell>
              <TableCell>Pengelolaan BMN dan Umum</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">Rp {total.toLocaleString("id-ID")}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow className="font-semibold">
              <TableCell className="text-center">6023.EBB.951</TableCell>
              <TableCell>Layanan Sarana Internal</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">Rp {totalSarana.toLocaleString("id-ID")}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow className="font-semibold">
              <TableCell className="text-center">055</TableCell>
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
                    <TableCell></TableCell>
                    <TableCell>{grupItem["055"].accounts[accountNumber].number} - {grupItem["055"].accounts[accountNumber].name}</TableCell>
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
              <TableCell className="text-center">056</TableCell>
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
                    <TableCell></TableCell>
                    <TableCell>{grupItem["056"].accounts[accountNumber].number} - {grupItem["056"].accounts[accountNumber].name}</TableCell>
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
              <TableCell className="text-center">057</TableCell>
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
                    <TableCell></TableCell>
                    <TableCell>{grupItem["057"].accounts[accountNumber].number} - {grupItem["057"].accounts[accountNumber].name}</TableCell>
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
              <TableCell className="text-center">6023.EBB.971</TableCell>
              <TableCell>Layanan PraSarana Internal</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">Rp {grupItem["058"]?.total.toLocaleString("id-ID")}</TableCell>
              <TableCell></TableCell>
            </TableRow>
            <TableRow className="font-semibold">
              <TableCell className="text-center">058</TableCell>
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
                    <TableCell></TableCell>
                    <TableCell>{grupItem["058"].accounts[accountNumber].number} - {grupItem["058"].accounts[accountNumber].name}</TableCell>
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