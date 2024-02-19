import { unstable_noStore as noStore } from "next/cache";
import { AbtTable } from "./definitions";

const url = 'https://budgetplan.masuk.id/api/v1';

export async function login(data: { username: string, password: string}) {
  const res = await fetch(`${url}/login`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username: data.username,
        password: data.password,
    }),
  });

  const jsonResponse = await res.json();
  if (jsonResponse.success === true) {
      return jsonResponse;
  } else {
      console.error('Login failed. Message:', jsonResponse.message);
  }
};


export async function getProposal(token: string){
  const res = await fetch(`${url}/proposal/latest`, {
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

export async function getItems(token: string, uuid: string) {
  noStore()
  const res = await fetch(`${url}/proposal/detail/${uuid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse)
  if (res.status === 200) {
    return jsonResponse?.data?.items;
  } else {
    return jsonResponse;
  }
}

export async function postItems(token: string, uuid:string, data:any){
  const res = await fetch(`${url}/proposal/items/${uuid}`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      data: data
  }),
  });
  const jsonResponse = await res.json();
  console.log(data)
  console.log(jsonResponse)
  if (res.status === 200) {
    return jsonResponse;
  } else {
    return jsonResponse;
  }
}

export async function getBrafaksPath(token: string, uuid: string) {
  noStore()
  const res = await fetch(`${url}/proposal/detail/${uuid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse)
  if (res.status === 200) {
    return jsonResponse?.data?.brafaks;
  } else {
    return jsonResponse;
  }
}

export async function postBrafaks(token: string, uuid:string, data: any){
  const res = await fetch(`${url}/proposal/brafaks-store/${uuid}`, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`
    },
    body: data
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse)
  if (res.status === 200) {
    return jsonResponse;
  } else {
    return jsonResponse;
  }
}

export async function getBrafaks(token: string, uuid:string){
  const res = await fetch(`${url}/proposal/${uuid}/brafaks/1`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/pdf',
    }
  });
  console.log(res)
  if (res.status === 200) {
    return res;
  } else {
    return res;
  }
}

export async function editStatusBelmod(token:string, uuid:string){
  const res = await fetch(`${url}/proposal/status/${uuid}?_method=PATCH`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse.data)
  if (res.status === 200) {
    return jsonResponse.data;
  } else {
    return jsonResponse;
  }
}

export async function postAbt(token: string, data:any){
  const res = await fetch(`${url}/abt/create`, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`,
    },
    body: data
  });
  console.log(res)
  if (res.status === 201) {
    return res;
  } else {
    return res;
  }
}

export async function getAbt(token:string): Promise<AbtTable[]>  {
  noStore()
  const res = await fetch(`${url}/abt`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
    }
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse)
  if (res.status === 200) {
    return jsonResponse.data;
  } else {
    return jsonResponse;
  }
}

export async function getDetailAbt(token: string, uuid:string){
  const res = await fetch(`${url}/abt/detail/${uuid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
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

export async function getBrafaksAbt(token: string, uuid:string){
  const res = await fetch(`${url}/abt/abtfile/${uuid}`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/pdf',
    }
  });
  console.log(res)
  if (res.status === 200) {
    return res;
  } else {
    return res;
  }
}

