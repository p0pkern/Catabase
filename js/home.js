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

function addToResults(cat){
    const results = document.getElementById('results');
    // outer card
    const outerCard = document.createElement('li');
    outerCard.className = "card card--hover";

    // inner card
    const innerCard = document.createElement('div');
    innerCard.className = "card__inner";

    // card front
    const cardFront = document.createElement('div');
    cardFront.className = "card__front";

    // card front title
    const cardFrontTitle = document.createElement('h4');
    cardFrontTitle.className = "card__front__title";
    cardFrontTitle.innerText = cat["name"];

    // card front image
    const cardFrontImage = document.createElement('img');
    cardFrontImage.className = "card__front__img";
    cardFrontImage.src = cat["image"];

    // Card back
    const cardBack = document.createElement('div');
    cardBack.className = "card__back";

    // Card back title
    const cardBackTitle = document.createElement('h4');
    cardBackTitle.innerText = "Fact"

    // Card back text
    const cardBackText = document.createElement('p');
    cardBackText.innerText = "Heres a fun fact about the cat";

    cardFront.append(cardFrontTitle);
    cardFront.append(cardFrontImage);
    cardBack.append(cardBackTitle);
    cardBack.append(cardBackText);
    innerCard.append(cardFront);
    innerCard.append(cardBack);
    outerCard.appendChild(innerCard);
    results.appendChild(outerCard);
}
