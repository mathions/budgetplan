"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getExcelRekap } from "@/services/admin";
import { ExportCircle } from "iconsax-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogClose, } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const FormSchema = z.object({
  year: z.number({
    required_error: "Tahun anggaran belum terpilih.",
  }),
});

export type Year = {
  year: number;
  label: string;
}

export function Ekspor({ token, year }: { token: string, year: Year[] }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      const res = await getExcelRekap(token, data);
      console.log(res);
      if (res.ok) {
        const pdfBlob = await res.blob();
        const url = window.URL.createObjectURL(new Blob([pdfBlob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "rekapitulasi RAB.xlsx");
        document.body.appendChild(link);
        link.click();
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
        window.URL.revokeObjectURL(url);
        setIsLoading(false);
        toast({
          title: "Berkas berhasil diunduh",
        });
      } else {
        setIsLoading(false);
        toast({
          title: "Gagal mengunduh berkas",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // const currentYear = new Date().getFullYear();
  // const year: { label: string; value: string }[] = Array.from(
  //   { length: 3 },
  //   (_, index) => {
  //     const label = `${currentYear + index}`;
  //     return { label, value: label };
  //   }
  // );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <ExportCircle className="mr-2 h-4 w-4" />
          Ekspor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <h4>Ekspor Rekapitulasi</h4>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-2"
          >
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-2">
                  <FormLabel>Tahun Anggaran</FormLabel>
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
                            ? year.find(
                                (year) => year.year === field.value
                              )?.year
                            : "Pilih tahun anggaran"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Cari tahun anggaran..." />
                        <CommandEmpty>
                          Tahun anggaran tidak ditemukan.
                        </CommandEmpty>
                        <CommandGroup>
                          {year.map((year) => (
                            <CommandItem
                              value={year.label}
                              key={year.year}
                              onSelect={() => {
                                form.setValue("year", year.year);
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  year.year === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {year.year}
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
            <div className="flex justify-start gap-4 pt-2">
              <Button disabled={isLoading} type="submit">
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Ekspor
              </Button>
              <DialogClose asChild>
                <Button variant="secondary">Batal</Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
