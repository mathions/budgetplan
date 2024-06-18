"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CloseSquare, DirectInbox, AddCircle, CloseCircle, Trash, Note, DollarCircle } from "iconsax-react";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table-rab";
import { Input } from "@/components/ui/input-rab";
import { GrupItem, Item, Akun, MataUang, Kurs } from "@/lib/definitions";
import { postItems, updateKurs } from "@/services/user";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { Dialog, DialogTrigger, DialogHeader, DialogContent, DialogClose } from "@/components/ui/dialog";


export default function RAB({
  items,
  uuid,
  token,
  currency,
}: {
  items: [Item];
  uuid: string;
  token: string;
  currency: any;
}) {
  const [itemsData, setItemsData] = useState<Item[]>(items);
  const grupItem: GrupItem = {};
  const router = useRouter();
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isExportLoading, setIsExportLoading] = useState(false);

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
      if (item.code_number !== "058") {
        totalSarana += item.harga_total;
      }
    });
  } else {
    console.error("itemsData is not an array");
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
      const kurs = currency?.kurs;
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
  };

  const addRow = (
    code_number: string,
    code: string,
    account_number: string,
    account: string
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
  };

  const DeleteAccount = ({code_number, account_number} : {code_number: string, account_number: string}) => {
    const [open, setOpen] = useState(false);
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="link" className="p-2">
            <Trash className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[480px]">
          <div className="space-y-6">
            <DialogHeader>
              <h4>Hapus Akun?</h4>
            </DialogHeader>
            <div className="flex justify-start gap-4">
              <Button
                variant="destructive"
                onClick={() => deleteAccount(code_number, account_number)}
              >
                Hapus Akun
              </Button>
              <DialogClose asChild>
                <Button
                  variant="secondary"
                  className="border-destructive text-destructive"
                >
                  Batal
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <Card className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-end">
        <h4>Rencana Anggaran Biaya</h4>
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
              <TableHead className="w-[22rem]">Uraian RO/Komponen/Akun/Detil</TableHead>
              <TableHead className="w-32">Jumlah Unit</TableHead>
              <TableHead className="w-36">Harga Satuan</TableHead>
              <TableHead className="w-36">Jumlah</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="font-semibold">
              <TableCell className="text-center">6023</TableCell>
              <TableCell>Pengelolaan BMN dan Umum</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">Rp {total.toLocaleString("id-ID")}</TableCell>
            </TableRow>
            <TableRow className="font-semibold">
              <TableCell className="text-center">6023.EBB.951</TableCell>
              <TableCell>Layanan Sarana Internal</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">Rp {totalSarana.toLocaleString("id-ID")}</TableCell>
            </TableRow>
            <TableRow className="font-semibold">
              <TableCell className="text-center">055</TableCell>
              <TableCell>Kendaraan Bermotor Perwakilan RI</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">Rp {grupItem["055"]?.total.toLocaleString("id-ID")}</TableCell>
            </TableRow>
            {grupItem["055"] ? (
              Object.keys(grupItem["055"].accounts).map((accountNumber) => (
                <>
                  <TableRow key={accountNumber}>
                    <TableCell className="text-center">{grupItem["055"].accounts[accountNumber].number}</TableCell>
                    <TableCell>{grupItem["055"].accounts[accountNumber].name}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right">Rp {grupItem["055"].accounts[accountNumber].total.toLocaleString("id-ID")}</TableCell>
                  </TableRow>
                  {grupItem["055"].accounts[accountNumber].items.map((item) => (
                    <TableRow key={item.no_urut}>
                      <TableCell></TableCell>
                      <TableCell>{item.uraian}</TableCell>
                      <TableCell className="text-center">{item.harga_satuan}</TableCell>
                      <TableCell className="text-right">{item.jumlah.toLocaleString("us-US")}</TableCell>
                      <TableCell className="text-right">Rp {item.harga_total.toLocaleString("id-ID")}</TableCell>
                    </TableRow>
                  ))}
                </>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}></TableCell>
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
            </TableRow>
            {grupItem["056"] ? (
              Object.keys(grupItem["056"].accounts).map((accountNumber) => (
                <>
                  <TableRow key={accountNumber}>
                    <TableCell className="text-center">{grupItem["056"].accounts[accountNumber].number}</TableCell>
                    <TableCell>{grupItem["056"].accounts[accountNumber].name}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right">Rp {grupItem["056"].accounts[accountNumber].total.toLocaleString("id-ID")}</TableCell>
                  </TableRow>
                  {grupItem["056"].accounts[accountNumber].items.map((item) => (
                    <TableRow key={item.no_urut}>
                      <TableCell></TableCell>
                      <TableCell>{item.uraian}</TableCell>
                      <TableCell className="text-center">{item.harga_satuan}</TableCell>
                      <TableCell className="text-right">{item.jumlah.toLocaleString("us-US")}</TableCell>
                      <TableCell className="text-right">Rp {item.harga_total.toLocaleString("id-ID")}</TableCell>
                    </TableRow>
                  ))}
                </>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}></TableCell>
              </TableRow>
            )}
            <TableRow className="font-semibold">
              <TableCell className="text-center">057</TableCell>
              <TableCell>Peralatan Fasilitas Perkantoran Perwakilan</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">Rp {grupItem["057"]?.total.toLocaleString("id-ID")}</TableCell>
            </TableRow>
            {grupItem["057"] ? (
              Object.keys(grupItem["057"].accounts).map((accountNumber) => (
                <>
                  <TableRow key={accountNumber}>
                    <TableCell className="text-center">{grupItem["057"].accounts[accountNumber].number}</TableCell>
                    <TableCell>{grupItem["057"].accounts[accountNumber].name}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right">Rp {grupItem["057"].accounts[accountNumber].total.toLocaleString("id-ID")}</TableCell>
                  </TableRow>
                  {grupItem["057"].accounts[accountNumber].items.map((item) => (
                    <TableRow key={item.no_urut}>
                      <TableCell></TableCell>
                      <TableCell>{item.uraian}</TableCell>
                      <TableCell className="text-center">{item.harga_satuan}</TableCell>
                      <TableCell className="text-right">{item.jumlah.toLocaleString("us-US")}</TableCell>
                      <TableCell className="text-right">Rp {item.harga_total.toLocaleString("id-ID")}</TableCell>
                    </TableRow>
                  ))}
                </>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}></TableCell>
              </TableRow>
            )}
            <TableRow className="font-semibold">
              <TableCell className="text-center">6023.EBB.971</TableCell>
              <TableCell>Layanan PraSarana Internal</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">Rp {grupItem["058"]?.total.toLocaleString("id-ID")}</TableCell>
            </TableRow>
            <TableRow className="font-semibold">
              <TableCell className="text-center">058</TableCell>
              <TableCell>
                Pembangunan/Renovasi Gedung dan Bangunan Perwakilan RI
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">Rp {grupItem["058"]?.total.toLocaleString("id-ID")}</TableCell>
            </TableRow>
            {grupItem["058"] ? (
              Object.keys(grupItem["058"].accounts).map((accountNumber) => (
                <>
                  <TableRow key={accountNumber}>
                    <TableCell className="text-center">{grupItem["058"].accounts[accountNumber].number}</TableCell>
                    <TableCell>{grupItem["058"].accounts[accountNumber].name}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className="text-right">Rp {grupItem["058"].accounts[accountNumber].total.toLocaleString("id-ID")}</TableCell>
                  </TableRow>
                  {grupItem["058"].accounts[accountNumber].items.map((item) => (
                    <TableRow key={item.no_urut}>
                      <TableCell></TableCell>
                      <TableCell>{item.uraian}</TableCell>
                      <TableCell className="text-center">{item.harga_satuan}</TableCell>
                      <TableCell className="text-right">{item.jumlah.toLocaleString("us-US")}</TableCell>
                      <TableCell className="text-right">Rp {item.harga_total.toLocaleString("id-ID")}</TableCell>
                    </TableRow>
                  ))}
                </>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5}></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
