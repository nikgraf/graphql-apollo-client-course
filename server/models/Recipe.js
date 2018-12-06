const { sortBy } = require("ramda");
const { recipeDb } = require("./db");
const { addId, addIds } = require("./utils");

/**
 * Get a list of all the recipes that match the optionally provided filters
 *
 * @param  {Bool} vegetarian Should only return vegetarian or non-vegetarian recipes
 * @param  {String} ingredient Should only return recipes that contain that ingredient
 *
 * @returns {Promise<[Recipe]>}
 */
const getRecipes = async ({ vegetarian, ingredient }) => {
  // Construct the filters
  let filters = {};
  if (vegetarian === true) filters.vegetarian = true;
  if (ingredient) {
    filters.ingredients = {
      $elemMatch: ingredient
    };
  }
  const recipes = await recipeDb.find(filters);
  return sortBy(recipe => recipe.title.toLowerCase(), addIds(recipes));
};

/**
 * Add a recipe to the database
 *
 * @param {Object} input
 * @param {String} input.title
 * @param {Bool}   input.vegetarian
 * @param {Array}  input.preparation An array of steps of preparation (i.e. an array of strings)
 * @param {Array}  input.ingredients An array of ingredient IDs with their amount, e.g. { amount: '30g', ingredient: 'asdf123' }
 *
 * @returns {Promise<NewRecipe>}
 */
const addRecipe = async input => {
  const recipe = await recipeDb.insert(input);
  return addId(recipe);
};

module.exports = { getRecipes, addRecipe };
