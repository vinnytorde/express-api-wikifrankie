export const toPrettyDate = value => {
  const date = new Date(value)
  return date.toLocaleDateString()
}
