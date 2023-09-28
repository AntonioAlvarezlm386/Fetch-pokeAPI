/**JS-07 - Fetch & REST API */

const pokeContainer = document.getElementById('poke-container');
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';


/**
 * @param {string} pokemon el nombre o el id ingresado por el usuario 
 * @returns la información en formato JSON o una notificación de error
 */
const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${BASE_URL}${pokemon}`);
        const parsedResponse = await response.json(response);
        return parsedResponse;
    } catch (err) {
        alert('Error! Intentelo de nuevo');
    };
};


/**Boton para obtener el pokemon buscado */
document.getElementById('get-btn')
    .addEventListener('click', async () => {
        const nameInput = document.getElementById('poke-name');
        const pokemonName = nameInput.value.toLowerCase();
        const pokemon = await fetchPokemon(pokemonName);
        localStorage.setItem('currentId', pokemon.id);
        nameInput.value = '';
        updateCard(pokemon);
    });

/**Boton de pokemon anterior */
document.getElementById('previous-btn')
    .addEventListener('click', async () => {
        const currentId = parseInt(localStorage.getItem('currentId'));
        const newId = Math.max(1, currentId - 1);
        const pokemon = await fetchPokemon(newId);
        localStorage.setItem('currentId', newId);
        updateCard(pokemon);
    });


/**Boton para seleccionar siguiente pokemon */
document.getElementById('next-btn')
    .addEventListener('click', async () => {
        const currentId = parseInt(localStorage.getItem('currentId'));
        const newId = currentId + 1;
        const pokemon = await fetchPokemon(newId);
        localStorage.setItem('currentId', newId);
        updateCard(pokemon);
    });


/**Cargar elemento guardado en el localStorage */
document.addEventListener('DOMContentLoaded', async () => {
    const storedId = localStorage.getItem('currentId');
    console.log(storedId);
    const initialId = storedId ? parseInt(storedId) : Math.floor(Math.random() * 500);
    localStorage.setItem('currentId', initialId);
    const pokemon = await fetchPokemon(initialId);
    updateCard(pokemon);
});



/**
 * 
 * @param {object} pokemon, respuesta de la función fetchPokemon
 */
function updateCard(pokemon) {
    const htmlStructure = {
        name: document.getElementById('name'),
        id: document.getElementById('weight'),
        weight: document.getElementById('id'),
        height: document.getElementById('height'),
        baseExperience: document.getElementById('b-exp'),
        img: document.getElementById('img')
    };
    htmlStructure.name.textContent = `Nombre: ${pokemon.name}`;
    htmlStructure.id.textContent = `id: ${pokemon.id}`;
    htmlStructure.weight.textContent = `Peso: ${pokemon.weight}`;
    htmlStructure.height.textContent = `Altura: ${pokemon.height}`;
    htmlStructure.baseExperience.textContent = `Experiencia base: ${pokemon.base_experience}`;
    htmlStructure.img.setAttribute('src', pokemon.sprites.front_default);
};