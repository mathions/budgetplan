import { unstable_noStore as noStore } from "next/cache";

const url = 'https://api.budgetplan.masuk.id/api/v1';

// AKUN PENGGUNA
export async function getUser(token: string){
  const res = await fetch(`${url}/sa/user`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse.data)
  if (res.status === 200) {
    return jsonResponse.data;
  } else {
    return jsonResponse;
  }
}

// KODE AKUN
export async function getAccount(token: string){
  const res = await fetch(`${url}/sa/account`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse.data)
  if (res.status === 200) {
    return jsonResponse.data;
  } else {
    return jsonResponse;
  }
}