
export type Item = {
  no_urut: string;
  output_number: string;
  output: string;
  code_number: string;
  code: string;
  account_number: string;
  account: string;
  uraian: string;
  jumlah: string;
  harga_satuan: string;
  total_harga: string;
}

export interface GroupedItems {
  [output_number: string]: {
    name: string;
    total: number;
    codes: {
      [code_number: string]: {
        name: string;
        total: number;
        accounts: {
          [account_number: string]: {
            name: string;
            total: number;
            items: Item[];
          };
        };
      };
    }
  }
}