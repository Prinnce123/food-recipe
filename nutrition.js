document.getElementById('recipeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const recipeText = document.getElementById('recipe').value;
    const appId = 'YOUR_APP_ID';  // Replace with your App ID
    const appKey = 'YOUR_API_KEY';  // Replace with your API Key

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

    // Show the overlay
    document.getElementById('overlay').style.display = 'flex';
}

// Close overlay when close button or close icon is clicked
document.getElementById('closeOverlay').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'none';
});

document.getElementById('closeOverlayButton').addEventListener('click', function() {
    document.getElementById('overlay').style.display = 'none';
});

// Close overlay when user clicks outside of the overlay content
window.addEventListener('click', function(event) {
    const overlay = document.getElementById('overlay');
    if (event.target === overlay) {
        overlay.style.display = 'none';
    }
});
