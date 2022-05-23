import tokenService from "./tokenService";

const BASE_URL = "/api/events";

export async function create(event) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    body: event,
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  });
  if (res.ok) return res.json();
  throw new Error("Bad Credentials! CHECK THE SERVER TERMINAL");
}

export async function getAll() {
  const res = await fetch(BASE_URL);
  if (res.ok) return res.json();
  throw new Error("bad credentials! CHECK THE SERVER TERMINAL");
}

export async function getEvent() {
  console.log("getEvent hit from eventAPI.js");
}
