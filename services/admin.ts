import { url } from './constans';

import { unstable_noStore as noStore } from "next/cache";
import { AbtTable, BelmodTable } from "../lib/definitions";

//DASHBOARD
export async function getDashboard(token: string) {
  const res = await fetch(`${url}/a/general-information/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse.data;
  } else {
    return res;
  }
}

// BELANJA MODAL
export async function createYear(
  token: string,
  year: string,
  deadline: string
) {
  const res = await fetch(`${url}/a/year`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      year: year,
      deadline: deadline,
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

export async function getProposal(token: string): Promise<BelmodTable[]> {
  noStore();
  const res = await fetch(`${url}/a/proposal`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse.data;
  } else {
    return jsonResponse;
  }
}

export async function getDetailProposal(token: string, uuid: string) {
  noStore();
  const res = await fetch(`${url}/a/proposal/${uuid}`, {
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

export async function updateStatus(token: string, uuid: string, data: any) {
  const res = await fetch(`${url}/a/proposal/${uuid}?_method=PATCH`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
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

export async function updateDeadlineProposal(token: string, uuid: string, deadline: string) {
  const res = await fetch(`${url}/a/proposal/${uuid}/deadline?_method=PATCH`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      deadline: deadline,
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

// RAB
export async function getItems(token: string, uuid: string) {
  noStore();
  const res = await fetch(`${url}/a/proposal/${uuid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse);
  if (res.status === 200) {
    return jsonResponse?.data?.items;
  } else {
    return jsonResponse;
  }
}

// BRAFAKS
export async function getFile(
  token: string,
  uuidProposal: string,
  uuidFile: string
) {
  const res = await fetch(
    `${url}/a/proposal/${uuidProposal}/files/${uuidFile}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        // "Content-Type": "application/pdf",
      },
    }
  );
  console.log(res);
  return res;
}

export async function getYear(token: string) {
  const res = await fetch(`${url}/a/year`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse);
  if (res.ok) {
    return jsonResponse.data;
  } else {
    return jsonResponse;
  }
}

export async function getDetailYear(token: string, uuid: string) {
  noStore();
  const res = await fetch(`${url}/a/year/${uuid}`, {
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

export async function updateDeadline(token: string, uuid: string, deadline: string) {
  const res = await fetch(`${url}/a/year/${uuid}/deadline?_method=PATCH`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      deadline: deadline,
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

export async function updateStatusYear(token: string, uuid: string, active: boolean) {
  const res = await fetch(`${url}/a/year/${uuid}?_method=PATCH&status=${active}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const jsonResponse = await res.json();
  console.log(active);
  console.log(jsonResponse);
  if (res.ok) {
    return res;
  } else {
    return jsonResponse;
  }
}

// PENYESUAIAN
export async function getPenyesuaian(token: string, uuid: string) {
  const res = await fetch(`${url}/a/proposal/${uuid}/approved`, {
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

export async function postSalinRab(token: string, uuid: string) {
  const res = await fetch(`${url}/a/proposal/${uuid}/rab-to-approved`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse);
  if (res.ok) {
    return res;
  } else {
    return jsonResponse;
  }
}

export async function postItemsPenyesuaian(
  token: string,
  uuid: string,
  data: any
) {
  const res = await fetch(`${url}/a/proposal/${uuid}/approved`, {
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

export async function postFinalisasi(token: string, uuid: string) {
  const res = await fetch(`${url}/a/proposal/${uuid}/finalize?_method=PATCH`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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
  console.log(jsonResponse)
  if (res.ok) {
    return jsonResponse?.data;
  } else {
    return jsonResponse;
  }
}

// ABT
export async function getAbt(token: string): Promise<AbtTable[]> {
  const res = await fetch(`${url}/a/abt/`, {
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
  noStore();
  const res = await fetch(`${url}/a/abt/${uuid}`, {
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
  const res = await fetch(`${url}/a/abt/${uuid}/files`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/pdf",
    },
  });
  return res;
}

export async function updateStatusAbt(token: string, uuid: string, data: any) {
  const res = await fetch(`${url}/a/abt/${uuid}?_method=PATCH`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
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

// Kurs
export async function getKurs(token: string, uuid: string) {
  noStore();
  const res = await fetch(`${url}/a/kurs/${uuid}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await res.json();
  console.log(jsonResponse);
  if (res.status === 200) {
    return jsonResponse;
  } else {
    return jsonResponse;
  }
}

export async function postKurs(
  token: string,
  uuid: string,
  currencyUuid: string,
  data: any
) {
  const res = await fetch(`${url}/a/kurs/${uuid}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      kurs: [
        {
          currencyUuid: currencyUuid,
          value: data.value,
        },
      ],
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

export async function updateKurs(token: string, uuid: string, data: any) {
  const res = await fetch(`${url}/a/kurs/${uuid}/?_method=PATCH`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      value: data.value,
    }),
  });
  const jsonResponse = await res.json();
  console.log(res);
  if (res.status === 200) {
    return res;
  } else {
    return jsonResponse;
  }
}

export async function deleteKurs(token: string, uuid: string) {
  const res = await fetch(`${url}/a/kurs/${uuid}/?_method=DELETE`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const jsonResponse = await res.json();
  console.log(res);
  if (res.status === 200) {
    return res;
  } else {
    return jsonResponse;
  }
}

export async function getCurrency(token: string) {
  const res = await fetch(`${url}/a/currency`, {
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

export async function getRecap(token: string) {
  const res = await fetch(`${url}/a/recap`, {
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

export async function getExcelRekap(token: string, data: any) {
  const res = await fetch(`${url}/a/recap/excel/${data.year}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res;
}
