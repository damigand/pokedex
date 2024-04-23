import { pokemons, types } from '/pokemon.js';

const counter = document.querySelector('.counter');
const searchInput = document.querySelector('#buscar');
const clearSearch = document.querySelector('.clearSearch');
const filterTypesArticle = document.querySelector('.filter-types');
const trainerSelect = document.querySelector('#trainers');
const levelButton = document.querySelector('.button-level');
let selectedTypeButton;

const filter = () => {
   let filteredList = pokemons;
   const search = searchInput.value;
   const trainer = trainerSelect.value;
   const level = document.querySelector('#level').value;
   const typeSelected = filterTypesArticle.querySelector('.selected');
   const type = typeSelected ? typeSelected.innerText : '';

   if (search) {
      let newList = [];
      for (const pokemon of filteredList) {
         if (pokemon.name.toLowerCase().includes(search)) {
            newList.push(pokemon);
         }
      }
      filteredList = newList;
   }

   if (trainer) {
      let newList = [];
      for (const pokemon of filteredList) {
         if (pokemon.trainer.toLowerCase() == trainer) {
            newList.push(pokemon);
         }
      }
      filteredList = newList;
   }

   if (level && level < 101 && level > 0) {
      let newList = [];
      for (const pokemon of filteredList) {
         if (pokemon.level <= level) {
            newList.push(pokemon);
         }
      }
      filteredList = newList;
   }

   if (type) {
      let newList = [];
      for (const pokemon of filteredList) {
         if (pokemon.types.includes(types[type])) {
            newList.push(pokemon);
         }
      }
      filteredList = newList;
   }

   showPokemon(filteredList, true);
};

trainerSelect.addEventListener('change', filter);
levelButton.addEventListener('click', filter);

const updateCounter = (size) => {
   counter.innerText = `${size} de ${size} resultados`;
};

//Seleccionar el tipo de pokemon y cambiar aspetos generalmente visuales.
const selectType = (event) => {
   let newTypeButton = event.target;
   let type = newTypeButton.innerText;

   if (selectedTypeButton) {
      if (selectedTypeButton == newTypeButton) {
         newTypeButton.classList.remove('selected');
         newTypeButton.style.border = `1px solid transparent`;
         selectedTypeButton = '';
      } else {
         newTypeButton.classList.add('selected');
         newTypeButton.style.border = `1px solid ${types[type]}`;
         selectedTypeButton.classList.remove('selected');
         selectedTypeButton.style.border = `1px solid transparent`;
         selectedTypeButton = newTypeButton;
      }
   } else {
      newTypeButton.classList.add('selected');
      newTypeButton.style.border = `1px solid ${types[type]}`;
      selectedTypeButton = newTypeButton;
   }
   filter();
};

//Pinta los botones para filtrar por tipo de pokemon
const showFilterTypes = (types) => {
   const typesDiv = document.createElement('div');
   typesDiv.classList.add('allTypes');

   for (const type in types) {
      let typeButton = document.createElement('button');
      typeButton.classList.add(`filter-${type}`);
      typeButton.innerText = type;
      typeButton.style.color = types[type];
      typeButton.style.border = '1px solid transparent';

      typeButton.addEventListener('click', selectType);

      typesDiv.appendChild(typeButton);
   }
   filterTypesArticle.appendChild(typesDiv);
};

//Pinta los pokemon resultantes de los filtros.
//Parámetro opcional "clear" que controla que no se pinten pokémon repetidos.
const showPokemon = (pokemonList, clear = false) => {
   const pokemons = document.querySelector('.pokemons');

   pokemons.innerHTML = clear ? '' : pokemons.innerHTML;

   if (pokemonList.length < 1) {
      showRecommended(true);
   } else {
      showRecommended(false);
   }

   for (const pokemon of pokemonList) {
      let pokemonElement = createCard(pokemon);
      pokemons.appendChild(pokemonElement);
   }

   updateCounter(pokemonList.length);
};

