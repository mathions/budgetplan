
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

export interface GrupItem{
  [code_number: string]: {
    name: string;
    total: number;
    accounts: {
      [account_number: string]: {
        number: string;
        name: string;
        total: number;
        items: Item[];
      };
    };
  };
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

export type RabDashboard = {
  area: string;
  kendaraan: number;
  perangkat: number;
  peralatan: number;
  pembangunan: number;
  total: number;
}

export type Akun = {
  no_urut: number;
  account_number: string;
  account_name: string;
}

export type MataUang = {
  name: string;
  initial: string;
  kurs: number;
}

export type Kurs = {
  uuid: string;
  name: string;
  initial: string;
  value: number;
}

//SUPER ADMIN
export type User = {
  uuid: string;
  username: string;
  name: string;
  role: string;
  office: string;
  office_code: string;
  area: string;
  image: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Account = {
  uuid: string;
  account_code: string;
  account_name: string;
  createdAt: string;
  updatedAt: string;
}

export type Currency = {
  uuid: string;
  name: string;
  initial: string;
}

export type Notification = {
  title: string;
  message: string;
}

