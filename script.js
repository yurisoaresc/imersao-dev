let cardContainer = document.querySelector(".card-container");

let dados = [];

async function IniciarBusca() {
    // Carrega os dados do JSON apenas na primeira vez
    if (dados.length === 0) {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
    }

    let termoBusca = document.querySelector('header input').value.toLowerCase();

    let dadosFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) || 
        dado.descricao.toLowerCase().includes(termoBusca)
    );

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ''; // Limpa os cards existentes antes de renderizar os novos
    for (let dado of dados){
        let article = document.createElement("article");
       // A classe 'card' é adicionada ao article para estilização
       article.innerHTML = `
       <h2>${dado.nome}</h2>
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Leia mais</a>
        
        `
       cardContainer.appendChild(article);
    }
}

// Efeito de aurora que segue o mouse
window.addEventListener('mousemove', e => {
    document.body.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.body.style.setProperty('--mouse-y', `${e.clientY}px`);
});