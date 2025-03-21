// Funções é um bloco de código que tem coo preocupação a reutilização deste
// A ideia principal, é fazer valer a modularidade e a simplicidade das características de um algoritmo
// function NomeFuncao (atributo) { script que será usado }
// cleanCode: código limpo - Não repetir códigos, as variáveis e funções devem ter nomes apropriados para o uso/ os espaçamentos devem seguir as boas práticas/ e trazer a documentação necessária para ser manutenível

function saudar(){
    alert("Olá, lindo dia para nós! ")
    alert("galera, energias mega positivas para lindo lindo e Israel!")
}

//soma de dois valores
function soma(a, b){
    return a + b;
}

function somarVarios(a = 0, b = 0, c = 0, d = 0){
    return a + b + c + d
}

function coverterMaiusculo(texto){
    return texto.toUpperCase();
}

// para saber a quantidade de caracteres de uma palavra/frase
function qtdCaractere(frase){
    return frase.length;
}

//limpa espaços da frase
function limparEspacos(frase){
    return frase.trim();
}

// Para fazer uma função ser executada temos que chamá-la
saudar()

//chamado a função soma
let resultado = soma(10,20)
document.writeln(`<p> ${resultado}`)

let resultadoVarios = somarVarios(10, 20, 5)
document.writeln(`<p> Soma vários ${resultadoVarios}`)

let frase = prompt("Informe uma frase")
let fraseGrande = coverterMaiusculo(frase)
document.write(`<p> Frase grandeeeeee: ${fraseGrande}`)

let quantidade = qtdCaractere(frase)
document.write(`<p> quantidade de letras: ${quantidade}`)

let limpo = limparEspacos(frase)
document.write(`<p> Texto limpo: ${limpo}`)

let h1 = window.document.getElementsByTagName('h1')[1];
h1.style.color = 'blue';

let corpo = window.document.body;
corpo.style.background = 'beige';

//mudar cor da div
function mudarCor(){
    let div = document.getElementById("minhaDiv");
    if(div.style.backgroundColor == 'purple'){
        div.style.backgroundColor = 'green'
    }else{
        div.style.backgroundColor = 'purple'
    }
}