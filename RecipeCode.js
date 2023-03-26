const apiKey = '5c8f2ca555334c1398cb7a888fc0e3de';
const apiUrl = 'https://api.spoonacular.com/recipes/random?apiKey=' + apiKey + '&number=1&tags=pakistani,indian,arabian,turkish';



const generateBtn = document.getElementById('generate-btn');
const recipeSection = document.getElementById('recipe-section');
const recipeContainer = document.getElementById('recipe');

generateBtn.addEventListener('click', () => {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const recipe = data.recipes[0];
      const title = recipe.title;
      const image = recipe.image;
      const sourceUrl = recipe.sourceUrl;
      const ingredients = recipe.extendedIngredients.map(i => i.original).join(', ');
      const cookingTime = recipe.readyInMinutes;
      const servings = recipe.servings;
      const rating = recipe.spoonacularScore;

      recipeContainer.innerHTML = `
       <h2>${title}</h2>
      <img src="${image}" alt="${title}">
      <p>Ingredients: ${ingredients}</p>
      <p>Cooking Time: ${cookingTime} minutes</p>
      <p>Servings: ${servings}</p>
      <p>User Rating: ${rating}</p>
`;



      recipeSection.style.display = 'block';
    })
    .catch(error => console.log(error));
});
