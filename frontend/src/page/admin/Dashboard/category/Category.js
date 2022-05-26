import React, { useState } from "react";
import { useGlobalCategoriesContext } from "../../../../util/categoryContext";
import { addCategory } from "../../../../api/libraries/apiLibraries";
import { useForm } from "react-hook-form";
import CategoryCard from "./CategoryCard";
import "../style/Category.css"

function Category() {
  const { expensesCategories } = useGlobalCategoriesContext();
  const { refreshCategoriesData } = useGlobalCategoriesContext();

  const [display, setDisplay] = useState("expenses");

  const categoriesData = expensesCategories.map((item) => {
     
    return (
      <CategoryCard key={item._id} id={item._id} category={item.category} />

    );
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  let UppercaseFirst = (str) => {
    let newStr = str.charAt(0).toUpperCase() + str.slice(1);
    return newStr;
  };

  function onSubmit(data) {
    const newObj = { category: UppercaseFirst(data.category) };
    addCategory(newObj).then(() => {
      refreshCategoriesData(expensesCategories._id);
    });
    reset();
  }

  return (
    <>
      <div className="search-box">
         <input
                      className="rounded-0 input-custom-admin input-custom-add "
                      type="text"
                      name="category"
                      id="category"
                      {...register("category", {
                        required: true,
                        maxLength: 20,
                        minLength: 2,

                        pattern:
                          /^[a-ząčęėįšųūž|A-ZĄČĘĖĮŠŲŪŽ]+(?: [a-ząčęėįšųūž|A-ZĄČĘĖĮŠŲŪŽ]+)*$/,
                        validate: {
                          find: (value) => {
                            let result = expensesCategories.map((a) =>
                              a.category.toUpperCase()
                            );
                            return !result.includes(value.toUpperCase());
                          },
                        },
                      })}
                    />
                     {errors.category && (
                    <div className="error">
                      2-20 simbolių, tik raidės. Kategorija negali kartotis.
                    </div>
                  )}
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <button className=" custom-button-submit" id="nauja-kategorija" type="submit">
                      Pridėti naują kategoriją
                    </button>
                  </form>
                  
      </div>
    <div className="Category-container">
          <table className="Category-body">
            <thead className="Category-thead">
             
              <tr className="text-center">
                <th scope="col">Kategorijos</th>
                <th scope="col">Veiksmai</th>
              </tr>
            </thead>
            <tbody className="align-middle">
              <>{categoriesData}</>
            </tbody>
          </table>
        </div>
    
        </>
  );
}

export default Category;