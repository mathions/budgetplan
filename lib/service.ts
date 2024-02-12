export async function login(data: { username: string, password: string}) {
  const res = await fetch('http://localhost/skripsi/public/api/login', {
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
    const res = await fetch('http://localhost/skripsi/public/api/proposal', {
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
      return res.json();
    }
  }

export  async function getItems(token: string, slug: string) {
    try {
      const res = await fetch(`http://localhost/skripsi/public/api/proposal/${slug}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
  
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const jsonResponse = await res.json();
      if (jsonResponse && jsonResponse.data && jsonResponse.data.items) {
        return jsonResponse.data.items;
      } else {
        throw new Error('Items not found in response');
      }
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

export async function postItems(token: string, slug:string, data:any){
  const res = await fetch(`http://localhost/skripsi/public/api/proposal/${slug}/items`, {
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
  console.log(jsonResponse)
  if (res.status === 200) {
    return jsonResponse;
  } else {
    return res.json();
  }
}

export async function postBrafaks(token: string, slug:string, data: any){
  const res = await fetch(`http://localhost/skripsi/public/api/proposal/${slug}/brafaks`, {
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

export async function getBrafaks(token: string, slug:string){
  const res = await fetch(`http://localhost/skripsi/public/api/proposal/${slug}/brafaks/1`, {
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

