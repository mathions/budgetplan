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

if (jsonResponse.status === 'success') {
    return jsonResponse;
} else {
    console.error('Login failed. Message:', jsonResponse.message);
}
};

export async function createBelMod(token:string, year:number) {
    const res = await fetch('http://localhost/skripsi/public/umum/year', {
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
