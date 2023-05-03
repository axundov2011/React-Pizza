import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(id);

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          "https://63c6a465d307b769673d8f2a.mockapi.io/favorites/" + id
        );
        setPizza(data);
        console.log(pizza);
      } catch (error) {
        alert("Ошибка при  получении пиццы ");
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return "Загрузка...";
  }

  return (
    <div className="container">
      <img src={pizza?.imageUrl} alt="" />
      <h2>{pizza?.title}</h2>
      <h4>{pizza?.price}</h4>
    </div>
  );
};

export default FullPizza;
