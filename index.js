// const pokemon = "Gardevoir";
const datos = fetch("https://pokeapi.co/api/v2/pokemon/staraptor")
    .then((datosJson) => {
        return datosJson.json();
    }).catch((error) => {
        console.error("Error: No se pudo acceder a la API")
    });

datos.then((pokemon) => {
    const poke = {
      name: pokemon.name,
      front: pokemon.sprites.front_default,
      back: pokemon.sprites.back_default,
      front_shiny: pokemon.sprites.front_shiny,
      back_shiny: pokemon.sprites.back_shiny,
      cry: pokemon.cries.latest,
      ps: pokemon.stats[0].base_stat,
      ataque: pokemon.stats[1].base_stat,
      defensa: pokemon.stats[2].base_stat,
      ataque_especial: pokemon.stats[3].base_stat,
      defensa_especial: pokemon.stats[4].base_stat,
      velocidad: pokemon.stats[5].base_stat,
    };

    const name = document.getElementById("name");
    const front = document.getElementById("front");
    const back = document.getElementById("back");
    const front_shiny = document.getElementById("front_shiny");
    const back_shiny = document.getElementById("back_shiny");
    const audio = document.getElementById("audio");
    const cry = document.getElementById("cry");
    const ps = document.getElementById("ps");
    const ataque = document.getElementById("ataque");
    const defensa = document.getElementById("defensa");
    const ataque_especial = document.getElementById("ataque_especial");
    const defensa_especial = document.getElementById("defensa_especial");
    const velocidad = document.getElementById("velocidad");

    name.textContent = poke.name;
    front.src = poke.front;
    back.src = poke.back;
    front_shiny.src = poke.front_shiny;
    back_shiny.src = poke.back_shiny;
    cry.src = poke.cry;
    audio.load();
    ps.textContent = poke.ps;
    ataque.textContent = poke.ataque;
    defensa.textContent = poke.defensa;
    ataque_especial.textContent = poke.ataque_especial;
    defensa_especial.textContent = poke.defensa_especial;
    velocidad.textContent = poke.velocidad;
});