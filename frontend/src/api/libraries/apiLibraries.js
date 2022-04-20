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

// Put user incomes and spend
// PUT  http://127.0.0.1:4000/api/v1/users/ 404 (Not Found)
// export async function createUser() {
//   const res = await axiosClient.post("/");
//   return res;
// }
