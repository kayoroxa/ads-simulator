var stringSimilarity = require('string-similarity')

const notion = `
desqualificar = disqualify
reclassificar = reclassify
desclassificar = declassify
diversificar = diversify
intensificar = intensify
exemplificar = exemplify
desmistificar = demystify
personificar = personify
eletrificar = electrify
identificar = identify
simplificar = simplify
classificar = classify
solidificar = solidify
santificar = sanctify
frutificar = fructify
qualificar = qualify
justificar = justify
significar = signify
certificar = certify
amplificar = amplify
fortificar = fortify
glorificar = glorify
falsificar = falsify
liquidificar = liquify
metrificar = metrify
verbalizar = verbify
modificar = modify
verificar = verify
notificar = notify
purificar = purify
codificar = codify
`

const notionSplitted = notion
  .split('\n')
  .filter(v => v.length > 0)
  .map(line => line.split(' = '))

function agrupar() {
  const agrupados = []

  notionSplitted.forEach(line => {
    const [pt, en] = line

    if (!agrupados.map(v => v.join(' ')).includes(line.join(' '))) {
      agrupados.push(line)
    }

    const todosEngNotInAgrupados = notionSplitted.filter(line => {
      return !agrupados.map(v => v.join(' ')).includes(line.join(' '))
    })
    if (todosEngNotInAgrupados.length === 0) return

    const oMaisParecido = stringSimilarity.findBestMatch(
      en,
      todosEngNotInAgrupados.map(v => v[1])
    ).bestMatch

    const oMaisParecidoLine = notionSplitted.find(
      line => line[1] === oMaisParecido.target
    )

    agrupados.push(oMaisParecidoLine)
  })

  return agrupados
}

const notionAgrupados = agrupar()
  .map(line => line.join(' = '))
  .join('\n')

console.log(notionAgrupados)
