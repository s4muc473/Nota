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
}

function criaNota() {
    if (!elementosDaPagina.textArea().value) {
        alert("DIGITE O CONTEUDO DA NOTA");
    } else {
        arrayNotas.unshift({
            content: elementosDaPagina.textArea().value,
            date: dataFormatadaFinal,
        })
        localStorage.setItem(localStorageKey, JSON.stringify(arrayNotas));
        geraNotas()
        elementosDaPagina.textArea().value = '';
    }
}

function geraNotas() {
    if (arrayNotas) {
        elementosDaPagina.localNotas().innerHTML = '';
        for (let iterador = 0;iterador < arrayNotas.length;iterador++) {
            let nota = document.createElement('div');
            let divBotoes = document.createElement('div');
            let divBotoesFilha = document.createElement('div');
            let data = document.createElement('div');
            let btnExcluirNota = document.createElement('div');
            let btnEditarNota = document.createElement('div');
            let textArea = document.createElement('textarea');
        
            nota.setAttribute('class','nota');
            divBotoes.setAttribute('class','div--botoes--principal');
            divBotoesFilha.setAttribute('class','div--botoes');
            btnEditarNota.setAttribute('class','btn');
            btnExcluirNota.setAttribute('class','btn');

            textArea.value = arrayNotas[iterador].content;

            btnExcluirNota.innerHTML = "<i class='fa-solid fa-eraser'></i>";
            btnEditarNota.innerHTML = "<i class='fa-solid fa-pen-to-square'></i>";
            data.innerHTML = arrayNotas[iterador]['date'];
        
        
            elementosDaPagina.localNotas().appendChild(nota);
            nota.appendChild(divBotoes);
            divBotoes.appendChild(data)
            divBotoes.appendChild(divBotoesFilha);
            divBotoesFilha.appendChild(btnEditarNota);
            divBotoesFilha.appendChild(btnExcluirNota);
            nota.appendChild(textArea);

            console.log(arrayNotas[iterador].content)

            btnExcluirNota.addEventListener('click',function(){
                excluiNota(arrayNotas[iterador]['content'])
            })

            btnEditarNota.addEventListener('click',function(){
                editaNota(arrayNotas[iterador]['content'])
            })
        }
    } else {
        let arrayNotas = JSON.parse(localStorage.getItem(localStorageKey)||'[]');
    }
}

function excluiNota(data) {
    let arrayNotas = JSON.parse(localStorage.getItem(localStorageKey)||'[]');
    let index = arrayNotas.findIndex(x => x.data == data);
    arrayNotas.splice(index, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(arrayNotas));

    location.reload()
}

function editaNota(content) {
    elementosDaPagina.textArea().value = content;
}

window.addEventListener('load',geraNotas);