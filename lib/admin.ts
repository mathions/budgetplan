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