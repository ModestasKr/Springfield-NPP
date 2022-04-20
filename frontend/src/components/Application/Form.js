// Libraries
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
// Components
import Table from "./Table";
import Balance from "./Balance";
// Components API
import { getUserById } from "../../api/libraries/apiLibraries";
import { deleteUser } from "../../api/libraries/apiLibraries";
import { createUser } from "../../api/libraries/apiLibraries";
import { updateUser } from "../../api/libraries/apiLibraries";
// Style
import "./style/Form.css";
// Icon
import { BsPlusCircle } from "react-icons/bs";

function Form() {
  const [users, setUser] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [editingId, setEditingID] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValue: {
      accounting: "",
      category: "",
      amount: "",
      date: "",
    },
  });

  // DELETE method
  function deleteUserFn(id) {
    console.log(id);
    deleteUser(id);
  }

  // GET(byoneID) method
  useEffect(() => {
    getUserById().then((res) => {
      console.log(res.data.data.users);
      setUser(res.data.data.users);
    });
  }, []);

  // Not working
  // Create and Update
  function createUserFn(data) {
    if (editingId) {
      // PUT METHOD
      console.log(data);
      updateUser(data);
    } else {
      // POST METHOD
      console.log(data);
      createUser(data);
    }
  }
  // PUT method item
  function editUserFn(data) {
    setEditingID(data._id);
    // update date in the inputs
    setCurrentUser(data);
  }

  const usersList = users.map((user) => {
    return (
      <Table
        key={user._id}
        id={user._id}
        user={user}
        deleteUserFn={deleteUserFn}
        editUserFn={editUserFn}
      />
    );
  });
  return (
    <div className="Form-container">
      <Balance />
      <div>
        <table className="Table-body">
          <tbody className="Table-tbody">{usersList}</tbody>
        </table>
      </div>
      <div className="Form-body">
        <form className="Form-body-form" onSubmit={handleSubmit(createUserFn)}>
          <label>Accounting</label>
          <select
            defaultValue={currentUser.accounting}
            {...register("accounting", {
              required: "This is requires",
            })}
          >
            <option value="">Select</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <p className="error">{errors.accounting?.message}</p>

          <label>Category</label>
          <select
            defaultValue={currentUser.category}
            {...register("category", {
              required: "This is requires",
            })}
          >
            <option value="">Select</option>
            <option value="Food and Drinks">Food and Drinks</option>
            <option value="Shopping">Shopping</option>
            <option value="Housing">Housing</option>
            <option value="Transportation">Transportation</option>
            <option value="Vehicle">Vehicle</option>
            <option value="Life and Entertainment">
              Life and Entertainment
            </option>
            <option value="Communication,PC">Communication,PC</option>
            <option value="Financial expenses">Financial expenses</option>
            <option value="Invesments">Invesments</option>
            <option value="Income">Income</option>
            <option value="Others">Others</option>
          </select>
          <p className="error">{errors.category?.message}</p>

          <label>Amount</label>
          <input
            placeholder="Write a Amount"
            defaultValue={currentUser.amount}
            {...register("amount", {
              required: "This is requires",
              minLength: {
                value: 1,
                message: "Minimum lenght is 1",
              },
              maxLength: {
                value: 1000000,
                message: "Max lenght is 1000000",
              },
            })}
          />
          <p className="error">{errors.amount?.message}</p>

          <label>Date</label>
          <input
            defaultValue={currentUser.date}
            type="date"
            {...register("date", {
              required: "This is requires",
            })}
          />
          <p className="error">{errors.date?.message}</p>

          <button className="Form-btn" type="submit">
            <BsPlusCircle />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Form;
