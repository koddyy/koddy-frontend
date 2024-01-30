export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export const getEntries = <T extends object>(obj: T) => {
  return Object.entries(obj) as Entries<T>;
};

export type Keys<T> = (keyof T)[];

export const getKeys = <T extends object>(obj: T) => {
  return Object.keys(obj) as Keys<T>;
};