const createCard = (pokemon) => {
   let pokemonElement = document.createElement('article');
   pokemonElement.classList.add('pokemon');

   let pokemonCard = document.createElement('div');
   pokemonCard.classList.add('pk-card');

   let frontCard = document.createElement('div');
   frontCard.classList.add('pk-front');
   frontCard.innerHTML = `
         <h2>${pokemon.name}</h2>
         <div class="relative hw-120 pk-img">
            <img src="${pokemon.image}" alt="${pokemon.name}" class="absolute" />
         </div>
         <h4>Level ${pokemon.level}</h4>
         `;

   let typesElement = document.createElement('div');
   typesElement.classList.add('types');

   for (const pokemonType of pokemon.types) {
      for (const type in types) {
         if (types[type] == pokemonType) {
            let p = document.createElement('p');
            p.classList.add('type');
            p.innerText = type;
            p.style.borderColor = pokemonType;
            p.style.color = pokemonType;
            typesElement.appendChild(p);
            break;
         }
      }
   }

   frontCard.appendChild(typesElement);

   let backCard = document.createElement('div');
   backCard.classList.add('pk-back');
   backCard.innerHTML = `
         <h4>Entrenador</h4>
         <h6>${pokemon.trainer}</h6>
         <h4>Legendario: </h4><span>${pokemon.legendary}</span>
         <h4>Starter: </h4><span>${pokemon.starter}</span>
         <h4>Mega: </h4><span>${pokemon.mega}</span>
      `;

   pokemonElement.addEventListener('mouseleave', (event) => {
      let img = event.target.querySelector('img');
      pokemonElement.classList.add('border-hoverOut');
      img.classList.add('img-hoverout');

      let card = event.target.querySelector('.pk-card');
      if (card.classList.contains('flipped')) {
         card.style.transform = 'rotateY(360deg)';
         card.classList.remove('flipped');
      }
   });

   pokemonElement.addEventListener('click', (event) => {
      let card = pokemonElement.querySelector('.pk-card');
      console.log('click');
      if (card.classList.contains('flipped')) {
         card.style.transform = 'rotateY(360deg)';
         card.classList.remove('flipped');
      } else {
         card.style.transform = 'rotateY(180deg)';
         card.classList.add('flipped');
      }
   });

   pokemonCard.appendChild(frontCard);
   pokemonCard.appendChild(backCard);
   pokemonElement.appendChild(pokemonCard);

   return pokemonElement;
};

const showRecommended = (show) => {
   let pokemonSection = document.querySelector('section.pokemons');

   if (show) {
      pokemonSection.classList.add('empty');
      const message = `
      <article class="message">
            ¡Vaya! Parece que ningún pokémon coincide con tu búsqueda. Aquí te dejamos algunos pokémon que podrían gustarte:
         </article>
      `;

      const recommendedPokemon = document.createElement('div');
      recommendedPokemon.classList.add('recommended');

      let randomPokemon = [];
      for (let a = 0; a < 6; a++) {
         let added = false;
         let number = Math.floor(Math.random() * pokemons.length);
         let pokemon = pokemons[number];
         if (!randomPokemon.includes(pokemon)) {
            randomPokemon.push(pokemon);
         } else {
            a--;
         }
      }

      for (const pokemon of randomPokemon) {
         let pokemonCard = createCard(pokemon);
         recommendedPokemon.appendChild(pokemonCard);
      }

      pokemonSection.innerHTML = message + pokemonSection.innerHTML;
      pokemonSection.appendChild(recommendedPokemon);
   } else {
      pokemonSection.classList.remove('empty');
   }
};

const addGeneralListeners = () => {
   const filters = document.querySelector('.filters');
   filters.addEventListener('mouseleave', () => {
      filters.classList.add('border-hoverOut');
   });
};

searchInput.addEventListener('keyup', filter);
clearSearch.addEventListener('click', () => {
   searchInput.value = '';
   filter();
});
showPokemon(pokemons);
showFilterTypes(types);
updateCounter(pokemons.length);
addGeneralListeners();
