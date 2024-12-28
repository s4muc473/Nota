const localStorageKey = 'NOTAS'
let arrayNotas = JSON.parse(localStorage.getItem(localStorageKey) || '[]');

const dataAtual = new Date();
const mesDoAno = dataAtual.getMonth() + 1;
const diaDoMes = dataAtual.getDate();
let diaFormatado = diaDoMes < 10 ? '0' + diaDoMes : diaDoMes;
let mesFormatado = mesDoAno < 10 ? '0' + mesDoAno : mesDoAno; 7
let dataFormatadaFinal = diaFormatado + '/' + mesFormatado;

const elementosDaPagina = {
    localNotas: () => document.getElementById('local--notas'),
    textArea: () => document.getElementById('textArea'),
    inputSelecionaCategoria: () => document.getElementById('input--selecionar--categoria'),
    btnSelecionaCategoria: () => document.getElementById('btn--selecionar--categoria'),
}

function criaNota() {
    if (!elementosDaPagina.textArea().value) {
        alert("DIGITE O CONTEUDO DA NOTA");
    } else {
        content = elementosDaPagina.textArea().value

        arrayNotas.unshift({
            content: content,
            date: dataFormatadaFinal,
        })
        localStorage.setItem(localStorageKey, JSON.stringify(arrayNotas));
        geraNotas('todas-notas');
        elementosDaPagina.textArea().value = '';
    }
}

function geraNotas(type) {
    if (arrayNotas) {
        let teste = new RegExp(`^\\b${type}\\b`, 'i');

        elementosDaPagina.localNotas().innerHTML = '';
        for (let iterador = 0; iterador < arrayNotas.length; iterador++) {
            content = arrayNotas[iterador].content;

            if (teste.test(content)) {
                carregarNotas(arrayNotas[iterador].content,arrayNotas[iterador].date)
            } else if (type == 'todas-notas') {
                carregarNotas(arrayNotas[iterador].content,arrayNotas[iterador].date)
            }

        }
    }
}

function carregarNotas(content,date) {
    let nota = document.createElement('div');
    let divBotoes = document.createElement('div');
    let divBotoesFilha = document.createElement('div');
    let data = document.createElement('div');
    let btnExcluirNota = document.createElement('div');
    let btnEditarNota = document.createElement('div');
    let textArea = document.createElement('textarea');

    nota.setAttribute('class', 'nota');
    divBotoes.setAttribute('class', 'div--botoes--principal');
    divBotoesFilha.setAttribute('class', 'div--botoes');
    btnEditarNota.setAttribute('class', 'btn');
    btnExcluirNota.setAttribute('class', 'btn');

    textArea.value = content;

    btnExcluirNota.innerHTML = "<i class='fa-solid fa-eraser'></i>";
    btnEditarNota.innerHTML = "<i class='fa-solid fa-pen-to-square'></i>";
    data.innerHTML = date;


    elementosDaPagina.localNotas().appendChild(nota);
    nota.appendChild(divBotoes);
    divBotoes.appendChild(data)
    divBotoes.appendChild(divBotoesFilha);
    divBotoesFilha.appendChild(btnEditarNota);
    divBotoesFilha.appendChild(btnExcluirNota);
    nota.appendChild(textArea);

    btnExcluirNota.addEventListener('click', function () {
        excluiNota(content)
        location.reload();
    })

    btnEditarNota.addEventListener('click', function () {
        editaNota(content)
    })
}

function excluiNota(data) {
    let arrayNotas = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    let index = arrayNotas.findIndex(x => x.content == data);
    arrayNotas.splice(index, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(arrayNotas));
    geraNotas('todas-notas');
}

function editaNota(content) {
    elementosDaPagina.textArea().value = content;
    excluiNota(content);
}

window.addEventListener('load', () => {
    geraNotas('todas-notas');
});

elementosDaPagina.btnSelecionaCategoria().addEventListener('click',function(){
    geraNotas(elementosDaPagina.inputSelecionaCategoria().value);
    elementosDaPagina.inputSelecionaCategoria().value = '';
});
