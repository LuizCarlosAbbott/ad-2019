import React, { useState } from "react";
import PersonsTable from "../components/PersonsTable/PersonsTable";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import "./App.css";

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
  mutation createPerson($input: PersonInput!) {
    createPerson(input: $input) {
      id
      name
      email
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(PERSONS);
  const [createPerson] = useMutation(CREATE_PERSON, {
    update(cache, { data: { createPerson } }) {
      const { persons } = cache.readQuery({ query: PERSONS });
      cache.writeQuery({
        query: PERSONS,
        data: { persons: persons.concat([createPerson]) },
      });
    },
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <div className="form">
          <div className="row">
            <div className="col12 col-md-6">
              <div className="form-group">
                <label>Nome</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Digite o nome..."
                />
              </div>
            </div>

            <div className="col-12 col-md-6">
              <div className="form-group">
                <label>E-mail</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Digite o e-mail..."
                />
              </div>
            </div>
          </div>

          <hr />
          <div className="row">
            <div className="col-12 d-flex justify-content-end">
              <button
                className="btn btn-primary"
                onClick={(e) =>
                  createPerson({ variables: { input: { name, email } } })
                }
              >
                Salvar
              </button>

              <button
                className="btn btn-secondary ml-2"
                onClick={(e) => {
                  setEmail("");
                  setName("");
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
        <PersonsTable data={data} loading={loading} error={error} />
      </header>
    </div>
  );
}

export default App;
