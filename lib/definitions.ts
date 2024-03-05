
export type BelmodTable = {
  no_urut: number
  uuid: string
  year: string
  user: string
  status: string
  created_at: string
  updated_at: string
}

export type YearTable = {
  year: string
  is_active: string
  proposal_count: number
  uuid: string
}

export type AbtTable = {
  no_urut: string
  uuid: string
  status: string
  office: string
  perihal: string
  created_at: string
}

export type Item = {
  no_urut: string;
  output_number: string;
  output: string;
  code_number: string;
  code: string;
  account_number: string;
  account: string;
  uraian: string;
  jumlah: number;
  harga_satuan: number;
  harga_total: number;
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