import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { FaTrash, FaPencilAlt } from "react-icons/fa";

const PERSONS = gql`
  {
    persons {
      id
      name
      email
    }
  }
`;

const CREATE_PERSON = gql`
  mutation CreatePerson($input: PersonInput!) {
    createPerson(input: $input) {
      id
      name
      email
    }
  }
`;

export default function Persons() {
  const { loading, error, data } = useQuery(PERSONS);
  let input;
  const [createPerson] = useMutation(CREATE_PERSON, {
    update(cache, { data: { createPerson } }) {
      const { persons } = cache.readQuery({ query: PERSONS });
      cache.writeQuery({
        query: PERSONS,
        data: { persons: persons.concat([createPerson]) },
      });
    },
  });

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPerson({
            variables: { input: { name: input.value, email: input.value } },
          });
          input.value = "";
        }}
      >
        <input
          ref={(node) => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
      {/* {data.persons.map(({ id, name, email }) => (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{email}</td>
          <td>
            <button
              className="btn btn-warning"
              onClick={() => this.load("user")}
            >
              <FaPencilAlt />
            </button>
            <button
              className="btn btn-danger ml-2"
              onClick={() => this.remove("user")}
            >
              <FaTrash />
            </button>
          </td>
        </tr>
      ))} */}
    </div>
  );

  return data.persons.map(({ id, name, email }) => (
    <tr key={id}>
      <td>{id}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>
        <button className="btn btn-warning" onClick={() => this.load("user")}>
          <FaPencilAlt />
        </button>
        <button
          className="btn btn-danger ml-2"
          onClick={() => this.remove("user")}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  ));
}
