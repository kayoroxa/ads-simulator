const _ = require('lodash')

function getOscilatron(
  views,
  media,
  { minOscilatron = 0.1, maxOscilatron = 1, viewsStabilization = 10000 }
) {
  const result =
    ((viewsStabilization - views) / viewsStabilization) *
      (maxOscilatron - minOscilatron) +
    minOscilatron

  const resultNotZero = result > 0 ? result : minOscilatron
  const distance = media * resultNotZero
  return {
    result: resultNotZero,
    distance,
    generate: () => _.random(media - distance, media + distance),
  }
}

export default getOscilatron
// module.exports = getOscilatron

// const media = 100

// let views = 0
// console.log(
//   getOscilatron(10000, 2, {
//     minOscilatron: 0.1,
//     maxOscilatron: 2.5,
//     viewsStabilization: 100,
//   }).generate()
// )
