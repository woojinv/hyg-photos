import tokenService from "./tokenService";

const BASE_URL = "/api/photos/";

export async function create(photo) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    body: photo,
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  });
  if (res.ok) return res.json();
  throw new Error("Bad Credentials! CHECK THE SERVER TERMINAL");
}
