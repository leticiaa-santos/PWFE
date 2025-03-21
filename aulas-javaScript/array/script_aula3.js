// variáveis: espaços em memória que armazenam valores
// let, const, var
// escopo diz respeito a como eu vou usar as variáveis criadas
// quando criada uma variável dentro de uma função, ela é usada somente dentro dela
// outro tippo de variável é o Array (conjunto de dados numa mesma variável)

// Usando os "[]" eu posso criar esse array, começando em "0" 
let numeros = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]

// para saber os índices do array
for(let indice in numeros){
    document.write(indice)
}

//para ver os valores armazenados no índice
for(let valor of numeros){
    document.write(`${valor}, `)
}

// forEach é uma função para a manipulação de uma array
numeros.forEach(function(valor){
    document.write(`<p>${valor} `)
})

//inserir um elemento no final da lista
numeros.push(60)
document.write(`${numeros} <p> `)

//inserir no início do Array
numeros.unshift(0)
document.write(`${numeros} <p>`)

//excluir no inicio do array
numeros.shift()
document.write(`${numeros} <p>`)

//excluir no final do Array
numeros.pop()
document.write(`${numeros} <p>`)

//funções callback: eu interajo com o meu array, trato a informação e guardo o resultado em um anova variável (array)
//MAP: percorro todo o array, faço alguma coisa com o valor e guardo na variável de retorno (funcao callback)
let numerosDobrados = numeros.map(function(numero){
    return numero * 2
})
document.write(`${numerosDobrados} <p>`)

//filter: percorre o array, e guarda no array de retorno o valor correspondente a uma condição
//retornar todos os valores do array que sejam divisivel por 3
let numerosDiv3 = numeros.filter(function(numero){
    return numero % 3 === 0
})
document.write(`${numerosDiv3} <p>`)

//Find: percorro o array e paro assim que achar o que eu procuro 
let primeiroPar = numeros.find(function(numero){
    return numero % 2 === 0
})
document.write(`${primeiroPar} <p>`)