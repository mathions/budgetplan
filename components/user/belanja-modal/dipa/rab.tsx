import { GroupedItems, Item } from "@/lib/definitions";
import {Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

export default function Rab ({ items } : { items: [Item] }) {
  const groupedItems: GroupedItems = {};
  let total = 0;

  // Group items based on code_number and then account_number
  items.forEach((item) => {
    if (!groupedItems[item.output_number]) {
      groupedItems[item.output_number] = { name: "", total: 0, codes: {} };
    }
    if (!groupedItems[item.output_number].codes[item.code_number]) {
      groupedItems[item.output_number].codes[item.code_number] = { name: "", total: 0, accounts: {} };
    }
    if (!groupedItems[item.output_number].codes[item.code_number].accounts[item.account_number]) {
      groupedItems[item.output_number].codes[item.code_number].accounts[item.account_number] = { name: "", total: 0, items: [] };
    }
    groupedItems[item.output_number].total += parseInt(item.total_harga, 10);
    groupedItems[item.output_number].name = item.output;
    groupedItems[item.output_number].codes[item.code_number].total += parseInt(item.total_harga, 10);
    groupedItems[item.output_number].codes[item.code_number].name = item.code;
    groupedItems[item.output_number].codes[item.code_number].accounts[item.account_number].total += parseInt(item.total_harga, 10);
    groupedItems[item.output_number].codes[item.code_number].accounts[item.account_number].name = item.account;
    groupedItems[item.output_number].codes[item.code_number].accounts[item.account_number].items.push(item);
    total += parseInt(item.total_harga, 10);
  });
  return (
    <>
      <Table>
        <TableHeader>
        <TableRow>
          <TableCell className="w-[100px] text-center font-bold">Kode</TableCell>
          <TableCell className="text-center font-bold">Uraian RO/Komponen/Akun/Detil</TableCell>
          <TableCell className="w-[200px] text-center font-bold">Jumlah Unit</TableCell>
          <TableCell className="w-[200px] text-center font-bold">Harga Satuan</TableCell>
          <TableCell className="w-[200px] text-center font-bold">Jumlah</TableCell>
        </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="text-center font-semibold">6023</TableCell>
            <TableCell className="font-semibold" colSpan={3}>Pengelolaan Keuangan BMN dan Umum</TableCell>
            <TableCell className="font-semibold">Rp {total}</TableCell>
          </TableRow>
          
          {Object.keys(groupedItems).map((outputNumber) => (
            <>
              <TableRow key={`output_${outputNumber}`}>
                <TableCell className="text-center font-semibold">{outputNumber}</TableCell>
                <TableCell className="font-semibold" colSpan={3}>{groupedItems[outputNumber].name}</TableCell>
                <TableCell className="font-semibold">{`Rp ${groupedItems[outputNumber].total}`}</TableCell>
              </TableRow>

              {Object.keys(groupedItems[outputNumber].codes).map((codeNumber) => (
                <>
                  <TableRow key={`code_${codeNumber}`}>
                    <TableCell className="font-semibold text-center">{codeNumber}</TableCell>
                    <TableCell className="font-semibold" colSpan={3}>{groupedItems[outputNumber].codes[codeNumber].name}</TableCell>
                    <TableCell className="font-semibold">{`Rp ${groupedItems[outputNumber].codes[codeNumber].total}`}</TableCell>
                  </TableRow>
                  {Object.keys(groupedItems[outputNumber].codes[codeNumber].accounts).map((accountNumber) => (
                    <>
                      <TableRow key={`account_${accountNumber}`}>
                        <TableCell></TableCell>
                        <TableCell className="font-medium" colSpan={3}>{`${accountNumber} - ${groupedItems[outputNumber].codes[codeNumber].accounts[accountNumber].name}`}</TableCell>
                        <TableCell className="font-medium">{`Rp ${groupedItems[outputNumber].codes[codeNumber].accounts[accountNumber].total}`}</TableCell>
                      </TableRow>
                      {groupedItems[outputNumber].codes[codeNumber].accounts[accountNumber].items.map((item) => (
                        <TableRow key={item.no_urut}>
                          <TableCell> </TableCell>
                          <TableCell>{item.uraian}</TableCell>
                          <TableCell className="text-center">{item.jumlah}</TableCell>   
                          <TableCell className="text-center">$ {item.harga_satuan}</TableCell>
                          <TableCell className="">Rp {item.total_harga}</TableCell>
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
    </>
  );
}