import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import PersonsTable from "../components/PersonsTable/PersonsTable";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { FaGifts, FaArrowRight } from "react-icons/fa";
import "./App.css";

const DELETE_PERSON = gql`
  mutation deletePerson($id: String!) {
    deletePerson(id: $id) {
      id
      name
      email
    }
  }
`;

const PERSONS = gql`
  {
    persons {
      id
      name
      email
      friend
    }
  }
`;

const CREATE_PERSON = gql`
  mutation createPerson($input: PersonInput!) {
    createPerson(input: $input) {
      id
      name
      email
      friend
    }
  }
`;

const SORT_FRIEND = gql`
  mutation sortFriend {
    sortFriend {
      id
      name
      email
      friend
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
  const [sortFriend, { loading: loadingSort }] = useMutation(SORT_FRIEND, {
    async update(cache, { data: { sortFriend } }) {
      await cache.writeQuery({
        query: PERSONS,
        data: { persons: sortFriend },
      });
    },
  });
  const [deletePerson] = useMutation(DELETE_PERSON, {
    async update(cache, { data: { deletePerson } }) {
      const { persons } = cache.readQuery({ query: PERSONS });
      await persons.map((e, index) =>
        e.id === deletePerson.id ? persons.splice(index, 1) : e
      );
      cache.writeQuery({
        query: PERSONS,
        data: { persons: persons },
      });
    },
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div className="Geral">
      <div className="Logo">
        <FaGifts size={150} className="icon" />
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
                Adicionar a lista
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
              <button
                className="btn btn-success ml-2"
                onClick={() => {
                  data &&
                    data.persons &&
                    data.persons.length > 1 &&
                    sortFriend();
                }}
              >
                Sortear e enviar email
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="App">
        <PersonsTable
          data={data}
          loading={loading}
          loadingSort={loadingSort}
          error={error}
          delete={deletePerson}
        />
      </div>
      <div className="Footer">
        Produzido com carinho por Luiz Carlos - para ver o código &nbsp; {"  "}
        <a href="https://github.com/LuizCarlosAbbott/ad-2019/">
          {" "}
          acesse
          <FaArrowRight />
        </a>{" "}
      </div>
    </div>
  );
}

export default App;
