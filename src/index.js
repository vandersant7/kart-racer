const player1 = {
  NOME: 'Mario',
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
}

const player2 = {
  NOME: 'Luigi',
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
}

//Podemos usar o Math.floor para obter o mesmo resultado. Estamos somando + 1 para impedir que o resultado seja igual a 0
async function rollDice() {
  return Math.floor(Math.random() * 6) + 1
}

async function getRandomBlock() {
  let random = Math.random()
  let result

  switch (true) {
    case random < 0.33:
      result = 'RETA'
      break
    case random < 0.66:
      result = 'CURVA'
      break
    default:
      result = 'CONFRONTO'
  }

  return result
}

async function logRollResult(
  characterName,
  block,
  diceResult,
  attribute,
  itemSurprise = 0
) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} + ${itemSurprise} = ${
      diceResult + attribute + itemSurprise
    }`
  )
}

async function getSurpriseItem() {
  let randomItem = Math.random()
  let result

  switch (true) {
    case randomItem < 0.25:
      result = 'casco'
      break
    case randomItem < 0.5:
      result = 'bomba'
      break
    default:
      result = 'Nenhum item surpresa'
  }
  return result
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`)

    // sortear bloco
    let block = await getRandomBlock()
    console.log(`Bloco: ${block}`)

    //Rolar os dados
    let diceResult1 = await rollDice()
    let diceResult2 = await rollDice()

    //teste de habilidade
    let TotalTestSkill1 = 0
    let TotalTestSkill2 = 0

    if (block === 'RETA') {
      TotalTestSkill1 = diceResult1 + character1.VELOCIDADE
      TotalTestSkill2 = diceResult2 + character2.VELOCIDADE

      await logRollResult(
        character1.NOME,
        'velocidade',
        diceResult1,
        character1.VELOCIDADE
      )

      await logRollResult(
        character2.NOME,
        'velocidade',
        diceResult2,
        character2.VELOCIDADE
      )
    } else if (block === 'CURVA') {
      TotalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE
      TotalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE

      await logRollResult(
        character1.NOME,
        'manobrabilidade',
        diceResult1,
        character1.MANOBRABILIDADE
      )

      await logRollResult(
        character2.NOME,
        'manobrabilidade',
        diceResult2,
        character2.MANOBRABILIDADE
      )
    } else if (block === 'CONFRONTO') {
      let powerResult1 = diceResult1 + character1.PODER
      let powerResult2 = diceResult2 + character2.PODER

      console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`)

      let itemSurprise1 = await getSurpriseItem()
      let itemSurprise2 = await getSurpriseItem()

      let itemEffect1 = 0
      let itemEffect2 = 0

      if (itemSurprise1 === 'casco') {
        itemEffect1 = -1
        console.log(`${character1.NOME} foi atingido por um casco! 🐢`)
      } else if (itemSurprise1 === 'bomba') {
        itemEffect1 = -2
        console.log(`${character1.NOME} foi atingido por uma bomba! 💣`)
      }

      if (itemSurprise2 === 'casco') {
        itemEffect2 = -1
        console.log(`${character2.NOME} foi atingido por um casco! 🐢`)
      } else if (itemSurprise2 === 'bomba') {
        itemEffect2 = -2
        console.log(`${character2.NOME} foi atingido por uma bomba! 💣`)
      }

      await logRollResult(
        character1.NOME,
        'poder',
        diceResult1,
        character1.PODER,
        itemEffect1
      )

      await logRollResult(
        character2.NOME,
        'poder',
        diceResult2,
        character2.PODER,
        itemEffect2
      )

      powerResult1 += itemEffect1
      powerResult2 += itemEffect2

      //verificando o vencedor do confronto
      if (powerResult1 > powerResult2 && character2.PONTOS > 0 ? 1 : 0) {
        console.log(
          `${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`
        )
        character2.PONTOS--, character1.PONTOS++
      }

      if (powerResult2 > powerResult1 && character1.PONTOS > 0 ? 1 : 0) {
        console.log(
          `${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`
        )
        character1.PONTOS--, character2.PONTOS++
      }

      if (powerResult1 === powerResult2) {
        console.log('Confronto empatado. Nenhum ponto foi perdido.')
      }

    //   if (powerResult1 > powerResult2) {
    //     console.log(
    //       `${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`
    //     )
    //     if (character2.PONTOS > 0) {
    //       character2.PONTOS--
    //     }
    //     character1.PONTOS++
    //   } else if (powerResult2 > powerResult1) {
    //     console.log(
    //       `${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`
    //     )
    //     if (character1.PONTOS > 0) {
    //       character1.PONTOS--
    //     }
    //     character2.PONTOS++
    //   } else {
    //     console.log('Confronto empatado. Nenhum ponto foi perdido.')
    //   }
    }

    // verificando o vencedor das habilidades de velocidade ou manobrabilidade
    if (block === 'RETA' || block === 'CURVA') {
      if (TotalTestSkill1 > TotalTestSkill2) {
        console.log(`${character1.NOME} marcou um ponto!`)
        character1.PONTOS++
      } else if (TotalTestSkill2 > TotalTestSkill1) {
        console.log(`${character2.NOME} marcou um ponto!`)
        character2.PONTOS++
      }
    }

    console.log('______________________________________')
  }
}

async function declareWinner(character1, character2) {
  console.log('Resultado final:')
  console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`)
  console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`)

  // Quanto temos um if encadeado pontos eliminar as chaves deixando código mais limpo visualmente.
  if (character1.PONTOS > character2.PONTOS)
    console.log(`\n${character1.NOME} venceu a corrida! Parabéns!🏆`)
  else if (character2.PONTOS > character1.PONTOS)
    console.log(`\n${character2.NOME} venceu a corrida! Parabéns!🏆`)
  else console.log('A corrida terminou em empate')
}

//função auto-invocável
;(async function main() {
  console.log(
    `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n*`
  )
  await playRaceEngine(player1, player2)
  await declareWinner(player1, player2)
})()
