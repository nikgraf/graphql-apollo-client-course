/**
 * npm run seed
 * to seed the database with some initial data
 */
const { recipeDb, ingredientDb } = require('./db');

Promise.all([
  ingredientDb.insert([
    {
      _id: 'asdf123',
      name: 'Salad'
    },
  ]),
  recipeDb.insert([
    {
      _id: '18jlXSrjsoDjJbNqmq8dFoN8UUf',
      title: 'Wiener schnitzel',
      vegetarian: false,
      ingredients: [],
      preparation: []
    },
    {
      _id: '18jldvbbrVgOtda5kru1iRwqkhd',
      title: 'Guacamole',
      vegetarian: true,
      ingredients: [],
      preparation: []
    },
    {
      _id: '18jlgQ0YCehomI6cBM53uHdWuMM',
      title: 'Caesar salad',
      vegetarian: false,
      ingredients: [],
      preparation: []
    },
    {
      _id: '18jliUAUIroOoTa5An3FjeoFM9S',
      title: 'Apple strudel',
      vegetarian: true,
      ingredients: [],
      preparation: []
    }
  ])
]).then(() => {
  console.log('✅ Database seeding successful.');
}).catch((err) => {
  console.log('⚠️ Database seeding error ⚠️');
  console.log(err);
})
