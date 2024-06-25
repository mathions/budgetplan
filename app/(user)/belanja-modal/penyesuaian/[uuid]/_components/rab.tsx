"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash, Note, DollarCircle } from "iconsax-react";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table-rab";
import { Input } from "@/components/ui/input-rab";
import { GrupItem, Item, Akun, MataUang, Kurs } from "@/lib/definitions";
import { postItems, updateKurs, getExcelPenyesuaian } from "@/services/user";
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

  async function exportRAB() {
    setIsExportLoading(true);
    try {
      const res = await getExcelPenyesuaian(token, uuid);
      console.log(res);
      if (res.ok) {
        const pdfBlob = await res.blob();
        const url = window.URL.createObjectURL(new Blob([pdfBlob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "RAB.xlsx");
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:justify-between md:items-end">
        <h4>Rencana Anggaran Biaya</h4>
        <div className="flex gap-4">
          <Button variant="secondary" disabled={isExportLoading} onClick={exportRAB}>{isExportLoading && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
            Ekspor
          </Button>
        </div>
      </div>
      <Card className="p-8 space-y-6">
        <div className="flex">
          <div className="basis-40 text-textweak">
            <p>Mata Uang</p>
            <p>Kode</p>
            <p>Nilai Tukar</p>
          </div>
          <div className="flex-1">
            <p>: <span className="font-semibold">{currency?.name}</span> </p>
            <p>: <span className="font-semibold">{currency?.initial}</span></p>
            <p>: <span className="font-semibold">Rp {currency?.kurs.toLocaleString("id-ID")}</span></p>
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
                      <TableCell></TableCell>
                      <TableCell>{grupItem["055"].accounts[accountNumber].number} - {grupItem["055"].accounts[accountNumber].name}</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell className="text-right">Rp {grupItem["055"].accounts[accountNumber].total.toLocaleString("id-ID")}</TableCell>
                    </TableRow>
                    {grupItem["055"].accounts[accountNumber].items.map((item) => (
                      <TableRow key={item.no_urut}>
                        <TableCell></TableCell>
                        <TableCell>{item.uraian}</TableCell>
                        <TableCell className="text-center">{item.jumlah}</TableCell>
                        <TableCell className="text-right">{item.harga_satuan.toLocaleString("us-US")}</TableCell>
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
                      <TableCell></TableCell>
                      <TableCell>{grupItem["056"].accounts[accountNumber].number} - {grupItem["056"].accounts[accountNumber].name}</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell className="text-right">Rp {grupItem["056"].accounts[accountNumber].total.toLocaleString("id-ID")}</TableCell>
                    </TableRow>
                    {grupItem["056"].accounts[accountNumber].items.map((item) => (
                      <TableRow key={item.no_urut}>
                        <TableCell></TableCell>
                        <TableCell>{item.uraian}</TableCell>
                        <TableCell className="text-center">{item.jumlah}</TableCell>
                        <TableCell className="text-right">{item.harga_satuan.toLocaleString("us-US")}</TableCell>
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
                      <TableCell></TableCell>
                      <TableCell>{grupItem["057"].accounts[accountNumber].number} - {grupItem["057"].accounts[accountNumber].name}</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell className="text-right">Rp {grupItem["057"].accounts[accountNumber].total.toLocaleString("id-ID")}</TableCell>
                    </TableRow>
                    {grupItem["057"].accounts[accountNumber].items.map((item) => (
                      <TableRow key={item.no_urut}>
                        <TableCell></TableCell>
                        <TableCell>{item.uraian}</TableCell>
                        <TableCell className="text-center">{item.jumlah}</TableCell>
                        <TableCell className="text-right">{item.harga_satuan.toLocaleString("us-US")}</TableCell>
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
                      <TableCell></TableCell>
                      <TableCell>{grupItem["058"].accounts[accountNumber].number} - {grupItem["058"].accounts[accountNumber].name}</TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell className="text-right">Rp {grupItem["058"].accounts[accountNumber].total.toLocaleString("id-ID")}</TableCell>
                    </TableRow>
                    {grupItem["058"].accounts[accountNumber].items.map((item) => (
                      <TableRow key={item.no_urut}>
                        <TableCell></TableCell>
                        <TableCell>{item.uraian}</TableCell>
                        <TableCell className="text-center">{item.jumlah}</TableCell>
                        <TableCell className="text-right">{item.harga_satuan.toLocaleString("us-US")}</TableCell>
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
    </div>
  );
}
