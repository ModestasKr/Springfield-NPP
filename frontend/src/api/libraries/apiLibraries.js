import axiosClient from "../apiUsers";

// Take all
export async function getAllUsers() {
  const res = await axiosClient.get("/");
  return res;
}

// Take one by ID
export async function getUserById() {
  const res = await axiosClient.get("/");
  return res;
}

// Delete  user expense

export async function deleteUser(id) {
  const res = await axiosClient.delete("/" + id);
  return res;
}

// create user incomes and spend
export async function createUser() {
  const res = await axiosClient.post("/");
  return res;
}

// update user incomes and spend
export async function updateUser(id) {
  const res = await axiosClient.put("/" + id);
  return res;
}
