export function generateExpirationDate() {
  return new Date().getTime() + 50 * 60 * 1000
}
