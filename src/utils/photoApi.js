import tokenService from "./tokenService";

const BASE_URL = "/api/";

export async function create(eventTitle, photo) {
  console.log(photo, "<- this is eventTitle");
  const res = await fetch(`${BASE_URL}/events/${eventTitle}/photos`, {
    method: "POST",
    body: photo,
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  });
  if (res.ok) return res.json();
  throw new Error("Bad Credentials! CHECK THE SERVER TERMINAL");
}
