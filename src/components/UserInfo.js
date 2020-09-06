import React, { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";
import Tooltip from "./Tooltip";

import { useDispatch } from "react-redux";
import { INSERT_INFO } from "../actions/userActions";

import {validateAge} from '../helpers/validations';

const UserInfo = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(null);
  const [country, setCountry] = useState("საქართველო");

  const history = useHistory();
  const [error, setError] = useState({ show: false, msg: "" });

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    const isAgeValid = validateAge(age);

    if (!isAgeValid) {
      setError({ show: true, msg: "ასაკი უნდა იყოს 18 წელზე მეტი" });
      return;
    } else {
      setError({ show: false });
    }
    let id = uuidv4();
    dispatch({ type: INSERT_INFO, payload: { id, name, lastName, age, country } });
    history.push("/about", { id });
  };


  return (
    <>
      <form onSubmit={onSubmit} className="user">
        <h1>პერსონალური ინფორმაცია</h1>
        <label htmlFor="name">სახელი</label>
        <input
          required
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
        />
        <label htmlFor="lastName">გვარი</label>
        <input
          required
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          name="lastName"
        />
        <label htmlFor="age">ასაკი</label>
        <Tooltip show={error.show} message={error.msg} />
        <input
          required
          onChange={(e) => setAge(e.target.value)}
          type="number"
          name="age"
        />
        <label htmlFor="country">ქვეყანა</label>
        <select onChange={(e) => setCountry(e.target.value)} name="country">
          <option>საქართველო</option>
          <option>ამერიკა</option>
          <option>ინგლისი</option>
          <option>გერმანია</option>
          <option>სხვა</option>
        </select>
        <button type="submit" className="btn btn-green">
          შემდეგი
        </button>
      </form>
    </>
  );
};

export default UserInfo;
