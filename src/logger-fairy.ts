export function log(msg: unknown) {
  const style = `
    color: green;
  `
  console.log(`%c${msg}`, style)
}

export function error(msg: unknown) {
  const style = `
    color: red;
  `
  console.log(`%c${msg}`, style)
}
