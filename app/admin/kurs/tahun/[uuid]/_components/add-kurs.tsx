"use client";

import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { postKurs } from "@/lib/service-admin";
import { Button } from "@/components/ui/button";
import { AddSquare } from "iconsax-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Currency } from "@/lib/definitions";
import { Icons } from "@/components/icons";
import CurrencyInput from 'react-currency-input-field';

const FormSchema = z.object({
  name: z.string({
    required_error: "Mata uang perlu dipilih",
  }),
  value: z.string({
    required_error: "Nilai tukar perlu diisi",
  }),
});

export function AddKurs({
  currency,
  uuid,
}: {
  currency: Currency[];
  uuid: string;
}) {
  const { data: session }: { data: any } = useSession();
  const token = session?.user?.token;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currencyUuid, setCurrencyUuid] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      const res = await postKurs(token, uuid, currencyUuid, data);
      console.log(res);
      if (res.ok) {
        setIsLoading(false);
        setOpen(false);
        router.refresh();
        toast({
          title: "Kurs berhadil ditambahkan.",
        });
      } else {
        setIsLoading(false);
        setOpen(false);
        toast({
          title: "Gagal menambahkan kurs",
          description: res.message,
          variant: "destructive",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <AddSquare className="mr-2 h-5 w-5" />
          Tambah Kurs
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] space-y-4">
        <DialogHeader>
          <h4>Tambah Kurs</h4>
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
                              ? currency.find(
                                  (currency) => currency.name === field.value
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
                            {currency.map((currency) => (
                              <CommandItem
                                value={currency.name}
                                key={currency.uuid}
                                onSelect={() => {
                                  form.setValue("name", currency.name);
                                  setCurrencyUuid(currency.uuid);
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    currency.name === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {currency.name}
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
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-2">
                    <FormLabel>Nilai Tukar</FormLabel>
                    <FormControl>
                      <CurrencyInput
                        className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-0"
                        onValueChange={(e) => field.onChange(e)}
                        groupSeparator="."
                        decimalSeparator=","
                        prefix="Rp "/>
                    </FormControl>
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
                Tambah Kurs
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
