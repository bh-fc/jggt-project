export function checkIsImage(str: string) {
  return /^data:image/.test(str) || /^https:\/\//.test(str)
}
