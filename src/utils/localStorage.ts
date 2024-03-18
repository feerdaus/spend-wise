export const getItem = <T>(key: Storage) => {
  try {
    if (typeof localStorage !== "undefined") {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) as T : undefined;
    } else {
      return undefined;
    }
  } catch (error) {
    return undefined;
  }
};

export const setItem = (key: Storage, itemPayload: any) => {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(key, JSON.stringify(itemPayload));
    }
  } catch (error) {}
};

export const removeItem = (key: Storage) => {
  try {
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(key);
    }
  } catch (error) {
    
  }
}

export enum Storage {
  GLOBAL = "global",
}
