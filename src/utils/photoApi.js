import tokenService from "./tokenService";

const BASE_URL = "/api/";

export async function create(photo) {
  const res = await fetch(`${BASE_URL}/events/${photo.event}/photos`, {
    method: "POST",
    body: photo,
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  });
  if (res.ok) return res.json();
  throw new Error("Error creating a photo. Please try again!");
}

export async function getAll(eventId) {
  const res = await fetch(`${BASE_URL}/events/${eventId}/photos`);
  if (res.ok) return res.json();
  throw new Error("Error getting all photos. Please refresh and try again!");
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
  throw new Error("Error deleting a photo. Please refresh and try again!");
}
