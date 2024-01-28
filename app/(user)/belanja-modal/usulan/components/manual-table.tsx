  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table"


  export default function ManualTable () {
    
    return(
      <div className="rounded-md border">
        <Table>
          <TableHeader>
              <TableRow>
                  <TableHead className="w-[100px] text-center">Kode</TableHead>
                  <TableHead className="text-center">Uraian RO/Komponen/Akun/Detil</TableHead>
                  <TableHead className="text-center">Jml Unit</TableHead>
                  <TableHead className="text-center">Harga Satuan</TableHead>
                  <TableHead className="text-center">Jumlah</TableHead>
                  <TableHead className="text-center"></TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="text-center">6023.EBB</TableCell>
              <TableCell>Layanan Sarana dan Prasarana Internal</TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
              <TableCell>Rp 3,052,324,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center">6023.EBB.951</TableCell>
              <TableCell>Layanan Sarana Internal</TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
              <TableCell>Rp 2,196,324,000</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center">055</TableCell>
              <TableCell>Kendaraan Bermotor Perwakilan RI</TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
              <TableCell>Rp 900,000,000</TableCell>
              <TableCell><Button variant="outline" className="justify-self-end h-9 font-medium">+</Button></TableCell>
            </TableRow>
            <TableRow >
              <TableCell> </TableCell>
              <TableCell>532111 Belanja Modal Peralatan dan Mesin</TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
              <TableCell>RP 900,000,000</TableCell>
              <TableCell><Button variant="outline" className="justify-self-end h-9 font-medium">+</Button></TableCell>
            </TableRow>
            <TableRow >
              <TableCell> </TableCell>
              <TableCell><Input defaultValue="Ford Transit Sprinter (Kendaraan Dinas)"></Input></TableCell>
              <TableCell><Input defaultValue="1"></Input></TableCell>
              <TableCell><Input defaultValue="$ 59,8111.00"></Input></TableCell>
              <TableCell><Input defaultValue="Rp 897,000,000"></Input></TableCell>
              <TableCell><Button variant="outline" className="justify-self-end h-9 font-medium">-</Button></TableCell>
            </TableRow>
            <TableRow >
              <TableCell> </TableCell>
              <TableCell><Input defaultValue="Honorarium Panitia Pengadaan"></Input></TableCell>
              <TableCell><Input defaultValue="3"></Input></TableCell>
              <TableCell><Input defaultValue="$ 63.00"></Input></TableCell>
              <TableCell><Input defaultValue="Rp 2,835,000"></Input></TableCell>
              <TableCell><Button variant="outline" className="justify-self-end h-9 font-medium">-</Button></TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-center">056</TableCell>
              <TableCell>Perangkat Pengolah Data dan Komunikasi Perwakilan</TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
              <TableCell>Rp 268,000,000</TableCell>
              <TableCell><Button variant="outline" className="justify-self-end h-9 font-medium">+</Button></TableCell>
            </TableRow>
            <TableRow >
              <TableCell> </TableCell>
              <TableCell>532111 Belanja Modal Peralatan dan Mesin</TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
              <TableCell>RP 268,000,000</TableCell>
              
              <TableCell><Button variant="outline" className="justify-self-end h-9 font-medium">+</Button></TableCell>
            </TableRow>
            <TableRow >
              <TableCell> </TableCell>
              <TableCell><Input ></Input></TableCell>
              <TableCell><Input ></Input></TableCell>
              <TableCell><Input ></Input></TableCell>
              <TableCell><Input ></Input></TableCell>
              <TableCell><Button variant="outline" className="justify-self-end h-9 font-medium">-</Button></TableCell>
            </TableRow>
            <TableRow >
              <TableCell> </TableCell>
              <TableCell><Input ></Input></TableCell>
              <TableCell><Input ></Input></TableCell>
              <TableCell><Input ></Input></TableCell>
              <TableCell><Input ></Input></TableCell>
              <TableCell><Button variant="outline" className="justify-self-end h-9 font-medium">-</Button></TableCell>
            </TableRow>

          </TableBody>
          
        </Table>
      </div>
    )
  }