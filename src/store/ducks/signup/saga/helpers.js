export function generateExpirationDate(seconds = 3000) {
  return new Date().getTime() + seconds * 1000
}
