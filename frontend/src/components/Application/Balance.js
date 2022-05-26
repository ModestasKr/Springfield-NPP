import React, { useState, useEffect } from "react";
import "./style/Balance.css";
import { useGlobalUserContext, UserContext } from "../../util/UserContext";
//
function Balance({ id }) {
  const { balance } = useGlobalUserContext(UserContext);
  const balansas = balance.toFixed(2)
  useEffect(() => {
    // Make true if it's undefined
    // console.log(id);
    if (id !== undefined);
  }, [id]);

  return (
    <div className="Balance-container">
      <h3>Naujas įrašas</h3>
      <p>Balansas: {id && balansas} EUR</p>
    </div>
  );
}

export default Balance;
