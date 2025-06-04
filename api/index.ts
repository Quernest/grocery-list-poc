import { GroceryItem } from "@/types"
import { API_URL } from "@env"
import axios from "axios"

const BASE_URL = `${API_URL}/groceries`;

export const getGroceries = async (): Promise<GroceryItem[]> => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const getGroceryById = async (id?: string) => {
  if (!id) throw new Error("ID is missed");
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};

export const addGrocery = async (
  item: Omit<GroceryItem, "id">
): Promise<GroceryItem> => {
  const res = await axios.post(BASE_URL, item);
  return res.data;
};

export const updateGrocery = async ({
  id,
  ...item
}: Partial<GroceryItem>): Promise<GroceryItem> => {
  const res = await axios.put(`${BASE_URL}/${id}`, item);
  return res.data;
};

export const deleteGrocery = async (id: string): Promise<void> => {
  await axios.delete(`${BASE_URL}/${id}`);
};
