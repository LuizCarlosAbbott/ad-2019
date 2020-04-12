import React, { useState } from "react";
import { FaTrash, FaPencilAlt, FaSave } from "react-icons/fa";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "./Persons.css";

const UPDATE_PERSON = gql`
  mutation updatePerson($id: String!, $input: PersonInput!) {
    updatePerson(id: $id, input: $input) {
      id
      name
      email
    }
  }
`;

function Persons(props) {
  const [updatePerson] = useMutation(UPDATE_PERSON);
  const [rIndex, setIndex] = useState(-1);
  const [nameChange, setName] = useState("");
  const [emailChange, setEmail] = useState("");

  return props.data.persons.map(({ id, name, email, friend }, index) => {
    return (
      <tr key={id} id={id}>
        <td>
          {rIndex !== index ? (
            name
          ) : (
            <input
              className="Fade"
              value={nameChange}
              onChange={(e) => setName(e.target.value)}
            />
          )}
        </td>
        <td>
          {rIndex !== index ? (
            email
          ) : (
            <input
              className="Fade"
              value={emailChange}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
        </td>
        <td>{friend}</td>
        <td>
          <button
            className="btn btn-warning Fade"
            onClick={() => {
              if (rIndex === index) {
                setIndex(-1);
              } else {
                setIndex(index);
                setName(name);
                setEmail(email);
              }
            }}
          >
            <FaPencilAlt style={{ backgroundColor: "#fbc118" }} />
          </button>
          {rIndex === index ? (
            <button
              className="btn btn-success ml-2 Fade"
              onClick={() => {
                updatePerson({
                  variables: {
                    id,
                    input: { name: nameChange, email: emailChange },
                  },
                });
                setIndex(-1);
              }}
            >
              <FaSave style={{ backgroundColor: "#57a845" }} />
            </button>
          ) : null}
          <button
            className="btn btn-danger ml-2 Fade"
            onClick={() => props.delete({ variables: { id } })}
          >
            <FaTrash style={{ backgroundColor: "#dd4b44" }} />
          </button>
        </td>
      </tr>
    );
  });
}

export default Persons;
