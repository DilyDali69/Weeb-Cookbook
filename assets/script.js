fetch('assets/recipes.csv')
    .then(response => response.text()) // Use .text() to get raw CSV data
    .then(csvText => {
        // Parse CSV data with PapaParse
        Papa.parse(csvText, {
            header: true,
            complete: function(results) {
                displayRecipes(results.data); // Pass parsed JSON data to display function
            }
        });
    })
    .catch(error => console.error('Error fetching recipes:', error));


let allRecipes = []; // Global array to store all parsed recipes


function displayRecipes(recipes) {
    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = ""; // Clear any existing content

    recipes.forEach(recipe => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        // Recipe Name
        const recipeName = document.createElement("h3");
        recipeName.textContent = recipe["Recipe Name"];
        
        // Ingredients Section
        const ingredients = document.createElement("div");
        ingredients.classList.add("ingredients-section");
        ingredients.innerHTML = `<strong>Ingredients:</strong><ul>${
            splitIngredients(recipe["Ingredients"])
                .map(item => `<li>${capitalizeAndFormat(item.trim())}</li>`) // Format and wrap each in <li>
                .join('')
        }</ul>`;

        // Instructions Section
        const instructions = document.createElement("div");
        instructions.classList.add("instructions-section");
        instructions.innerHTML = `<strong>Instructions:</strong><ol>${
            recipe["Instructions"]
                .split(/\.|\n/) // Split by period or newline for each step
                .map(step => step.trim().replace(/^\d+(\.\s*|\s+)/, "")) // Remove leading numbers and dots with optional spaces
                .filter(step => step.length > 1) // Remove any remaining empty or single-digit steps
                .map(step => capitalizeAndFormat(step)) // Format each instruction
                .map(step => `<li>${step}</li>`) // Wrap each step in <li>
                .join('')
        }</ol>`;

        // Append elements to the recipe card
        recipeCard.appendChild(recipeName);
        recipeCard.appendChild(ingredients);
        recipeCard.appendChild(instructions);

        // Append the recipe card to the recipe list in the HTML
        recipeList.appendChild(recipeCard);
    });
}

// Helper function to split ingredients, ignoring commas inside parentheses
function splitIngredients(ingredients) {
    // Regular expression to match commas that are not within parentheses
    return ingredients.match(/(?:\([^()]*\)|[^,])+/g) || [];
}

// Helper function to capitalize the first letter and add a period if needed
function capitalizeAndFormat(text) {
    if (text.length === 0) return text; // Handle empty text

    // Capitalize first letter
    text = text.charAt(0).toUpperCase() + text.slice(1);

    // Add period at the end if missing
    if (!text.endsWith(".")) {
        text += ".";
    }

    return text;
}
function displayRecipes(recipes) {
    const recipeList = document.getElementById("recipe-list");
    recipeList.innerHTML = ""; // Clear any existing content

    recipes.forEach(recipe => {
        const recipeCard = document.createElement("div");
        recipeCard.classList.add("recipe-card");

        // Recipe Name
        const recipeName = document.createElement("h3");
        recipeName.textContent = recipe["Recipe Name"];
        
        // Ingredients Section
        const ingredients = document.createElement("div");
        ingredients.classList.add("ingredients-section");
        ingredients.innerHTML = `<strong>Ingredients:</strong><ul>${
            recipe["Ingredients"]
                .split(/,|\n/) // Split by comma or newline
                .map(item => capitalizeAndFormat(item.trim())) // Format each ingredient
                .map(item => `<li>${item}</li>`) // Wrap each in <li>
                .join('')
        }</ul>`;

        // Instructions Section
        const instructions = document.createElement("div");
        instructions.classList.add("instructions-section");
        instructions.innerHTML = `<strong>Instructions:</strong><ol>${
            recipe["Instructions"]
                .split(/\.|\n/) // Split by period or newline for each step
                .map(step => step.trim().replace(/^\d+(\.\s*|\s+)/, "")) // Remove leading numbers and dots with optional spaces
                .filter(step => step.length > 1) // Remove any remaining empty or single-digit steps
                .map(step => capitalizeAndFormat(step)) // Format each instruction
                .map(step => `<li>${step}</li>`) // Wrap each step in <li>
                .join('')
        }</ol>`;

        // Append elements to the recipe card
        recipeCard.appendChild(recipeName);
        recipeCard.appendChild(ingredients);
        recipeCard.appendChild(instructions);

        // Append the recipe card to the recipe list in the HTML
        recipeList.appendChild(recipeCard);
    });
}

// Helper function to capitalize the first letter and add a period if needed
function capitalizeAndFormat(text) {
    if (text.length === 0) return text; // Handle empty text

    // Capitalize first letter
    text = text.charAt(0).toUpperCase() + text.slice(1);

    // Add period at the end if missing
    if (!text.endsWith(".")) {
        text += ".";
    }

    return text;
}



// Event listeners for category buttons
document.querySelectorAll('.category').forEach(button => {
    button.addEventListener('click', function () {
        const category = this.dataset.category;
        if (category === 'all') {
            displayRecipes(allRecipes); // Show all recipes if "All" is selected
        } else {
            const filteredRecipes = allRecipes.filter(recipe => {
                const categories = recipe.Category ? recipe.Category.split(',').map(cat => cat.trim()) : [];
                return categories.includes(category); // Check if any tag matches the selected category
            });
            displayRecipes(filteredRecipes); // Show only recipes matching the selected category
        }
    });
});
