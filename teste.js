const lista = []

function meuJogador(nome) {
  let life = 100

  return {
    nome,
    add: () => life++,
    life: () => life,
  }
}

lista.push(meuJogador('caio'), meuJogador('bruno'))

lista[0].add()

console.log(lista[0].life())
