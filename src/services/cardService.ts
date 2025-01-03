import axios from "axios";
import { Card } from "../interfaces/Card";

const api: string = `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards`;

export function getAllCards() {
  return axios.get(api);
}
export function addCard(newCard: Card) {
  const token = localStorage.getItem("token");
  return axios.post(api, newCard, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  });
}

export function deleteCard(id: string) {
  const token = localStorage.getItem("token");

  return axios.delete(`${api}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  });
}
export function updateCard(id: string, updatedCard: Card) {
  const token = localStorage.getItem("token");

  return axios.put(`${api}/${id}`, updatedCard, {
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  });
}

export async function updateCardLikes(cardId: string) {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.patch(
    `${api}/${cardId}`,
    {},
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );

  return response.data;
}

export async function getMyCards() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const response = await axios.get(`${api}/my-cards`, {
    headers: {
      "x-auth-token": token,
    },
  });

  return response.data;
}

export async function getCardById(id: string) {
  const response = await axios.get(`${api}/${id}`);
  return response.data;
}
