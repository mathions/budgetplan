import { unstable_noStore as noStore } from "next/cache";
import { AbtTable, BelmodTable } from "./definitions";

const url = 'https://api.budgetplan.masuk.id/api/v1';

export async function createBelMod(token:string, year:string) {
  const res = await fetch(`${url}/a/year`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
        year: year,
    }),
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse)
  return res;
}

export async function getProposal(token:string): Promise<BelmodTable[]>  {
  noStore()
  const res = await fetch(`${url}/a/proposal/`, {
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

export  async function getDetailProposal(token:string, uuid:string) {
  noStore()
  const res = await fetch(`${url}/a/proposal/${uuid}`, {
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

export async function getItems(token:string, uuid:string) {
  noStore()
  const res = await fetch(`${url}/a/proposal/${uuid}`, {
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

export async function getListFiles(token: string, uuid:string){
  const res = await fetch(`${url}/a/proposal/${uuid}/files`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    }
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse)
  if (res.status === 200) {
    return jsonResponse;
  } else {
    return res;
  }
}

export async function getFiles(token: string, uuid:string, fileuuid: string){
  const res = await fetch(`${url}/a/proposal/${uuid}/files/${fileuuid}`, {
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

export async function getYear(token:string) {
  noStore()
  const res = await fetch(`${url}/a/year`, {
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

export async function getDetailYear(token:string, uuid:string) {
  noStore()
  const res = await fetch(`${url}/a/year/${uuid}`, {
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

export async function rabToApproved(token: string, uuid:string){
  const res = await fetch(`${url}/a/proposal/${uuid}/rab-to-approved`, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`,
    },
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse)
  if (res.status === 201) {
    return jsonResponse;
  } else {
    return jsonResponse;
  }
}

export async function getItemsApproved(token: string, uuid:string){
  const res = await fetch(`${url}/a/proposal/${uuid}/approved`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse)
  if (res.status === 200) {
    return jsonResponse?.data?.items;
  } else {
    return jsonResponse;
  }
}

export async function postItemsApproved(token: string, uuid:string, data:any){
  const res = await fetch(`${url}/a/proposal/${uuid}/approved`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      data: data
  }),
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse)
  if (res.status === 201) {
    return jsonResponse;
  } else {
    return jsonResponse;
  }
}


export async function getAbt(token:string): Promise<AbtTable[]>  {
  const res = await fetch(`${url}/a/abt/`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
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
  noStore()
  const res = await fetch(`${url}/a/abt/${uuid}`, {
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
  const res = await fetch(`${url}/a/abt/${uuid}/files`, {
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

export async function ubahStatusBelmod(token:string, uuid:string, status:string){
  const res = await fetch(`${url}/a/proposal/${uuid}?_method=PATCH`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      status: status,
  }),
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse.data)
  if (res.status === 200) {
    return jsonResponse.data;
  } else {
    return jsonResponse;
  }
}

export async function editStatusAbt(token:string, uuid:string, status:string){
  const res = await fetch(`${url}/a/abt/${uuid}?_method=PATCH`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      status_id: status,
  }),
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse.data)
  if (res.status === 200) {
    return jsonResponse.data;
  } else {
    return jsonResponse;
  }
}