- [x] Criar backend utilizando mongoose(mongoDB) e algum framework (NestJs/GraphQL).
- [x] Fazer CRUD de pessoas (nome, email, amigo).
- [x] Preencher coluna amigo(FK) -- **amigo** => adicionado apos o sorteio / inicialmente vazio/inexistente
- [x] Fazer o CRUD no frontend em ReactJs (listar, cadastrar, editar, apagar pessoas).
- [x] Sortear os amigos (preencher a coluna amigos) e enviar e-mail para cada pessoa com o amigo sorteado.
- [ ] Implementar testes no backend.
- [x] Dar deploy da aplicação no Heroku.
- [x] Escrever instruçes de como executar o programa.

# Pre-requisitos

- [Nodejs](https://nodejs.org/en/), [MongoDB](https://www.mongodb.com/) e [Nestjs](https://nestjs.com/) instalados na maquina.

# Instruções

## Iniciar o MongoDB (Linux)

- sudo systemctl start mongod

## Instalar dependências

- entrar na pasta raiz backend/fronted executar **yarn** ou **npm install** para instalar dependências.

## Habilitando serviço de email

Para poder habilitar o serviço de email no banck crie um arquivo chamado **.env** e dentro dele escreva suas informações como no exemplo abaixo:

EMAIL_DOMAIN: 'hotmail' <br/>
EMAIL: 'exemplo@hotmail.com' <br/>
EMAIL_PASS: 'palavrachave' <br/>

## Rodar aplicação Backend/Frontend

- executar o comando **yarn start** ou **npm start** na pasta raiz após a instalação das dependências.

O frontend estará rodando em http://localhost:3000 e o backend está rodando em http://localhost:4000/graphql.
