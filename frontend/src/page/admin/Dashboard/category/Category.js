import React, { useState, useEffect } from "react";
import { getCategory } from "../../../../api/libraries/apiLibraries";
import CategoryCard from "./CategoryCard";
import { useForm } from "react-hook-form";
import swal from "sweetalert";

function Category() {
    const [category, setCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
  
    useEffect(() => {
      getCategory().then ((res) => {
        setCategory(res.data.data.category);
        console.log(res.data.data.category)
      })
    }, []);

    const categoryRow = category.map((item) => {
          return (
            <CategoryCard
              key={item._id}
              category={item.category}
              id={item._id}
            />
          );
    });

  return (
      <>
      <div className="History-container">
        <table className="History-body">
          <thead className="History-thead">
              <tr>
                  <th><input></input></th>

                  <th><button>Pridėti naują kategoriją</button></th>
              </tr>
            <tr>
              <th>kategorija</th>
              <th>Veiksmas</th>
            </tr>
          </thead>
          <tbody>{categoryRow}</tbody>
        </table>
      </div>
      </>
  )
}

export default Category