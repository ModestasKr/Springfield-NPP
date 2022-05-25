// import React from 'react'

// function CategoryCard({category, id}) {
//   return (
//     <tr className="ReadOnlyRow-row">
//       <td>{category}</td>
//       <td>
//           <button>Keisti</button>
//           <button>Trinti</button>
//       </td>
//     </tr>
   
//   )
// }

// export default CategoryCard

import React, { useState } from "react";
import { BsTrash, BsPencil } from "react-icons/bs";
import swal from "sweetalert";
import UpdateCategory from "./UpdateCategory";
import { deleteCategory, getCategory } from "../../../../api/libraries/apiLibraries";
import { useGlobalCategoriesContext } from "../../../../util/categoryContext";

function CategoryCard(props) {
  const { refreshCategoriesData } = useGlobalCategoriesContext();
  const [isEditing, setIsEditing] = useState(false);
  const { category, id } = props;

  return (
    <tr>
      {isEditing === false && (
        <td className="custom-table-td-admin">{category}</td>
      )}
      {isEditing === true && (
        <td className="custom-table-td-admin">
          <UpdateCategory
            setIsEditing={setIsEditing}
            id={id}
            category={category}
          />
        </td>
      )}
      <td className="custom-table-td-admin">
        {" "}
          <button
            className="btn m-1 custom-button-edit"
            onClick={() => setIsEditing(!isEditing)}
          >
            Redaguoti
          </button>
        
          <button
            className="btn  m-1 custom-button-tr"
            onClick={() =>
              swal({
                title: "Ar tikrai norite ištrinti?",
                icon: "warning",
                buttons: ["Atšaukti", "Gerai"],
              }).then((isConfirm) => {
                if (isConfirm) {
                    deleteCategory(id).then(() => {
                        getCategory();
                    
                  });
                } 
              })
            }
          >
            Ištrinti
          </button>
      </td>
    </tr>
  );
}

export default CategoryCard;