let container = document.querySelector(".pokemons");
let selectPage = document.querySelector("#limit");
let navigation = document.querySelector(".numbers");

let pokemons = [];
const pokeUrl = "https://pokeapi.co/api/v2/";
let prevLink = "";
let nextLink = "";
let count = 0;
let perPage = 50;
let currentPage = 0;
// console.log(pokeUrl); 

const changePg = (value) => {
    //console.log("value: ", value);
    let newUrl = `${pokeUrl}pokemon?limit=${value}`;
    perPage = value;
    getPokemons(newUrl);
}
const prev = () => {
    getPokemons(prevLink);
}
const next = () => {
    getPokemons(nextLink);
}


async function getPokemons(url) {
    try {
        let params = new URLSearchParams(url.split('?')[1]);
        let offset = params.get('offset');
        currentPage = offset / perPage;
        let res = await fetch(url)
        let res1 = await res.json();
        prevLink = res1.previous;
        nextLink = res1.next;
        count = res1.count;
        addNumbers(count);
        showPokemons(res1.results);
    } catch (error) {
        console.log(error);
    }

}
async function showPokemons(array) {
    clearContainer();
    array.map(item => {
        fetch(item.url)
            .then(response => response.json())
            .then(data => {
                loadCard(data);
            })
    })
}
const loadCard = (data) => {
    const image = data.sprites.other.home.front_default;
    let newImage = image ? image : '/images/default.png';
    let card = document.createElement("div");
    let content = `
       
            <img src="${newImage}" alt="${data.name}">
            <p>${data.name}</p>
            
            <p>Weghit: ${data.weight}</p>
        `;
    card.innerHTML = content;
    container.appendChild(card);
}

const clearContainer = () => container.innerHTML = "";
const clearNavigation = () => navigation.innerHTML = "";

const addNumbers = () => {
    clearNavigation();
}
const actionNumber = (index) => {
    const newLink = `https://pokeapi.co/api/v2/pokemon?offset=${index * perPage}&limit=${perPage}`;
    getPokemons(newLink);

}
const addFocusClass = () => {
    const span = document.querySelector(`.element-${currentPage}`);
    span.classList.add("current");
}

getPokemons(`${pokeUrl}pokemon?offset=0&limit=50`);

