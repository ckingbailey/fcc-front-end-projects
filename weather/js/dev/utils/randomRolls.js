export default function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function randomFlt(min, max) {
  return Math.random() * (max - min) + min;
}
