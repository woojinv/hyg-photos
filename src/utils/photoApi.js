import tokenService from "./tokenService";

const BASE_URL = "/api/";

export async function create(photo) {
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
  const res = await fetch(`${BASE_URL}/events/${eventTitle}/photos`);
  if (res.ok) return res.json();
  throw new Error("Bad credentials! check the server terminal");
}

export async function deletePhoto(photoId) {
  console.log(photoId, "<- this is photoId from deletePhoto");
  const res = await fetch(`${BASE_URL}/photos/${photoId}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  });
  if (res.ok) return res.json();
  throw new Error("bad credentials. check the server terminal");
}
