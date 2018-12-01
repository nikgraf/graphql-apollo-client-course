import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const recipesQuery = gql`
  {
    recipes {
      id
      title
    }
  }
`;

export default class Recipes extends Component {
  render() {
    return (
      <Query query={recipesQuery}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading…</p>;
          if (error) return <p>Something went wrong</p>;

          return (
            <ul>
              {data.recipes.map(({ id, title }) => (
                <li key={id}>{title}</li>
              ))}
            </ul>
          );
        }}
      </Query>
    );
  }
}
