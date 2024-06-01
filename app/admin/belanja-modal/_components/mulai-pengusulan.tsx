"use client";

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Add } from "iconsax-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle, DialogTrigger, DialogClose, } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { createYear } from "@/lib/service-admin";

const FormSchema = z.object({
  year: z.string({
    required_error: "A year is required.",
  }),
  deadline: z.date({
    required_error: "Deadline is required.",
  }),
});

export function MulaiPengusulan({ token }: { token: string }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const dl = format(new Date(data.deadline), "yyyy-MM-dd");
    setIsLoading(true);
    try {
      const res = await createYear(token, data.year, dl);
      console.log(res);
      if (res.ok) {
        setIsLoading(false);
        setOpen(false);
        router.refresh();
        form.reset();
        toast({
          title: "Pengusulan berhasil dimulai.",
        });
      } else {
        setIsLoading(false);
        setOpen(false);
        toast({
          title: "Gagal memulai pengusulan",
          description: res.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  const currentYear = new Date().getFullYear();
  const year: { label: string; value: string }[] = Array.from(
    { length: 5 },
    (_, index) => {
      const label = `${currentYear + index}`;
      return { label, value: label };
    }
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Add className="mr-2 h-5 w-5" />
          Mulai Pengusulan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <h4>Mulai Pengusulan</h4>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-2">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-2">
                    <FormLabel>Tahun Anggaran</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih tahun" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {year.map((year) => (
                          <SelectItem
                            value={year.label}
                            key={year.value}
                            onSelect={() => {
                              form.setValue("year", year.value);
                            }}
                          >
                            {year.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-3">
                    <FormLabel>Deadline Penyampaian Usulan</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd-MMM-yyyy") // Modified date format
                            ) : (
                              <span>Pilih tanggal</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0"
                        align="start"
                        side="top"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date: any) =>
                            date < new Date() || date > new Date("2100-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-start gap-4">
              <Button type="submit">Mulai Pengusulan</Button>
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
