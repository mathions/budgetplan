
export type Item = {
  no_urut: string;
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

export interface GroupedItems {
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