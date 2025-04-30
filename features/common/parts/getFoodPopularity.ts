export const getRatingFromPopularity = (popularity: number): number => {
  const min = 0
  const max = 1000

  if (popularity <= min) return 1
  if (popularity >= max) return 5

  const rating = ((popularity - min) / (max - min)) * 4 + 1
  return parseFloat(rating.toFixed(1))
}
