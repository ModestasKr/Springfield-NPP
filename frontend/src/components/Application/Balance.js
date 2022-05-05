import React, { useState } from "react";
import "./style/Balance.css";
import { getUserBalanceByMonth } from "../../api/libraries/apiLibraries"
function Balance() {
  const [balance, setBalance] = useState()

  function getCurrentBalance(){
    getUserBalanceByMonth().then((res) => {
      setBalance(res.data.data.balance)
    })
  }

  getCurrentBalance();

  return (
    <div className="Balance-container">
      <h3>Naujas įrašas</h3>
      <p>Balansas:</p>
      {/* Green or Red */}
      <p>{balance} EUR</p>
    </div>
  );
}

export default Balance;
