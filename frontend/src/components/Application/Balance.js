import React, { useState, useEffect } from "react";
import "./style/Balance.css";
import { getUserBalanceByMonth } from "../../api/libraries/apiLibraries";
function Balance({ id }) {
  console.log(id);
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState();

  function getCurrentBalance() {
    getUserBalanceByMonth(id).then((res) => {
      console.log(res);
      setBalance(res.data.data.balance);
      setIsLoading(true);
    });
  }

  useEffect(() => {
    if (id !== undefined) getCurrentBalance();
  }, [id]);

  return (
    <div className="Balance-container">
      <h3>Naujas įrašas</h3>
      <p>Balansas:</p>
      <p>{id && balance} EUR</p>
    </div>
  );
}

export default Balance;
