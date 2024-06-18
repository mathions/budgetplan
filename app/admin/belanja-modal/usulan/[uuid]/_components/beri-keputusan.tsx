"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ClipboardTick, Send2, Tag } from "iconsax-react";
import { useState } from "react";
import { Icons } from "@/components/icons";
import { updateStatus } from "@/services/admin";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogClose, } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";

const tags = [
  {
    id: "tag1",
    label: "Penyampaian usulan telah sesuai",
  },
  {
    id: "tag2",
    label: "Terdapat kesalahan penulisan pada brafaks",
  },
  {
    id: "tag3",
    label: "Rencana anggaran biaya terlalu besar",
  },
  {
    id: "tag4",
    label: "Lampiran pendukung tidak lengkap",
  },
] as const;

const FormSchema = z.object({
  status: z.enum(["Butuh Revisi", "Diterima"], {
    required_error: "Status perlu dipilih",
  }),
  tag: z.array(z.string()).refine((value) => value.some((tag) => tag), {
    message: "Pilih minimal satu tag",
  }),
  note: z.string().optional(),
});

export default function BeriKeputusan({ uuid, token }: { uuid:string, token:string }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tag: [],
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      const res = await updateStatus(token, uuid, data);
      console.log(res);
      if (res.ok) {
        setIsLoading(false);
        setOpen(false);
        router.refresh();
        toast({
          title: "Keputusan berhasil diberikan",
        });
      } else {
        setIsLoading(false);
        setOpen(false);
        toast({
          title: "Gagal memberikan keputusan",
          description: res.errors,
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
          <ClipboardTick className="mr-2 w-5 h-5" />
          Beri Keputusan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <h4>Beri Keputusan</h4>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-2">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-2">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Butuh Revisi" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Butuh Revisi
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Diterima" />
                        </FormControl>
                        <FormLabel className="font-normal">Diterima</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tag"
              render={() => (
                <FormItem>
                  <div className="">
                    <FormLabel className="text-base">Tag</FormLabel>
                  </div>
                  {tags.map((tag) => (
                    <FormField
                      key={tag.id}
                      control={form.control}
                      name="tag"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={tag.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(tag.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, tag.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== tag.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {tag.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-2">
                  <FormLabel>Catatan</FormLabel>
                  <Textarea {...field} />
                  <FormControl></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-start gap-4">
              <Button disabled={isLoading} type="submit">
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Beri Keputusan
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
