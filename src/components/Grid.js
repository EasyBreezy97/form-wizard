import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_ITEM } from "../actions/userActions";
import EditModal from "./EditModal";
const Grid = () => {
  const [openModal, setOpenModal] = useState(false);
  const [currentUserInfo, setCurrentUserInfo] = useState(null);

  const userInfos = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();

  console.log(userInfos);

  const deleteItem = (id) => {
    console.log(`clicked ${id}`);
    dispatch({ type: DELETE_ITEM, payload: id });
  };

  const editItem = (id) => {
    setCurrentUserInfo(userInfos.filter((info) => info.id === id)[0])
    setOpenModal(true);
    console.log(id);

  };

  return (
    <div>
      <table className="grid">
        <thead>
          <tr>
            <th>სახელი</th>
            <th>გვარი</th>
            <th>ასაკი</th>
            <th>ქვეყანა</th>
            <th>ნივთი</th>
            <th>ფასი ₾</th>
            <th>რაოდენობა</th>
            <th>წაშლა</th>
            <th>რედაქტირება</th>
          </tr>
        </thead>
        <tbody>
          {userInfos &&
            userInfos.map((userInfo) => {
              return (
                <tr key={userInfo.id}>
                  <td>{userInfo.name}</td>
                  <td>{userInfo.lastName}</td>
                  <td>{userInfo.age}</td>
                  <td>{userInfo.country}</td>
                  <td>{userInfo.thing}</td>
                  <td>{userInfo.price}</td>
                  <td>{userInfo.quantity}</td>
                  <td className="delete-item">
                    <svg onClick={() => deleteItem(userInfo.id)}>
                      <use xlinkHref="/sprite.svg#icon-bin2"></use>
                    </svg>
                  </td>
                  <td className="edit-item">
                    <svg onClick={() => editItem(userInfo.id)}>
                      <use xlinkHref="/sprite.svg#icon-pencil"></use>
                    </svg>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <EditModal open={openModal} onClose={() => setOpenModal(false)} currentUserInfo={currentUserInfo}/>
    </div>
  );
};

export default Grid;
