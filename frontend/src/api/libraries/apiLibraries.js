import axiosClient from "../apiUsers";

// GET method allUsers
export async function getAllUsersData() {
  const res = await axiosClient.get("/");
  return res;
}

// UPDATE user data income
export async function findIncomeDataAndUpdate(data, id, subID) {
  const res = await axiosClient.patch(
    `/${id}/income/${subID}`,
    JSON.stringify(data)
  );
  return res;
}

// UPDATE user data expenses
export async function findExpensesDataAndUpdate(data, id, subID) {
  const res = await axiosClient.patch(
    `/${id}/expenses/${subID}`,
    JSON.stringify(data)
  );
  return res;
}

// DELETE user income data
export async function deleteUserIncome(id, subID) {
  const res = await axiosClient.delete(`/${id}/income/${subID}`);
  return res;
}

// DELETE user expenses data
export async function deleteUserExpenses(id, subID) {
  const res = await axiosClient.delete(`/${id}/expenses/${subID}`);
  return res;
}
