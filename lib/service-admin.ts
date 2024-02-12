export async function createBelMod(token:string, year:number) {
  const res = await fetch('http://localhost/skripsi/public/admin/year', {
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

  if (jsonResponse.status === 'success') {
      const message = jsonResponse.message;
      console.log(message);
  } else {
      console.error('Login failed. Message:', jsonResponse.message);
  }
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