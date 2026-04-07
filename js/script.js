const botaoBuscar = document.getElementById('btnbuscar');
const inputPokemon = document.getElementById('pokemon-input');
const resultado = document.getElementById('resultado');
const mensagemErro = document.getElementById('mensagemErro');


async function buscarPokemon(dados) {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${dados}`
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Pokemon nao encontrado')
        }

        const pokemon = await response.json();
        return pokemon;
    } catch (error) {
        return null;
    }
    
}

//  evento de clique
botaoBuscar.addEventListener('click', async () => {
    const termoBusca = inputPokemon.value.toLowerCase().trim();
    ;
    if (termoBusca === "") {
        document.getElementById('pokemon-imagem').src = '';
        inputPokemon.focus(); 
        return; 
    }

    if (termoBusca) {
        const pokemon = await buscarPokemon(termoBusca);
        
        if (pokemon) {
            //  Nome e Imagem
            document.getElementById('pokemon-nome').textContent = pokemon.name;
            document.getElementById('pokemon-imagem').src = pokemon.sprites.front_shiny;
            
            //  Tipos 
            const listaTipos = document.getElementById('pokemon-tipos');
            listaTipos.innerHTML = ''; // Limpa os tipos da busca anterior

            pokemon.types.forEach(item => {
                const span = document.createElement('span');
                span.textContent = item.type.name;
                span.classList.add('tipo-tag'); 
                listaTipos.appendChild(span);
            });

            //  Mostrar Resultado
            resultado.classList.remove('oculto');
            mensagemErro.classList.add('oculto');
        } else {
            // 4. Se não houver pokemon, mostrar erro
            mensagemErro.classList.remove('oculto');
            resultado.classList.add('oculto');
        }
    }
});


