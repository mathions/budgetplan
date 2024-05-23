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

export async function postUser(token: string, data:any){
  const res = await fetch(`${url}/sa/register`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse)
  if (res.status === 201) {
    return res;
  } else {
    return res;
  }
}

export async function deleteUser(token: string, uuid:string){
  const res = await fetch(`${url}/sa/user/${uuid}/?_method=DELETE`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const jsonResponse = await res.json();
  console.log(res)
  if (res.status === 200) {
    return res;
  } else {
    return res;
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

export async function postAccount(token: string, data:any){
  const res = await fetch(`${url}/sa/account`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse)
  if (res.status === 200) {
    return res;
  } else {
    return res;
  }
}

export async function deleteAccount(token: string, uuid:string){
  const res = await fetch(`${url}/sa/account/${uuid}/?_method=DELETE`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  const jsonResponse = await res.json();
  console.log(res)
  if (res.status === 200) {
    return res;
  } else {
    return res;
  }
}

// MATA UANG
export async function getCurrency(token: string){
  const res = await fetch(`${url}/sa/currency`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
  });
  const jsonResponse = await res.json();
  return jsonResponse.data;
}

export async function postCurrency(token: string, data:any){
  const res = await fetch(`${url}/sa/currency`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res;
}

export async function deleteCurrency(token: string, uuid:string){
  const res = await fetch(`${url}/sa/currency/${uuid}/?_method=DELETE`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return res;
}
