import React, { useState, useEffect } from "react";
import "./style/Balance.css";
import { useGlobalUserContext, UserContext } from "../../context/UserContext";
//
function Balance({ id }) {
  const { balance } = useGlobalUserContext(UserContext);

  useEffect(() => {
    if (id !== undefined) ;
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
