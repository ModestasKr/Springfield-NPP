// Libraries
import axiosClient from "../apiUsers";
import swal from "sweetalert";

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

// ADD user Income
export async function createUserIncome(data, id) {
  id = "62666e27cd523e53504dd164";
  console.log(id);
  console.log(data);
  const res = await axiosClient
    .patch(`/${id}/income/`, JSON.stringify(data))
    .then((result) => {
      console.log("Success:", result);
      swal({
        text: "Pavyko pridėti duomenys į istorija",
        icon: "success",
        button: "Puiku",
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      swal(
        "Nepavyko",
        "Duomenys blogai suvesti, galimai rašybos klaida!",
        "error"
      );
    });
  return res;
}

// ADD user Expenes
export async function createUserExpenses(data, id) {
  id = "62666e27cd523e53504dd164";
  console.log(id);
  console.log(data);
  const res = await axiosClient
    .patch(`/${id}/expenses/`, JSON.stringify(data))
    .then((result) => {
      console.log("Success:", result);
      swal({
        text: "Pavyko pridėti duomenys į istorija",
        icon: "success",
        button: "Puiku",
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      swal(
        "Nepavyko",
        "Duomenys blogai suvesti, galimai rašybos klaida!",
        "error"
      );
    });
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
