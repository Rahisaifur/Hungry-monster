// Display Title / error message..
const displayMessage = message => {
    console.log(message);
    document.getElementById('message').innerHTML = message;
}

// Clear search result displaying area
const clearDisplay = () => {
    document.getElementById('displayResult').innerHTML = "";
}
// Adding eventListener 
document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const searchInput = document.getElementById('searchInput').value;
    searchFood(searchInput);
})


// Fetch initial data from API with
const searchFood = input => {
    if (input) {
        document.getElementById("searchForm").reset();
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.meals === null) {
                    clearDisplay()
                    const message = `<h3>Sorry "${input}" is not available right now. <br/> Try searching something else.</h3>`
                    displayMessage(message);
                } else {
                    clearDisplay()
                    const message = `<h3>${input} !! <br/> There you are!  </h3>`
                    displayMessage(message);
                    displayMeals(data.meals);
                }
            })
    } else {
        clearDisplay();
        const message = `<h3>No input was submitted.. <br/> Please enter at least one character...</h3>`
        displayMessage(message);
    }
}

// Display food items
const displayMeals = meals => {
    clearDisplay()
    const displayResult = document.getElementById('displayResult')
    meals.forEach(food => {
        const column = document.createElement('div')
        column.className = "col-md-3 food-item my-3 "

        const foodContent = `
        <div onclick="getDetails('${food.idMeal}')" class="items-image card w-100 overflow-hidden">
            <img src="${food.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title text-center">${food.strMeal}</h5>
                <h5 class="text-center">${food.strCategory}</h5>
                <h6 class="text-center"> origin :${food.strArea}</h6>
            </div>
        </div>
        `
        column.innerHTML = foodContent;
        displayResult.appendChild(column);
    });
}

//  Fetch single item from API with meal id
const getDetails = idMeal => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayDetails(data.meals))
}







// Display details of clicked item and steps..
const displayDetails = meals => {
    const modalBody = document.getElementById('modalBody')
    meals.forEach(food => {
        const foodDetails = `
        <div class="card w-100">
            <div class="row g-0">

                <div class="col-md-6">
                    <img src="${food.strMealThumb}" class="card-img-top single-item-image" alt="...">
                </div>

                <div class="col-md-6">
                    <div class="card-body">
                        <h3 class="card-title">${food.strMeal} <span><button type="button" class="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button></span></h3>
                        <h5 class="card-title">Ingredients</h5>
                        <ul class="list-unstyled">
                            ${ingredientList(food)}
                        </ul>
                        <h3>!!Steps to Get the taste of it!!</h3>
                        <p class="bg-primary">${food.strInstructions}
                        </p>
                    </div>
                </div>

            </div>
        </div>
        `
        modalBody.innerHTML = foodDetails;
        const foodModal = new bootstrap.Modal(document.getElementById('foodModal'))
        foodModal.show()
    });
}

// Create Ingredient list
const ingredientList = food => {
    let li = ''

    for (let i = 1; i <= 15; i++) {
        let strIngredient = 'strIngredient' + i
        if (food[strIngredient]) {
            li = li + `<li> ${i}) ${food[strIngredient]}</li>`;
        }
    }
    return li;
}