document.getElementById('recipeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const recipeText = document.getElementById('recipe').value;
    const appId = '97384347';  // Replace with your App ID
    const appKey = '1528dbda17120b9250b1add088659e80';  // Replace with your API Key

    fetch(`https://api.edamam.com/api/nutrition-details?app_id=${appId}&app_key=${appKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ingr: recipeText.split('\n') })
    })
    .then(response => response.json())
    .then(data => {
        displayNutritionInfo(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function displayNutritionInfo(data) {
    const nutritionDiv = document.getElementById('nutritionInfo');
    if (data.error) {
        nutritionDiv.innerHTML = `<p>Error: ${data.message}</p>`;
    } else {
        nutritionDiv.innerHTML = `
            <h2>Nutrition Information</h2>
            <p>Calories: ${data.calories}</p>
            <p>Fat: ${data.totalNutrients.FAT.quantity} ${data.totalNutrients.FAT.unit}</p>
            <p>Carbs: ${data.totalNutrients.CHOCDF.quantity} ${data.totalNutrients.CHOCDF.unit}</p>
            <p>Protein: ${data.totalNutrients.PROCNT.quantity} ${data.totalNutrients.PROCNT.unit}</p>
        `;
    }
}
