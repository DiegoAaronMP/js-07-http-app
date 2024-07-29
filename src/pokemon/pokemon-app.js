
/**
 * Function that returns a random integer number from 1 to 937
 * @returns {Number} from 1 to 937
 */
const getRandomNumber = () => {
    return Math.floor(Math.random() * 937) + 1;
}

/**
 * 
 * @returns {Promise<Object>} move info
 */
const fetchMove = async () => {
    const randomId = getRandomNumber();
    console.log(randomId);
    const res = await fetch(`https://pokeapi.co/api/v2/move/${randomId}`);

    const data = await res.json();
    return data;
}


/**
 * 
 * @param {HTMLDivElement} element 
 */
export const PokemonApp = async (element) => {
    document.querySelector('#app-title').innerHTML = 'Pokémon App';
    element.innerHTML = 'Loading...';

    const nameLabel = document.createElement('h3');
    const descriptionLabel = document.createElement('blockquote');
    const nextMoveButton = document.createElement('button');
    nextMoveButton.innerText = 'Next Move';

    const renderMove = (move) => {
        const { name, effect_entries } = move;

        descriptionLabel.innerHTML = (effect_entries[0]) ? effect_entries[0].effect : 'API Effect Undefined';
        nameLabel.innerHTML = name;

        element.replaceChildren(nameLabel, descriptionLabel, nextMoveButton);
    }

    fetchMove()
        .then(move => renderMove(move));

    nextMoveButton.addEventListener('click', async() => {
        element.replaceChildren('Loading...');

        const move = await fetchMove();
        renderMove(move);
    });
}
