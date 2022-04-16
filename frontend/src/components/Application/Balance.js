import React from "react";
import "./style/Balance.css";

function Balance() {
  return (
    <div className="Balance-container">
      <h3>New Record</h3>
      <p>Balance</p>
      {/* Green or Red */}
      <p> $/£ 600</p>
    </div>
  );
}

export default Balance;
