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
  console.log(id);
  console.log(data);
  const res = await axiosClient
    .patch(`/${id}`, JSON.stringify(data))
    .then((result) => {
      console.log("Success:", result);
      swal({
        text: "Added!",
        icon: "success",
        button: "Great",
      });
    })
    .catch((error) => {
      console.error("Error:", error);
      swal("Oops", "Something went wrong!", "error");
    });
  return res;
}
