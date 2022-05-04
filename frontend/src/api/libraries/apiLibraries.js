// Libraries
import axiosClient from "../apiUsers";
import swal from "sweetalert";

// GET method allUsers
export async function getAllUsersData() {
  const res = await axiosClient.get("/");
  return res;
}

// GET method visas balansas
export async function getBalance(id) {
  const res = await axiosClient.get(`/${id}/expenses/balance`);
  return res;
}

export async function getUserExpensesByMonth(id) {
  id = "62666e27cd523e53504dd164";
  const res = await axiosClient.get(`/${id}/expenses/current/month`);
  return res;
}

// UPDATE user data income
export async function findIncomeDataAndUpdate(data, id, subID) {
  const res = await axiosClient
    .patch(`/${id}/income/${subID}`, JSON.stringify(data))
    .then((result) => {
      console.log("Success:", result);
      swal({
        text: "Klaida ištaisyta",
        icon: "success",
        button: "Gerai",
        timer: 500,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      swal("Oops", "Klaida!", "error");
    });
  return res;
}

// UPDATE user data expenses
export async function findExpensesDataAndUpdate(data, id, subID) {
  const res = await axiosClient
    .patch(`/${id}/expenses/${subID}`, JSON.stringify(data))
    .then((result) => {
      console.log("Success:", result);
      swal({
        text: "Klaida ištaisyta",
        icon: "success",
        button: "Gerai",
        timer: 500,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      swal("Oops", "Klaida!", "error");
    });
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
      swal({
        text: "Ištrinta!",
        icon: "success",
        button: "Gerai",
        timer: 500,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      swal("Oops", "Klaida!", "error");
    });
}
// Delete incomes
export async function deleteUserIncome(id, subID) {
  const response = await axiosClient
    .patch(`/${id}/income/delete/${subID}`)
    .then((result) => {
      console.log("Success:", result);
      swal({
        text: "Ištrinta!",
        icon: "success",
        button: "Gerai",
        timer: 500,
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      swal("Oops", "Klaida!", "error");
    });
}

// Register
export async function createUser(data) {
  const res = await axiosClient
    .post("/register", JSON.stringify(data))
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
}

// Login
export async function loginUser(data){
  const res = await axiosClient
  .post("/login", JSON.stringify(data))
  .then((result) => {
    console.log("Success:", result);
    swal({
      text: "Pavyko prisijungti!",
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
}

//Logout

export async function logoutUser(data){
  const res = await axiosClient
  .post("/logout", JSON.stringify(data))
  .then((result) => {
    console.log("Success:", result);
    swal({
      text: "Sėkmingai atsijungta!",
      icon: "success",
      button: "Puiku",
    });
  })
}
