export async function createBelMod(token:string, year:string) {
  const res = await fetch('http://localhost/skripsi/public/api/admin/year', {
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

export  async function getProposal(token:string, slug:string) {
  const res = await fetch(`http://localhost/skripsi/public/api/admin/proposal/${slug}`, {
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

export  async function getItems(token:string, slug:string) {
  const res = await fetch(`http://localhost/skripsi/public/api/admin/proposal/${slug}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
    }
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse)
  if (res.status === 200) {
    return jsonResponse.data.items;
  } else {
    return jsonResponse;
  }
}

export async function getBrafaks(token: string, slug:string){
  const res = await fetch(`http://localhost/skripsi/public/api/admin/proposal/${slug}/brafaks`, {
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