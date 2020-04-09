import React from "react";
import { FaTrash, FaPencilAlt } from "react-icons/fa";

const persons = (props) => {
  return props.data.persons.map(({ id, name, email }) => (
    <tr key={id}>
      <td>{id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>
        <button
          className="btn btn-warning" /* onClick={() => this.load("user")} */
        >
          <FaPencilAlt />
        </button>
        <button
          className="btn btn-danger ml-2"
          /* onClick={() => this.remove("user")} */
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  ));
};

export default persons;
