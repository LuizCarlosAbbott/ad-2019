import React from "react";
import Persons from "../Persons/Persons";

const personsTable = (props) => {
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
      <tbody>
        <Persons />
      </tbody>
    </table>
  );
};

export default personsTable;
