document.getElementById('recipeForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const query = document.getElementById('query').value;
    const appId = '4c235eda';
    const appKey = '18ee7eb58c309827972279e7d78530a9';
    const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data.hits);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});

function displayResults(recipes) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    recipes.forEach(recipeData => {
        const recipe = recipeData.recipe;

        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        const img = document.createElement('img');
        img.src = recipe.image;
        recipeDiv.appendChild(img);

        const label = document.createElement('h2');
        label.textContent = recipe.label;
        recipeDiv.appendChild(label);

        const link = document.createElement('a');
        link.href = recipe.url;
        link.textContent = 'View Recipe';
        link.target = '_blank';
        recipeDiv.appendChild(link);

        resultsDiv.appendChild(recipeDiv);
    });
}
