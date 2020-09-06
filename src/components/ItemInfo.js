import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { INSERT_THING } from "../actions/userActions";
import Tooltip from "./Tooltip";
import { validateQuantity } from "../helpers/validations";

const ItemInfo = ({ id }) => {
  const [error, setError] = useState({ show: false, msg: "" });
  const [thing, setThing] = useState("");
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);

  const dispatch = useDispatch();

  const insertThing = (e) => {
    e.preventDefault();

    const isQtyValid = validateQuantity(quantity);

    if (!isQtyValid) {
      setError({ show: true, msg: "რაოდენობა არ შეიძლება 0 ან ნაკლები იყოს"});
      return;
    } else {
      setError({ show: false });
    }
    dispatch({ type: INSERT_THING, payload: { id, thing, price, quantity } });
  };

  return (
    <form className="user" onSubmit={insertThing}>
      <h1>ნივთის ინფორმაცია</h1>
      <label htmlFor="thing">ნივთის დასახელება</label>
      <input
        required
        onChange={(e) => setThing(e.target.value)}
        type="text"
        name="thing"
      />
      <label htmlFor="price">ფასი</label>
      <input
        required
        onChange={(e) => setPrice(e.target.value)}
        type="number"
        name="price"
      />
      <label htmlFor="quantity">რაოდენობა</label>
      <Tooltip show={error.show} message={error.msg} />

      <input
        required
        onChange={(e) => setQuantity(e.target.value)}
        type="number"
        name="quantity"
      />
      <button type="submit" className="btn btn-green">
        დამატება
      </button>
    </form>
  );
};

export default ItemInfo;
