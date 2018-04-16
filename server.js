const express = require('express');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
const fetch = require('node-fetch');
const axios = require('axios');

// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];

const alimentos = [
  {
    nombre: 'Manzana',
    tipo: 'Fruta',
  },
  {
    nombre: 'Jurassic Park',
    tipo: 'Michael Crichton',
  },
];

const nutrientes = [
  {
    nombre: 'Manzana',
    tipo: 'Fruta',
  },
  {
    nombre: 'Jurassic Park',
    tipo: 'Michael Crichton',
  },
];

// The GraphQL schema in string form
const typeDefs = `
  type Query {
    books: [Book]
    alimentos: [Alimento]
    alimentosLetra (letra: String!): ListaAlimentos 
    nutrientes: [Nutriente]
    users: User
  }
  type Book {
    title: String
    author: String
  }
  type Alimento {
    nombre: String
    tipo: String
  }
  type Nutriente {
    tipo: String
    nombre: String
  }
  type User {
      login: String
      id: ID
      avatar_url: String
      gravatar_id: String
      url: String
      html_url: String
      followers_url: String
      following_url: String
      gists_url: String
      starred_url: String
      subscriptions_url: String
      organizations_url: String
      repos_url: String
      events_url: String
      received_events_url: String
      type: String
      site_admin: Boolean
      name: String
      company: String
      blog: String
      location: String
      email: String
      hireable: Boolean
      bio: String
      public_repos: Int
      public_gists: Int
      followers: Int
      following: Int
      created_at: String
      updated_at: String
  }
`;

// The resolvers
const resolvers = {
  Query: { 
    books: () => books, 
    alimentos: () => alimentos,
    nutrientes: () => nutrientes,
    users: async () => {
      const response = await fetch(`https://api.github.com/users/github`);
      return response.json();
    }
  }
};

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

// Initialize the app
const app = express();

// The GraphQL endpoint
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));

// GraphiQL, a visual editor for queries
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

// Start the server
app.listen(3000, () => {
  console.log('Go to http://localhost:3000/graphiql to run queries!');
});