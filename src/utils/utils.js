export function intersection(first, second) {
  return first.filter(element => second.indexOf(element) > -1);
}
