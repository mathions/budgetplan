const url = 'https://budgetplan.masuk.id/api/v1';

export async function createBelMod(token:string, year:string) {
  const res = await fetch(`${url}/a/year/create`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
        year: year,
    }),
  });
  return res;
}

export  async function getProposal(token:string, uuid:string) {
  const res = await fetch(`${url}/a/proposal/detail/${uuid}`, {
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

export  async function getItems(token:string, uuid:string) {
  const res = await fetch(`${url}/a/proposal/detail/${uuid}`, {
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

export async function getBrafaks(token: string, uuid:string){
  const res = await fetch(`${url}/a/proposal/brafaks-latest/${uuid}`, {
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

export async function getAbt(token: string){
  const res = await fetch(`${url}/a/abt`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
    }
  });
  console.log(res)
  if (res.status === 200) {
    return res;
  } else {
    return res;
  }
}

export async function getDetailAbt(token: string, uuid:string){
  const res = await fetch(`${url}/a/abt/detail/${uuid}`, {
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
  const res = await fetch(`${url}/a/abt/abtfile/${uuid}`, {
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

export async function editStatusBelmod(token:string, uuid:string, status:string){
  const res = await fetch(`${url}/a/proposal/status/${uuid}?_method=PATCH`, {
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

export async function editStatusAbt(token:string, uuid:string, status:string){
  const res = await fetch(`${url}/a/abt/status/${uuid}?_method=PATCH`, {
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