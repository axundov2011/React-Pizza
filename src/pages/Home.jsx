//hooklar
import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";

//Api paketi
import axios from "axios";

//Componentler
import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlok from "../components/PizzaBlok";
import { sortList } from "../components/Sort";
//skeleton
import Skeleton from "../components/PizzaBlok/Skleteton";
import { Pagination } from "../components/Pagination";


//Redux
// import {selectFilter} from "../redux/filter/selection"
import { useDispatch, useSelector } from "react-redux";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { Link, useNavigate } from "react-router-dom";
import qs from "qs";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector((state) => state.pizza);
  const { categoryId, sort, currentPage, searchValue } = useSelector(
    (state) => state.filter
  );
 
  const onChangeCategoryType = useCallback((id) => {
    dispatch(setCategoryId(id));
  });

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const sortBy = sort.sortProperty.replace("-", "");
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        currentPage,
        category,
        sortBy,
        order,
        search,
      })
    );
    window.scrollTo(0, 0);
  };

  // Eger parametrler deyisilibse ve birinci render olundusa
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs?.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // Eger birinci render oldusa, o zaman url parametri  yoxlayiriq  ve reduxda soxranit edirik

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  // Eger birinci render olundusa, o zaman pizzalari isteyirik
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((datas) => <Link key={datas.id} to={`pizza/${datas.id}`}><PizzaBlok  {...datas} /></Link>);

  const Skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  useEffect(() => {
    getPizzas();
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);
  return (
    <>
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          onChangeCategoryType={onChangeCategoryType}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content_error-info"> 
          <h2 >Pроизашло  ошибка 😕</h2>
          <p>
          К сожалению, не удалось  получить питсы.Попробуйты повторить  попытку позже
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? Skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
