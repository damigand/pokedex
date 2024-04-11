import { pokemons, types } from '/pokemon.js';

const counter = document.querySelector('.counter');
const filterTypesArticle = document.querySelector('.filter-types');
const trainerSelect = document.querySelector('#trainers');
const levelButton = document.querySelector('.button-level');
let selectedTypeButton;

const filter = () => {
   let filteredList = pokemons;
   const trainer = trainerSelect.value;
   const level = document.querySelector('#level').value;
   const typeSelected = filterTypesArticle.querySelector('.selected');
   const type = typeSelected ? typeSelected.innerText : '';

   //console.log(trainer, level, type);

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

const showPokemon = (pokemonList, clear = false) => {
   const pokemons = document.querySelector('.pokemons');

   pokemons.innerHTML = clear ? '' : pokemons.innerHTML;

   for (const pokemon of pokemonList) {
      let pokemonElement = document.createElement('div');
      pokemonElement.classList.add('pokemon');

      pokemonElement.innerHTML = `
         <h2>${pokemon.name}</h2>
         <img src="${pokemon.image}" alt="${pokemon.name}" />
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
      pokemonElement.appendChild(typesElement);
      pokemons.appendChild(pokemonElement);
   }

   updateCounter(pokemonList.length);
};

showPokemon(pokemons);
showFilterTypes(types);
updateCounter(pokemons.length);
