import React from "react";


const Categories = ({categoryId, onChangeCategoryType, }) => {

const CategoriesData = ["Все", "Мясные", "Вегетарианская", "Гриль", "Острые"];
  return (
    <div>
      <div className="categories">
        <ul>
          {CategoriesData &&
            CategoriesData.map((categoryName, i) => {
              return (
                <li
                  onClick={() => onChangeCategoryType(i)}
                  className={categoryId === i ? "active" : ""}
                  key={i}
                >
                  {categoryName}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Categories;
