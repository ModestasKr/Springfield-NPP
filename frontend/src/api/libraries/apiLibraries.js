import axiosClient from "../apiUsers";

// Take all
export async function getAllUsers() {
  const res = await axiosClient.get("/");
  return res;
}

// Take one user
export async function getUserById(id) {
  const res = await axiosClient.get(`/${id}`);
  return res;
}

// Delete user
export async function deleteUser(id) {
  const res = await axiosClient.delete(`/${id}`);
  return res;
}

// create user
export async function createUser(data) {
  const res = await axiosClient.post("/", JSON.stringify(data));
  return res;
}

// update user
export async function updateUser(data, editingId) {
  const res = await axiosClient.put(`/${editingId}`, JSON.stringify(data));
  return res;
}
