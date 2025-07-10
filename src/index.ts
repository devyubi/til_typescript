function mergeArr<T, U>(arr1: T[], arr2: U[]): (T | U)[] {
  return [...arr1, ...arr2];
}

let result_1 = mergeArr([1, 2, 3], [6, 7, 3]);
let result_2 = mergeArr([1, 2, 3], ["a", "b", "c"]);
let result_3 = mergeArr([1, 2, 3], [6, 7, 3]);
