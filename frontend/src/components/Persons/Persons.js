import React from "react";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const DELETE_PERSON = gql`
  mutation deletePerson($id: String!) {
    deletePerson(id: $id) {
      id
      name
      email
    }
  }
`;

function Persons(props) {
  const [deletePerson, { data }] = useMutation(DELETE_PERSON);

  return props.data.persons.map(({ id, name, email }, index) => (
    <tr key={id} id={id}>
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
          onClick={() => {
            deletePerson({ variables: { id } });
            const row = document.getElementById(id);
            row.parentNode.removeChild(row);
          }}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  ));
}

export default Persons;
