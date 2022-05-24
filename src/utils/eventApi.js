import tokenService from "./tokenService";

const BASE_URL = "/api/events/";

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

export async function getEvent(eventTitle) {
  const res = await fetch(BASE_URL + eventTitle);
  if (res.ok) return res.json();
  throw new Error("bad credentials! check the server terminal");
}

export async function deleteEvent(eventId) {
  const res = await fetch(BASE_URL + eventId, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  });
  if (res.ok) return res.json();
  throw new Error("bad credentials! check the server terminal");
}

export async function editEvent(newEvent) {
  console.log(newEvent.previousTitle, "<- previous title");
  const res = await fetch(`${BASE_URL}/${newEvent.previousTitle}/edit`, {
    method: "PUT",
    body: newEvent,
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  });
  if (res.ok) return res.json();
  throw new Error("bad credentials, check the server terminal");
}
