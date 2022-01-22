import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

import Button from "../Button/Button";
import Calendar from "../Calendar/Calendar";

import {
  getExpense,
  getIncome,
  getCategories,
  addIncome,
  addExpense,
  getCategoriesExpense,
} from "../../redux/transactions/transactionsOperation";

import sprite from "../../images/sprite.svg";
import s from "./TransactionForm.module.scss";

const TransactionForm = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.transactions.categories);
  const categoriesExpense = useSelector(
    (state) => state.transactions.categoriesExpense
  );
  const date = useSelector((state) => state.transactions.date);

  const location = useLocation();

  const isExpense = location.pathname === "/homepage/expense";

  useEffect(() => {
    isExpense ? dispatch(getCategoriesExpense()) : dispatch(getCategories());
  }, [dispatch, isExpense]);

  useEffect(() => {
    isExpense ? dispatch(getExpense()) : dispatch(getIncome());
  }, [dispatch, isExpense]);

  const handleBtnClear = (e) => {
    setAmount("");
    setDescription("");
    setCategory("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.currentTarget;
    // eslint-disable-next-line default-case
    switch (name) {
      case "product":
        return setDescription(value);
      case "price":
        return setAmount(value);
    }
  };

  const handleChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description === "" || amount === "" || category === "Категория товара")
      return;

    const newOperation = {
      category,
      description,
      amount: Number(amount),
      date,
    };

    isExpense
      ? dispatch(addExpense(newOperation)).then(() => dispatch(getExpense()))
      : dispatch(addIncome(newOperation)).then(() => dispatch(getIncome()));
    handleBtnClear();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <Calendar />
      <div className={s.input_box}>
        <input
          className={`${s.input} ${s.left_input}`}
          type="text"
          name="product"
          placeholder="Описание товара"
          maxLength="20"
          minLength="3"
          size="20"
          required
          onChange={handleInputChange}
          value={description}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        />

        <select
          className={`${s.select}`}
          onChange={handleChange}
          value={category}
          name="category"
          required
        >
          <option value="hide">Категория дохода</option>
          {(isExpense ? categoriesExpense : categories).map((categorie) => (
            <option key={categorie} value={categorie}>
              {categorie}
            </option>
          ))}
        </select>

        <label className={s.label}>
          <input
            className={s.number}
            type="number"
            required
            min="1"
            name="price"
            onChange={handleInputChange}
            value={amount}
            onWheelCapture={(e) => {
              e.target.blur();
            }}
            placeholder="0.00"
          />
          <svg width="20px" height="20px" className={s.calc}>
            <use href={`${sprite}#calcul`}></use>
          </svg>
        </label>
      </div>

      <div className={s.wrap}>
        <Button text="ВВОД" type="submit" className={s.btn} />

        <Button
          text=" ОЧИCТИТЬ"
          className={s.btnClean}
          onClick={handleBtnClear}
        />
      </div>
    </form>
  );
};

export default TransactionForm;
