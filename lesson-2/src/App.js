import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider, Query } from "react-apollo";
import Recipes from "./Recipes";

const client = new ApolloClient({
  uri: "http://localhost:4000/"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        {/* <Query
          query={gql`
            {
              recipes {
                id
                title
              }
            }
          `}
        >
          {({ data, loading, error }) => {
            if (loading) return <p>Loading…</p>;
            if (error) return <p>Something went wrong</p>;

            return (
              <ul>
                {data.recipes.map(({ id, title }) => <li key={id}>{title}</li>)}
              </ul>
            );
          }}
        </Query> */}
        <Recipes />
      </ApolloProvider>
    );
  }
}

export default App;
