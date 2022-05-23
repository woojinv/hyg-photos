import tokenService from "./tokenService";

const BASE_URL = "/api/";

export async function create(photo) {
  console.log(photo, "<- this is photo");
  const res = await fetch(`${BASE_URL}/events/${photo.eventTitle}/photos`, {
    method: "POST",
    body: photo,
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  });
  if (res.ok) return res.json();
  throw new Error("Bad Credentials! CHECK THE SERVER TERMINAL");
}

export async function getAll(eventTitle) {
  console.log(eventTitle, "<- this is eventTitle");

  const res = await fetch(`${BASE_URL}/events/${eventTitle}/photos`);
  if (res.ok) return res.json();
  throw new Error("Bad credentials! check the server terminal");
}
