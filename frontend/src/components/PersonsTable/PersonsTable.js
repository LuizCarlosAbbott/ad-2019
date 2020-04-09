import React from "react";
import Persons from "../Persons/Persons";

const personsTable = (props) => {
  if (props.loading) return <p>Loading...</p>;
  if (props.error) return <p>Error :(</p>;

  return (
    <table className="table mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>E-mail</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>{<Persons data={props.data} />}</tbody>
    </table>
  );
};

export default personsTable;
