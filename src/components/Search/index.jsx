import React, { useState, useContext, useRef, useCallback } from "react";
import { Input } from "reactstrap";
import { Search, X } from "react-feather";
import styles from "./Search.module.scss";
import { setsearchValue } from "../../redux/slices/filterSlice";
import debounce from "lodash.debounce";
import { useDispatch } from "react-redux";

const SearchInput = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const inputRef = useRef();

  const onClickClear = () => {
    dispatch(setsearchValue(''))
    setValue("");
    inputRef.current.focus();
  };

  const updateSearchValue = useCallback(
    debounce((str) => {
      console.log('Hello'); 
      dispatch(setsearchValue(str))
    }, 1000),
    []
  );

  const onchangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  return (
    <div className={styles.root}>
      <Search className={styles.search} />
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => onchangeInput(e)}
        className={styles.input}
        placeholder="Поиск пиццы "
      />
      {value && <X onClick={() => onClickClear()} className={styles.close} />}
    </div>
  );
};

export default SearchInput;
