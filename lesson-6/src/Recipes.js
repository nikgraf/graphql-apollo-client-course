import React, { Component } from "react";
import { Query, Mutation } from "react-apollo";
import recipesQuery from "./recipesQuery";
import gql from "graphql-tag";

const updateRecipeStarredMutation = gql`
  mutation updateRecipeStarred($id: ID!, $isStarred: Boolean!) {
    updateRecipeStarred(id: $id, isStarred: $isStarred) @client
  }
`;

export default class Recipes extends Component {

  state = {
    vegetarian: false
  }

  updateVegetarian = ({ target: { checked }}) => {
    this.setState({ vegetarian: checked });
  }

  render() {
    return (
      <React.Fragment>
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
          pollInterval={3000}
        >
          {({ data, loading, error, refetch }) => {
            if (loading) return <p>Loading…</p>;
            if (error) return <p>Something went wrong</p>;

            return (
              <React.Fragment>
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
                        {(updateRecipeStarred, { loading, error}) => (
                          <button
                            onClick={() =>
                              updateRecipeStarred({
                                variables: {
                                  id,
                                  isStarred: !isStarred
                                }
                              })
                            }
                            className="star-btn"
                            style={{
                              color: isStarred ? "orange" : "grey",
                              animation: loading ?
                                "inflate 0.7s ease infinite alternate" :
                                "none" 
                            }}
                          >
                            ★ {error && "Failed to update"}
                          </button>
                        )}
                      </Mutation>
                    </li>
                  ))}
                </ul>
                <button onClick={() => refetch()}>Refresh Recipes</button>
              </React.Fragment>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}
