const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');


// NASA API
const count = 10;
const apiKey = 'DEMO_KEY'
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`


let resultsArray = [];
let favorites = {};

function updateDOM() {
 resultsArray.forEach((result) => {
    // card container
    const card = document.createElement('div');
    card.classList.add('card');

    // Link
    const link = document.createElement('a');
    link.href = result.hdurl;
    link.title = 'View Full Image';
    link.target = '_blank';

    // image
    const image = document.createElement('img');
    image.src = result.url;
    image.alt = 'NASA Picture of the Day';
    image.loading = 'lazy';
    image.classList.add('card-img-top');

    // card body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // card Body content: 
    
    // card Title
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add ('card-title');//
    cardTitle.textContent = result.title;

    // Save text
    const saveText = document.createElement('p');
    saveText.classList.add('clickable');
    saveText.textContent = 'Add To Favorites';
    saveText.setAttribute('onClick', `saveFavorite('${result.url}')`); 

    // Card Text
    const cardText = document.createElement('p');
    cardText.textContent = result.explanation;

    // Footer Container
    const footer = document.createElement('small');
    footer.classList.add('text-muted');

    // date
    const date = document.createElement('strong');
    date.textContent = result.date;

    // copyright
    const copyrightResult = result.copyright === undefined ? '' : result.copyright;
    const copyright = document.createElement('span');
    copyright.textContent = ` ${copyrightResult}`;

    // APPEND
    footer.append(date, copyright);
    cardBody.append(cardTitle, saveText, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    imagesContainer.appendChild(card);
    // console.log(card); 

 });
}

// Get 10 IMAGES from nasa Api
async function getNasaPictures() {
  try {
 const response = await fetch(apiUrl); 
 resultsArray = await response.json();
 console.log(resultsArray);
 updateDOM()
  } catch (error) {
    // catch Error here
  }
}   

// Add Result To Favorites
function saveFavorite(itemUrl) {
//  Loop through Results Array to Select Favorite
resultsArray.forEach((item) => {
if (item.url.includes(itemUrl) && !favorites[itemUrl ]) {
  favorites[itemUrl] = item;
  console.log();

  // Show save confirmation for 2 seconds
  saveConfirmed.hidden = false;
  setTimeout(() => {
    saveConfirmed.hidden = true;
  }, 2000);

  // Set favorites in loocal storage
  localStorage.setItem('nasaFavorites', JSON.stringify(favorites))
    }
  });
}


// on load
getNasaPictures(); 