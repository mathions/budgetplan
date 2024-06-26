import { url } from './constans';
import { unstable_noStore as noStore } from "next/cache";

// BELANJA MODAL
export async function getProposal(token: string) {
  const res = await fetch(`${url}/proposal/latest`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}

export async function getProposalData(token: string) {
  const res = await fetch(`${url}/proposal/latest`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse?.data;
  } else {
    return jsonResponse;
  }
}

export async function updateStatus(token: string, uuid: string) {
  const res = await fetch(`${url}/proposal/${uuid}/finalize?_method=PATCH`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse.data);
  if (res.ok) {
    return res;
  } else {
    return jsonResponse;
  }
}

// RAB
export async function getItems(token: string, uuid: string) {
  noStore();
  const res = await fetch(`${url}/proposal/${uuid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await res.json();
  if (res.status === 200) {
    return jsonResponse?.data?.items;
  } else {
    return jsonResponse;
  }
}

export async function postItems(token: string, uuid: string, data: any) {
  const res = await fetch(`${url}/proposal/${uuid}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      data: data,
    }),
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse);
  if (res.ok) {
    return res;
  } else {
    return jsonResponse;
  }
}

export async function getAccount(token: string) {
  const res = await fetch(`${url}/list-accounts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse?.data;
  } else {
    return jsonResponse;
  }
}

export async function getKurs(token: string, uuid: string) {
  const res = await fetch(`${url}/proposal/${uuid}/kurs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse?.data;
  } else {
    return jsonResponse;
  }
}

export async function updateKurs(
  token: string,
  uuidProposal: string,
  uuidKurs: string
) {
  const res = await fetch(
    `${url}/proposal/${uuidProposal}/kurs/${uuidKurs}?_method=PATCH`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const jsonResponse = await res.json();
  if (res.ok) {
    return res;
  } else {
    return jsonResponse;
  }
}

// BRAFAKS
export async function getFilesPath(token: string, uuid: string) {
  noStore();
  const res = await fetch(`${url}/proposal/${uuid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await res.json();
  if (res.status === 200) {
    return jsonResponse?.data?.files;
  } else {
    return jsonResponse;
  }
}

export async function postFiles(token: string, uuid: string, data: any) {
  const res = await fetch(`${url}/proposal/${uuid}/files/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
  console.log(res);
  return res;
}

export async function getFiles(token: string, uuid: string) {
  const res = await fetch(`${url}/proposal/${uuid}/latest`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/pdf",
    },
  });
  console.log(res);
  if (res.status === 200) {
    return res;
  } else {
    return res;
  }
}

export async function getFile(
  token: string,
  uuidProposal: string,
  uuidFile: string
) {
  const res = await fetch(`${url}/proposal/${uuidProposal}/files/${uuidFile}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res);
  return res;
}

export async function deleteFile(
  token: string,
  uuidProposal: string,
  uuidFile: string
) {
  const res = await fetch(
    `${url}/proposal/${uuidProposal}/files/${uuidFile}?_method=DELETE`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(res);
  return res;
}

export async function getExcelUsulan(token: string, uuid: string) {
  const res = await fetch(`${url}/proposal/${uuid}/export?category=proposal`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res);
  return res;
}

// PENYESUAIAN
export async function getPenyesuaian(token: string, uuid: string) {
  const res = await fetch(`${url}/proposal/${uuid}/approved`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse);
  return jsonResponse;
}

export async function getExcelPenyesuaian(token: string, uuid: string) {
  const res = await fetch(`${url}/proposal/${uuid}/export?category=approved`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res);
  return res;
}

// ANGGARAN BIAYA TAMBAHAN
export async function postAbt(token: string, data: any) {
  const res = await fetch(`${url}/abt/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: data,
  });
  const jsonResponse = await res.json();
  if (res.ok) {
    return res;
  } else {
    return jsonResponse;
  }
}

export async function getAbt(token: string) {
  noStore();
  const res = await fetch(`${url}/abt`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse);
  if (res.status === 200) {
    return jsonResponse.data;
  } else {
    return jsonResponse;
  }
}

export async function getDetailAbt(token: string, uuid: string) {
  const res = await fetch(`${url}/abt/${uuid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse.data);
  if (res.status === 200) {
    return jsonResponse.data;
  } else {
    return jsonResponse;
  }
}

export async function getFilesAbt(token: string, uuid: string) {
  const res = await fetch(`${url}/abt/${uuid}/files`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/pdf",
    },
  });
  console.log(res);
  return res;
}

export async function deleteAbt(token: string, uuid: string) {
  const res = await fetch(`${url}/abt/${uuid}/cancel?_method=DELETE`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(res.json());
  if (res.ok) {
    return res;
  } else {
    return res.json();
  }
}

export async function getAllProposal(token: string) {
  const res = await fetch(`${url}/proposal`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse?.data;
  } else {
    return jsonResponse;
  }
}