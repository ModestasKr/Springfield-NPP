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


// Delete expenses
export async function deleteUserExpenses(id, subID) {
  const response = await axiosClient
    .patch(`/${id}/expenses/delete/${subID}`)
    .then((result) => {
      console.log("Success:", result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
// Delete incomes
export async function deleteUserIncome(id, subID) {
  const response = await axiosClient
    .patch(`/${id}/income/delete/${subID}`)
    .then((result) => {
      console.log("Success:", result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
