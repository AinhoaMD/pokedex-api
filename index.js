// Esperamos a que cargue todo
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("pokemonInput");
    const boton = document.getElementById("buscarBtn");

    const container = document.getElementById("container");
    const badName = document.getElementById("badName");
    const homeScreen = document.getElementById("homeScreen");

    // Elementos del HTML que se van a modificar
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

    // Función para capitalizar
    const capitalizar = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1);

    // Función para mostrar sprites de los tipos
    function mostrarTipos(pokemon) {
        const tiposContainer = document.getElementById('tipos');
        tiposContainer.innerHTML = ''; // Limpiar tipos anteriores

        pokemon.types.forEach(t => {
            const img = document.createElement('img');
            img.src = `assets/${t.type.name}.png`; // sprite correspondiente en assets
            img.alt = t.type.name;
            img.width = 50;
            tiposContainer.appendChild(img);
        });
    }

    // Pillar datos de la API
    function buscarPokemon() {
        const nombre = input.value.trim().toLowerCase();
        if (nombre === "") return;

        const datos = fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
            .then((datosJson) => {
                return datosJson.json();
            }).catch((error) => {
                console.error("Error: Pokémon no encontrado")
            });

        datos.then((pokemon) => {
            if (!pokemon || !pokemon.name) {
                badName.style.display = "block";
                container.style.display = "none";
                homeScreen.style.display = "none";
                return;
            }

            container.style.display = "block";
            homeScreen.style.display = "none";
            badName.style.display = "none";

            const poke = {
                name: capitalizar(pokemon.name),
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

            // Asignar valores al HTML
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
            mostrarTipos(pokemon);
        });
    }

    // Buscar al hacer click
    boton.addEventListener("click", buscarPokemon);

    // Buscar con Enter
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            buscarPokemon();
        }
    })
});