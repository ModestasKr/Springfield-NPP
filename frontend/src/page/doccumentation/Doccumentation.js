// Libraries
import React from "react";
import { Link } from "react-router-dom";
// Style
import "./style/Doccumentation.css";
// Images
import budget from "../../assets/budget.png";
import table from "../../assets/table.png";

function Doccumentation() {
  return (
    <div className="Home-container">
      <h1>Kodėl verta?</h1>
      <hr />
      <div className="Home-body-1">
        <div className="Home-body-information">
          <p>
            Tai nuostabi aplikacija, kurioje galima sekti išlaidas ir pajamas ir
            matyti kur galima patobulėti ir sutaupyti.
          </p>
          <Link to={"/application"}>
            <button>Daugiau &raquo;</button>
          </Link>
        </div>

        <img src={budget} alt="Budget img" />
      </div>
      <hr />
      <div className="Home-body-2">
        <img src={table} alt="Table img" />
        <div className="Home-body-information">
          <p>
            Kuom dar gerai tai galima stebėti ir analizuoti duomenys lentelėse
            bei diagramose.
          </p>
          <Link to={"/history"}>
            <button>Daugiau &raquo;</button>
          </Link>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Doccumentation;
