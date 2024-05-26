"use client";
import { useRouter} from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogClose, } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ClipboardTick } from "iconsax-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { Icons } from "@/components/icons";
import { updateStatusAbt } from "@/lib/service-admin";

const FormSchema = z.object({
  status:  z.enum(["Diproses", "Diterima", "Ditolak"], {
    required_error: "Status perlu dipilih",
  }),
});

export function BeriKeputusan({ uuid, token }: { uuid:string, token:string }) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    try {
      const res = await updateStatusAbt(token, uuid, data);
      console.log(res);
      console.log(res.message);
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
          <ClipboardTick className="mr-2 w-5 h-5" />
            Beri Keputusan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <h4>Beri Keputusan</h4>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Diterima" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Diterima
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Diproses" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Diproses
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Ditolak" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Ditolak
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
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
