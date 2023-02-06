document.addEventListener('DOMContentLoaded', function(event){
    fetch('http://localhost:8080/all')
    .then(response => {
        if(!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => 
        postCatResults(data));
});

function postCatResults(data){
    for(let i = 0; i < data.length; i++){
        addToResults(data[i]);
    }
}

function addToResults(data){
    const results = document.getElementById('results');
    // outer card
    const outerCard = createOuterCard();

    // inner card
    const innerCard = createInnerCard();

    // card front
    const cardFront = createCardFront(data);

    // Card back
    const cardBack = createCardBack(data);
    
    innerCard.append(cardFront);
    innerCard.append(cardBack);
    outerCard.appendChild(innerCard);
    results.appendChild(outerCard);
}

const createOuterCard = () => {
    const outerCard = document.createElement('li');
    outerCard.className = "card card--hover";
    return outerCard;
}

const createInnerCard = () => {
    const innerCard = document.createElement('div');
    innerCard.className = "card__inner";
    return innerCard;
}

const createCardFront = (data) => {
    const cardFront = document.createElement('div');
    cardFront.className = "card__front";

    const cardFrontTitle = document.createElement('h4');
    cardFrontTitle.className = "card__front__title";
    cardFrontTitle.innerText = `${data["id"]}: ${data["breed"]}`;

    const cardFrontImage = document.createElement('img');
    cardFrontImage.className = "card__front__img";
    cardFrontImage.src = data["imageLocation"];

    cardFront.append(cardFrontTitle);
    cardFront.append(cardFrontImage);

    return cardFront;
}

const createCardBack = (data) => {
    // Base parent of card back
    const cardBack = document.createElement('div');
    cardBack.className = "card__back";

    // Card Title
    const cardHeading = document.createElement('h3');
    cardHeading.className = "card__back__title";
    cardHeading.innerText = `Breed: ${data["breed"]}`;

    cardBack.appendChild(cardHeading);

    // Traits list
    let cardTraitsList = document.createElement('dl');

    // Traits List - Location
    cardTraitsList = addNewDefinitionToList(cardTraitsList, "Location", data["location"]);

    // Traits List - Breed Type
    cardTraitsList = addNewDefinitionToList(cardTraitsList, "Breed Type", data["breedType"]);

    // Traits List - Body Type
    cardTraitsList = addNewDefinitionToList(cardTraitsList, "Body Type", data["bodyType"]);

    // Traits List - Coat Type and Length
    cardTraitsList = addNewDefinitionToList(cardTraitsList, "Coat Type and Length", data["coatType"]);

    // Traits List - Coat Pattern
    cardTraitsList = addNewDefinitionToList(cardTraitsList, "Coat Pattern", data["coatPattern"]);

    cardBack.appendChild(cardTraitsList);

    return cardBack;
}

const addNewDefinitionToList = (dataList, title, text) => {
    const dt = document.createElement('dt');
    dt.innerText = title;

    const dd = document.createElement('dd');
    dd.innerText = text;

    dataList.appendChild(dt);
    dataList.appendChild(dd);

    return dataList;
}