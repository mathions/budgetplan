import { getServerSession } from "next-auth"
import { authOptions }from "@/app/api/auth/[...nextauth]/route"
import {Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";

export type Item = {
  no_urut: number;
  output_id: string;
  output: string;
  code_id: string;
  code: string;
  account_id: string;
  account: string;
  uraian: string;
  jumlah: string;
  harga_satuan: string;
  total_harga: string;
}

interface GroupedItems {
  [output_id: string]: {
    name: string;
    total: number;
    codes: {
      [code_id: string]: {
        name: string;
        total: number;
        accounts: {
          [account_id: string]: {
            name: string;
            total: number;
            items: Item[];
          };
        };
      };
    }
  }
}

async function getItems(token:string, slug:string) {
  const res = await fetch(`http://localhost/skripsi/public/api/admin/proposal/${slug}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
    }
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse)
  if (res.status === 200) {
    return jsonResponse.data.items;
  } else {
    return res.json();
  }
}


export default async function Usulan({ params }: {params: { slug: string } }) {
  const slug = params.slug;
  const session: any = await getServerSession(authOptions)
  const token = session?.user?.token;
  
  const items: Item[] = await getItems(token, slug)
  const groupedItems: GroupedItems = {};
  let total = 0;

  // Group items based on code_id and then account_id
  items.forEach((item) => {
    if (!groupedItems[item.output_id]) {
      groupedItems[item.output_id] = { name: "", total: 0, codes: {} };
    }

    if (!groupedItems[item.output_id].codes[item.code_id]) {
      groupedItems[item.output_id].codes[item.code_id] = { name: "", total: 0, accounts: {} };
    }

    if (!groupedItems[item.output_id].codes[item.code_id].accounts[item.account_id]) {
      groupedItems[item.output_id].codes[item.code_id].accounts[item.account_id] = { name: "", total: 0, items: [] };
    }

    groupedItems[item.output_id].total += parseInt(item.total_harga, 10);
    groupedItems[item.output_id].name = item.output;
    groupedItems[item.output_id].codes[item.code_id].total += parseInt(item.total_harga, 10);
    groupedItems[item.output_id].codes[item.code_id].name = item.code;
    groupedItems[item.output_id].codes[item.code_id].accounts[item.account_id].total += parseInt(item.total_harga, 10);
    groupedItems[item.output_id].codes[item.code_id].accounts[item.account_id].name = item.account;
    groupedItems[item.output_id].codes[item.code_id].accounts[item.account_id].items.push(item);

    total += parseInt(item.total_harga, 10);
  });

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="w-[100px]">Kode</TableCell>
            <TableCell>Uraian RO/Komponen/Akun/Detil</TableCell>
            <TableCell>Jml Unit</TableCell>
            <TableCell>Harga Satuan</TableCell>
            <TableCell>Jumlah</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>6023</TableCell>
            <TableCell colSpan={3}>Pengelolaan Keuangan BMN dan Umum</TableCell>
            <TableCell>Rp {total}</TableCell>
          </TableRow>
          
          {Object.keys(groupedItems).map((outputId) => (
            <>
              <TableRow key={`output_${outputId}`}>
                <TableCell>{outputId}</TableCell>
                <TableCell colSpan={3}>{groupedItems[outputId].name}</TableCell>
                <TableCell>{`Rp ${groupedItems[outputId].total}`}</TableCell>
              </TableRow>

              {Object.keys(groupedItems[outputId].codes).map((codeId) => (
                <>
                  <TableRow key={`code_${codeId}`}>
                    <TableCell>{codeId}</TableCell>
                    <TableCell colSpan={3}>{groupedItems[outputId].codes[codeId].name}</TableCell>
                    <TableCell>{`Rp ${groupedItems[outputId].codes[codeId].total}`}</TableCell>
                  </TableRow>
                  {Object.keys(groupedItems[outputId].codes[codeId].accounts).map((accountId) => (
                    <>
                      <TableRow key={`account_${accountId}`}>
                        <TableCell></TableCell>
                        <TableCell colSpan={3}>{`${accountId} - ${groupedItems[outputId].codes[codeId].accounts[accountId].name}`}</TableCell>
                        <TableCell>{`Rp ${groupedItems[outputId].codes[codeId].accounts[accountId].total}`}</TableCell>
                      </TableRow>
                      {groupedItems[outputId].codes[codeId].accounts[accountId].items.map((item) => (
                        <TableRow key={item.no_urut}>
                          <TableCell> </TableCell>
                          <TableCell>{item.uraian}</TableCell>
                          <TableCell>{item.jumlah}</TableCell>   
                          <TableCell>$ {item.harga_satuan}</TableCell>
                          <TableCell>Rp {item.total_harga}</TableCell>
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
