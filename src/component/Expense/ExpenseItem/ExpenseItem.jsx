// import PropTypes from 'prop-types';
import styles from "./ExpenseItem.module.scss";
import Delete from "./delete.svg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getExpense,
  deleteExpense,
} from "../../../redux/transactions/transactionsOperation.js";

const ExpenseItem = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.transactions.itemsExpense);

  useEffect(() => {
    dispatch(getExpense());
  }, [dispatch]);

  const onDelete = (id) => () => {
    dispatch(deleteExpense(id)).then(() => dispatch(getExpense()));
  };
  return (
    <>
      {expenses?.map(({ _id, category, date, amount, description }) => (
        <div key={_id} className={styles.item}>
          <div className={styles.itemTransaction}>
            <p className={styles.productCategoryItemMob}>{category}</p>
            <div className={styles.dateType}>
              <p className={styles.productDate}>{date}</p>
              <p className={styles.productCategoryItem}>{description}</p>
              <p className={styles.productCategory}>{category}</p>
            </div>
          </div>
          <p className={styles.productSum}>-{amount} грн.</p>
          <img src={Delete} alt="" width="18" onClick={onDelete(_id)} />
        </div>
      ))}
    </>
  );
};

ExpenseItem.propTypes = {};

export default ExpenseItem;
