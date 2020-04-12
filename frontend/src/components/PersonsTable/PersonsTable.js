import React from "react";
import Persons from "../Persons/Persons";
import "./PersonTable.css";

const personsTable = (props) => {
  if (props.loading || props.loadingSort) return <p>Loading...</p>;
  if (props.error) return <p>Error :(</p>;
  if (props.data && props.data.persons.length === 0) return <p> </p>;

  return (
    <table className="PersonTable">
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Amigo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>{<Persons data={props.data} delete={props.delete} />}</tbody>
    </table>
  );
};

export default personsTable;
