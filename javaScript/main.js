
/**JS-07 - Fetch & REST API */

const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

const fetchPokemon = async (pokemon) => {
    try{
        const response = await fetch(`${BASE_URL}${pokemon}`);
        const parsedResponse = await response.json(response);
        return parsedResponse;
    } catch(err) {
        alert('Error! Intentelo de nuevo');
    };
};


document.getElementById('get-btn')
    .addEventListener('click', async () => {
        const pokemonName = document.getElementById('poke-name').value.toLowerCase();
        const pokemon = await fetchPokemon(pokemonName);
        localStorage.setItem('currentPokeId', pokemon.id);
        alert(pokemon.name);
    });

document.getElementById('previous-btn')
    .addEventListener('click', async () => {
        const currentId = parseInt(localStorage.getItem('currentPokeId'));
        const newId = Math.max( 1, currentId -1 );
        const pokemon = await fetchPokemon(newId);
        localStorage.setItem('currentPokeId', newId);
        alert(pokemon.name);
    });

    document.getElementById('next-btn')
        .addEventListener('click',async () => {
            const currentId = parseInt(localStorage.getItem('currentPokeId'));
            const newId = currentId + 1;
            const pokemon = await fetchPokemon(newId);
            localStorage.setItem('currentPokeId', newId);
            alert(pokemon.name);
        })

