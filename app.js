document.addEventListener('DOMContentLoaded', () => {
    const random = getRandomInt(1, 151); //aleatorio
    fetchData(random); //lo llamamos
});

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const fetchData = async (id) => {   //id es de la constante random. Que lo llamos con fetchData.
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        console.log(data);

        const pokemon = { //Declaramos un objeto, en este caso, vamos a sacar la imagen, el nombre
            img: data.sprites.other.dream_world.front_default,
            nombre: data.name,
            hp: data.stats[0].base_stat,
            experiencia: data.base_experience,
            ataque: data.stats[1].base_stat,
            defensa: data.stats[2].base_stat,
            especial: data.stats[3].base_stat,
        };

        pintarCard(pokemon);    //Se pinta nuestra tarjeta 
    } catch (error){
        console.log(error);
    }
};

const pintarCard = (pokemon) => { //Este pokemon trae toda nuestra informacion
    //console.log(pokemon);
    const flex = document.querySelector('.flex'); //Donde va a ir nuestro template
    const template = document.querySelector('#template-card').content; //Capturamos nuestro template
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();

    //Vamos a cambiar la imagen (<img> del html) donde aparecen los pokemon
    clone.querySelector('.card-body-img').setAttribute('src', pokemon.img); //Llamamos a la imagen desde nuestro objeto que ya conecto con la API
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.nombre} <span>${pokemon.hp} hp</span>`;
    clone.querySelector('.card-body-text').textContent = pokemon.experiencia + ' Exp';  // "textContent" es para texto plano
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.ataque + ' K';
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.defensa + ' K';
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.especial + ' K';

    fragment.appendChild(clone); //Le estamos diciendo a 'fragment' guarde el pedacito de codigo que esta arriba que es 'clone'
    // que es nuestro 'CLONE' modificado
    flex.appendChild(fragment);

}