/*************************************************************************** 
 * Objetivo: Arquivo responsável por puxar e exibir as informações da API. *
 * Data: 27/04/2024                                                        *
 * Autores: Nícollas Viana e Lucas Maciel                                  *
 * Versão: 1.4.4.24                                                        *
***************************************************************************/

// Seleciona elementos HTML importantes
const pokemonImage = document.querySelector('.pokemon_image');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonName = document.querySelector('.pokemon_name');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

// Variável para armazenar o número do Pokémon pesquisado
let searchPokemon = 1;

// Função assíncrona para buscar dados da API Pokémon
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }
}

// Função para renderizar os dados do Pokémon na página
const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Não encontrado';
        pokemonNumber.innerHTML = ''
    }

}

// Evento de submissão do formulário de pesquisa
form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

// Evento de clique no botão Anterior
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

// Evento de clique no botão Próximo
buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

// Renderiza o primeiro Pokémon ao carregar a página
renderPokemon(searchPokemon);
