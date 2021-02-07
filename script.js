const baseUrl = "https://www.themealdb.com/api/json/v1/1/";
const searchInputField = document.getElementById("search-field");
const searchInputButton = document.getElementById("search-btn");
const showDisplayArea = document.getElementById("display");
const showDetailsArea = document.getElementById("details-area");

searchInputButton.addEventListener("click",()=>{
    searchFoodByName(searchInputField.value);
})
const searchFoodByName = keyword =>{
    if (keyword != "") {
        showLoader(showDisplayArea, true);
        let url = `${baseUrl}search.php?s=${keyword}`;
        fetch(encodeURI(url))
        .then(data=>data.json())
        .then(data=>{
            showLoader(showDisplayArea, false);
            displayFood(data);
        });
    }    
}
const displayFood = data => {
    if (data.meals == null) {
        showNotFoundMessage();
    } else {
        showDisplayArea.innerHTML = createFoodCard(data)
    }
}
const showNotFoundMessage = () => {
    showDisplayArea.innerHTML = `<h1>Not found</h1><br>
    <span class="material-icons" style="font-size:30px;padding: 20px 10px">
    sentiment_very_dissatisfied
    </span>`;
}
const createFoodCard = data => {
    let meals = data.meals;
    let elementString = "";
    meals.forEach(data => {
            elementString += `<div class="food-item" onclick="showFoodDetails(${data.idMeal})">
                <div class="thumbnail">
                    <img src="${data.strMealThumb}"/>
                </div>
                <div class="food-name">
                    <h3>${data.strMeal}</h3>
                </div>
            </div>`;
    });
    return elementString;
}
const showFoodDetails = id => {
    let url = `${baseUrl}lookup.php?i=${id}`;
    fetch(encodeURI(url))
        .then(data=>data.json())
        .then(data=>{
            let item = data.meals[0];
            let ingredients = "";
            for(let i = 1; i <= 6; i++){
                ingredients += `<li><i class="material-icons">check_box</i> ${item["strIngredient"+i]}</li>`;
            }
            showDetailsArea.innerHTML = `<section id="modal">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="food-details">
                    <button id="modal-btn" onclick="hideFoodDetails()">X</button>
                    <img src="${item.strMealThumb}" />
                    <div class="details">
                      <h1>${item.strMeal}</h1>
                      <h4>Ingredients</h4>
                      <ul>${ingredients}</ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>`;
        });
}
const hideFoodDetails = ()=> {
    showDetailsArea.innerHTML = "";
}
const showLoader = (parent, argument) => {
    argument ? parent.innerHTML = `<div class="loader"></div>` : "";
}