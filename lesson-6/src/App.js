import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Recipes from "./Recipes";
import AddRecipe from "./AddRecipe";

const resolvers = {
  Recipe: {
    isStarred: parent => {
      const starredRecipes =
        JSON.parse(localStorage.getItem("starredRecipes")) || [];
      return starredRecipes.includes(parent.id);
    }
  },
  Mutation: {
    updateRecipeStarred: (_, variables) => {
      const starredRecipes =
        JSON.parse(localStorage.getItem("starredRecipes")) || [];
      if (variables.isStarred) {
        localStorage.setItem(
          "starredRecipes",
          JSON.stringify(starredRecipes.concat([variables.id]))
        );
      } else {
        localStorage.setItem(
          "starredRecipes",
          JSON.stringify(
            starredRecipes.filter(recipeId => recipeId !== variables.id)
          )
        );
      }
      return {
        __typename: "Recipe",
        isStarred: variables.isStarred
      };
    }
  }
}

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  clientState: {
    resolvers
  }
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AddRecipe />
        <hr
          style={{
            marginTop: "1.5rem",
            border: 0,
            height: 1,
            background: "#ccc"
          }}
        />
        <Recipes />
      </ApolloProvider>
    );
  }
}

export default App;
