document.addEventListener('DOMContentLoaded', () => {
    fetch('recipes.csv')
        .then(response => response.text())
        .then(data => {
            const recipes = parseCSV(data);
            displayRecipes(recipes);
        });

    document.getElementById('search-button').addEventListener('click', searchRecipes);
    document.querySelectorAll('.category').forEach(button => {
        button.addEventListener('click', filterByCategory);
    });
});

function parseCSV(data) {
    const rows = data.split('\n');
    const headers = rows[0].split(',');
    const recipes = rows.slice(1).map(row => {
        const values = row.split(',');
        let recipe = {};
        headers.forEach((header, index) => {
            recipe[header.trim()] = values[index].trim();
        });
        return recipe;
    });
    return recipes;
}

function displayRecipes(recipes) {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');
        recipeCard.innerHTML = `
                <h3>${recipe['Name']}</h3>
                <p>Cuisine: ${recipe['Cuisine']}</p>
                <p>Category: ${recipe['Category']}</p>
                <button onclick="viewRecipe('${recipe['Name']}')">View Recipe</button>
            `;
        recipeList.appendChild(recipeCard);
    });
}

function searchRecipes() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    fetch('recipes.csv')
        .then(response => response.text())
        .then(data => {
            const recipes = parseCSV(data);
            const filteredRecipes = recipes.filter(recipe => recipe['Name'].toLowerCase().includes(searchInput));
            displayRecipes(filteredRecipes);
        });
}

function filterByCategory(e) {
    const category = e.target.dataset.category;
    fetch('recipes.csv')
        .then(response => response.text())
        .then(data => {
            let recipes = parseCSV(data);
            if (category !== 'all') {
                recipes = recipes.filter(recipe => recipe['Category'].toLowerCase() === category);
            }
            displayRecipes(recipes);
        });
}

function viewRecipe(recipeName) {
    alert(`Viewing details for: ${recipeName}`);
}