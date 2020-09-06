import React from "react";
import { Link } from "react-router-dom";
import ItemInfo from "../components/ItemInfo";
import Grid from "../components/Grid";
import EditModal from "../components/EditModal";

const About = ({ location }) => {
  let { state } = location;

  return (
    <>
      <Link className="personal-link" to="/">&larr; პერსონალური ინფორმაცია (დამატება)</Link>
      <ItemInfo id={state.id} />
      <Grid />
      <EditModal />
    </>
  );
};

export default About;
