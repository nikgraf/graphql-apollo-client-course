import React, { Component, Fragment } from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import recipesQuery from "./recipesQuery";

const updateRecipeStarredMutation = gql`
  mutation updateRecipeStarred($id: ID!, $isStarred: Boolean!) {
    updateRecipeStarred(id: $id, isStarred: $isStarred) @client
  }
`;

export default class Recipes extends Component {
  state = {
    vegetarian: false
  };

  updateVegetarian = ({ target: { checked } }) => {
    this.setState({ vegetarian: checked });
  };

  render() {
    return (
      <Fragment>
        <label>
          <input
            type="checkbox"
            checked={this.state.vegetarian}
            onChange={this.updateVegetarian}
          />
          <span>vegetarian</span>
        </label>
        <Query
          query={recipesQuery}
          variables={{ vegetarian: this.state.vegetarian }}
        >
          {({ data, loading, error }) => {
            if (loading) return <p>Loading…</p>;
            if (error) return <p>Something went wrong</p>;

            return (
              <ul>
                {data.recipes.map(({ id, title, isStarred }) => (
                  <li key={id}>
                    {title}
                    <Mutation
                      mutation={updateRecipeStarredMutation}
                      refetchQueries={[
                        {
                          query: recipesQuery,
                          variables: { vegetarian: false }
                        },
                        {
                          query: recipesQuery,
                          variables: { vegetarian: true }
                        }
                      ]}
                      awaitRefetchQueries={true}
                    >
                      {(updateRecipeStarred, { loading, error }) => (
                        <button
                          className="star-btn"
                          style={{
                            color: isStarred ? "orange" : "grey",
                            animation: loading
                              ? "inflate 0.7s ease infinite alternate"
                              : "none"
                          }}
                          onClick={() =>
                            updateRecipeStarred({
                              variables: {
                                id,
                                isStarred: !isStarred
                              }
                            })
                          }
                        >
                          ★ {error && "Failed to update"}
                        </button>
                      )}
                    </Mutation>
                  </li>
                ))}
              </ul>
            );
          }}
        </Query>
      </Fragment>
    );
  }
}
