/**JS-07 - Fetch & REST API */

const BASE_URL = 'https://pokeapi.co/api/v2/';


/**
 * @param {string} pokemon el nombre o el id ingresado por el usuario 
 * @returns la información en formato JSON o una notificación de error
 */
const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
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
    document.getElementById('name').textContent = `Nombre: ${pokemon.name}`;
    document.getElementById('id').textContent = `id: ${pokemon.id}`;
    document.getElementById('weight').textContent = `Peso: ${pokemon.weight}`;
    document.getElementById('height').textContent = `Altura: ${pokemon.height}`;
    document.getElementById('b-exp').textContent = `Experiencia base: ${pokemon.base_experience}`;
    document.getElementById('img').setAttribute('src', pokemon.sprites.front_default);
};