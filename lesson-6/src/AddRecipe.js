import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag"
import recipesQuery from "./recipesQuery";

const addRecipeMutation = gql`
  mutation addRecipe($recipe: RecipeInput!) {
    addRecipe(recipe: $recipe) {
      id
      title
    }
  }
`

export default class AddRecipe extends Component {
  state = {
    title: "",
    vegetarian: false
  };

  updateVegetarian = ({ target: { checked } }) => {
    this.setState({ vegetarian: checked });
  };

  updateTitle = ({ target: { value } }) => {
    this.setState({ title: value });
  };

  resetFields = () => {
    this.setState({ title: "", vegetarian: false });
  };

  render() {
    return (
      <Mutation
        mutation={addRecipeMutation}
        refetchQueries={[
          {
            query: recipesQuery,
            variables: { vegetarian: true }
          },
          {
            query: recipesQuery,
            variables: { vegetarian: false }
          }
        ]}
        awaitRefetchQueries={true}
      >
        {(addRecipe, { loading, error }) => (
          <form
              onSubmit={evt => {
              evt.preventDefault();
              addRecipe({
                variables: {
                  recipe: {
                    title: this.state.title,
                    vegetarian: this.state.vegetarian
                  }
                }
              })

              this.resetFields();
              }}
          >
              <label>
              <span>Title</span>
              <input
                  type="text"
                  value={this.state.title}
                  onChange={this.updateTitle}
              />
              </label>
              <label>
              <input
                  type="checkbox"
                  checked={this.state.vegetarian}
                  onChange={this.updateVegetarian}
              />
              <span>vegetarian</span>
              </label>
              <div>
              <button>Add Recipe</button>
              { loading && <p>Loading...</p> }
              { error && <p>Error :( Please try again</p> }
              </div>
          </form>
        )}
      </Mutation>
    );
  }
}
