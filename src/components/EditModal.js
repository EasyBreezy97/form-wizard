import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { EDIT_ITEM } from "../actions/userActions";
import Tooltip from "../components/Tooltip";
import { validateAge, validateQuantity } from "../helpers/validations";

const EditModal = ({ open, onClose, currentUserInfo }) => {
  const [error, setError] = useState({ show: false, msg: "", label: "" });
  const [name, setName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [age, setAge] = useState(null);
  const [country, setCountry] = useState(null);
  const [price, setPrice] = useState(null);
  const [thing, setThing] = useState(null);
  const [quantity, setQuantity] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUserInfo) {
      setName(currentUserInfo.name);
      setLastName(currentUserInfo.lastName);
      setAge(currentUserInfo.age);
      setCountry(currentUserInfo.country);
      setPrice(currentUserInfo.price);
      setThing(currentUserInfo.thing);
      setQuantity(currentUserInfo.quantity);
    }
  }, [currentUserInfo]);

  const onSubmit = (e) => {
    e.preventDefault();

    let updatedInfo = Object.assign(currentUserInfo, {
      name,
      lastName,
      age,
      country,
      price,
      thing,
      quantity,
    });

    const isAgeValid = validateAge(age);
    const isQtyValid = validateQuantity(quantity);

    if (!isAgeValid) {
      setError({
        show: true,
        msg: "ასაკი უნდა იყოს 18 წელზე მეტი",
        label: "age",
      });
      return;
    } else {
      setError({ show: false });
    }

    if (!isQtyValid) {
      setError({
        show: true,
        msg: "რაოდენობა არ შეიძლება 0 ან ნაკლები იყოს",
        label: "qty",
      });
      return;
    } else {
      setError({ show: false });
    }

    dispatch({ type: EDIT_ITEM, payload: updatedInfo });
  };



  return (
    <div>
      <Modal open={open} onClose={onClose} closeOnEsc={true}>
        <h2>რედაქტირება</h2>
        {currentUserInfo && (
          <form onSubmit={onSubmit} className="user">
            <label htmlFor="name">სახელი</label>
            <input
              onChange={(e) => {
                setName(e.target.value);
                console.log(name);
              }}
              defaultValue={currentUserInfo.name}
              required
              type="text"
              name="name"
            />
            <label htmlFor="lastName">გვარი</label>
            <input
              onChange={(e) => setLastName(e.target.value)}
              required
              defaultValue={currentUserInfo.lastName}
              type="text"
              name="lastName"
            />
            <label htmlFor="age">ასაკი</label>
            {error.label === "age" && (
              <Tooltip show={error.show} message={error.msg} />
            )}

            <input
              onChange={(e) => setAge(e.target.value)}
              required
              defaultValue={currentUserInfo.age}
              type="number"
              name="age"
            />
            <label htmlFor="country">ქვეყანა</label>
            <select
              onChange={(e) => setCountry(e.target.value)}
              defaultValue={currentUserInfo.country}
              name="country"
            >
              <option>საქართველო</option>
              <option>ამერიკა</option>
              <option>ინგლისი</option>
              <option>გერმანია</option>
              <option>სხვა</option>
            </select>
            <label htmlFor="thing">ნივთის დასახელება</label>
            <input
              onChange={(e) => setThing(e.target.value)}
              required
              defaultValue={currentUserInfo.thing}
              type="text"
              name="thing"
            />
            <label htmlFor="price">ფასი</label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              required
              defaultValue={currentUserInfo.price}
              type="number"
              name="price"
            />
            <label htmlFor="quantity">რაოდენობა</label>
            {error.label === "qty" && (
              <Tooltip show={error.show} message={error.msg} />
            )}

            <input
              onChange={(e) => setQuantity(e.target.value)}
              required
              defaultValue={currentUserInfo.quantity}
              type="number"
              name="quantity"
            />
            <button  type="submit" className="btn btn-yellow">
              რედაქტირება
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default EditModal;
