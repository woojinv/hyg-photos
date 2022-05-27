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
  throw new Error("Error creating an event. Please try again!");
}

export async function getAll() {
  const res = await fetch(BASE_URL);
  if (res.ok) return res.json();
  throw new Error("Error displaying events. Please refresh and try again!");
}

export async function getEvent(eventTitle) {
  const res = await fetch(BASE_URL + eventTitle);
  if (res.ok) return res.json();
  throw new Error("Error getting an event. Please refresh and try again!");
}

export async function deleteEvent(eventId) {
  const res = await fetch(BASE_URL + eventId, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    },
  });
  if (res.ok) return res.json();
  throw new Error("Error deleting an event. Please refresh and try again!");
}

export async function editEvent(newEvent) {
  const res = await fetch(`${BASE_URL}/${newEvent.previousTitle}/edit`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
      Authorization: "Bearer " + tokenService.getToken(),
    },
    body: JSON.stringify(newEvent),
  });
  if (res.ok) return res.json();
  throw new Error("Error editing an event. Please refresh and try again!");
}
