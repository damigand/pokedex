import { pokemons, types } from '/pokemon.js';

const showPokemon = (pokemonList) => {
   const pokemons = document.querySelector('.pokemons');

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
};

showPokemon(pokemons);
