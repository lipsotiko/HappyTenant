export const rnd = (num) => (Math.round(((num / 100) + Number.EPSILON) * 100) / 100).toFixed(2)
export const rnd2 = (num) => (Math.round(((num) + Number.EPSILON) * 100) / 100).toFixed(2)
