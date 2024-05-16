import { unstable_noStore as noStore } from "next/cache";
import { AbtTable } from "./definitions";

const url = 'https://api.budgetplan.masuk.id/api/v1';

export async function login(data: { username: string, password: string}) {
  const res = await fetch(`${url}/auth/login`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username: data.username,
        password: data.password,
    }),
  });

  const jsonResponse = await res.json();  console.log(res)
  console.log(jsonResponse)
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
  const res = await fetch(`${url}/proposal/${uuid}`, {
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
  const res = await fetch(`${url}/proposal/${uuid}/items`, {
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

export async function getFilesPath(token: string, uuid: string) {
  noStore()
  const res = await fetch(`${url}/proposal/${uuid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse)
  if (res.status === 200) {
    return jsonResponse?.data?.files;
  } else {
    return jsonResponse;
  }
}

export async function postFiles(token: string, uuid:string, data: any){
  const res = await fetch(`${url}/proposal/${uuid}/files/upload`, {
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

export async function getFiles(token: string, uuid:string){
  const res = await fetch(`${url}/proposal/${uuid}/latest`, {
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
  const res = await fetch(`${url}/proposal/${uuid}/finalize?_method=PATCH`, {
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

export async function getItemsApproved(token: string, uuid: string) {
  const res = await fetch(`${url}/proposal/${uuid}/approved`, {
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

export async function postAbt(token: string, data:any){
  const res = await fetch(`${url}/abt/create`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: data,
  });
  console.log(data)
  console.log(res)
  const jsonResponse = await res.json();
  console.log(jsonResponse)
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
  const res = await fetch(`${url}/abt/${uuid}`, {
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

export async function getFilesAbt(token: string, uuid:string){
  const res = await fetch(`${url}/abt/${uuid}/files`, {
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

