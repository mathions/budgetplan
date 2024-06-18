import { url } from './constans';

export async function login(data: { username: string; password: string }) {
  const res = await fetch(`${url}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: data.username,
      password: data.password,
    }),
  });
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    console.error("Login failed. Message:", jsonResponse.message);
  }
}

export async function getNotifikasi(token: string) {
  const res = await fetch(`${url}/auth/notification`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  const jsonResponse = await res.json();
  return jsonResponse?.data;
}

export async function getDetailNotifikasi(token: string, uuid: string) {
  const res = await fetch(`${url}/auth/notification/${uuid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse);
  return jsonResponse;
}

export async function getProfil(token: string) {
  const res = await fetch(`${url}/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });
  const jsonResponse = await res.json();
  return jsonResponse?.data;
}

export async function updatePassword(token: string, data:any){
  const res = await fetch(`${url}/auth/me/password?_method=PATCH`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse);
  if (res.ok) {
    return res;
  } else {
    return jsonResponse;
  }
}

export async function updateProfil(token: string, data:any){
  const res = await fetch(`${url}/auth/me?_method=PATCH`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse);
  if (res.ok) {
    return res;
  } else {
    return jsonResponse;
  }
}