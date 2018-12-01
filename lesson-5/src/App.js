import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Recipes from "./Recipes";
import AddRecipe from "./AddRecipe";

const resolvers = {
  Recipe: {
    isStarred: parent => {
      // return false;
      const starredRecipes =
        JSON.parse(localStorage.getItem("starredRecipes")) || [];
      return starredRecipes.includes(parent.id);
    }
  },
  Mutation: {
    updateRecipeStarred: (_, variables, { getCacheKey, cache }) => {
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

      // const id = getCacheKey({ __typename: "Recipe", id: variables.id });
      // const fragment = gql`
      //   fragment isStarredTodo on RecipeItem {
      //     isStarred
      //   }
      // `;
      // const recipe = cache.readFragment({ fragment, id });
      // const data = { ...recipe, isStarred: !recipe.isStarred };
      // cache.writeData({ id, data });
      // return data;
    }
  }
};

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
        <Recipes />
      </ApolloProvider>
    );
  }
}

export default App;
