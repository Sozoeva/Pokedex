const modal = document.querySelector(".modal");
const pokemonsRoot = document.querySelector(".pokemons");
const slides = document.querySelectorAll('.slide');
const backButton = document.querySelector('.back');
const nextButton = document.querySelector('.next');

const MAIN_URL = "http://localhost:8080/pokemons";

let pokemonArr = [];
let currentIndex = 0;

const getAllPokemons = async () => {
  try {
    const responce = await fetch(MAIN_URL);
    pokemonArr = await responce.json();
    if (responce.ok) {
      renderPokemon(pokemonArr);
    } else {
      throw new Error("An error has occurred");
    }
  } catch (error) {
    alert(error.message);
  }
};

const renderPokemon = (pokemonArr) => {
  pokemonArr.forEach((pokemon) => {
    const div = document.createElement("div");
    div.classList = "pokemon";
    div.innerHTML += `
    <h2 class = "pokemonsName">${pokemon.name}</h2>  
    <img class = "text pokemonsImg" src = "${pokemon.img}" alt = "pokemons images">`;

    const moreBtn = document.createElement("button");
    moreBtn.innerHTML = "more";
    moreBtn.classList = "button moreBtn";

    div.append(moreBtn);
    pokemonsRoot.append(div);
    moreBtn.onclick = () => {
      const pokemonId = pokemon.id;
      callModalWin(pokemonId);
    };
  });
};

function callModalWin(pokemonId) {
  const pokemon = pokemonArr.find((pokemon) => pokemon.id === pokemonId);
  if (pokemon) {
    modal.innerHTML = "";
    const modalWin = document.createElement("div");
    const exitBtn = document.createElement("button");
    exitBtn.classList = "button exitBtn";
    exitBtn.innerHTML = "Exit";
    modalWin.classList = "modalWin";
    modalWin.style.backgroundColor = pokemon.backgroundColor;
    modalWin.innerHTML = `
    <h2 class = "pokemonsName">${pokemon.name}</h2>  
    <div class = "description">   
    <img class = "modalImg" src = "${pokemon.img}" alt = "pokemons images">
    <div class = "about">
      <p class = "text pokemonsWeight">Weight: ${pokemon.weight} kg </p>
      <p class = "text pokemonsHeight">Height: ${pokemon.height} m </p>
      <p class = "text pokemonsCategory">Category: ${pokemon.category}</p>
      <p class = "text pokemonsAbilities">Abilities: ${pokemon.abilities}</p>
    </div>
    </div>
    `;
    exitBtn.onclick = closeModalWin;
    modalWin.append(exitBtn);
    modal.append(modalWin);
    modal.style.display = "block";
  }
}

function closeModalWin() {
  modal.style.display = "none";
}

getAllPokemons();


function showSlide(index) {
  slides.forEach(function(slide) {
    slide.style.display = 'none';
  });

  slides[index].style.display = 'block';
  console.log(index);
}

function backSlide() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = slides.length - 1;
  }
  showSlide(currentIndex);
}

function nextSlide() {
  currentIndex++;
  if (currentIndex >= slides.length) {
    currentIndex = 0;
  }
  showSlide(currentIndex);
}

backButton.addEventListener('click', backSlide);
nextButton.addEventListener('click', nextSlide);

showSlide(currentIndex);
