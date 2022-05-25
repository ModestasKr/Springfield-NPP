import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addCategory, updateCategory, getCategory } from "../../../../api/libraries/apiLibraries";
import { useGlobalCategoriesContext } from "../../../../util/categoryContext";

function UpdateCategory(props) {
  const { expensesCategories, refreshCategoriesData } =
    useGlobalCategoriesContext();

  const { setIsEditing, id, category } = props;

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

    updateCategory(id, newObj).then(() => {
      refreshCategoriesData(id);
      getCategory();
    });
    setIsEditing(false);

    
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        className="rounded-0 input-custom-admin "
        type="text"
        name="category"
        id="category"
        defaultValue={category}
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

        <button className="btn custom-button-edit" type="submit">
        Pridėti
        </button>
        <button
          type="button"
          className="btn  custom-button-tr"
          onClick={() => setIsEditing(false)}
        > Atšaukti
        </button>
      {errors.category && (
        <div className="text-danger fw-light text-start ps-3">
          2-20 simbolių, tik raidės. Kategorija negali kartotis.
        </div>
      )}
    </form>
  );
}

export default UpdateCategory;