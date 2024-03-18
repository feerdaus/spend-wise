"use client";
import { Storage, getItem, setItem } from "@/utils/localStorage";
import { Dispatch, FC, ReactNode, createContext, useReducer } from "react";

export enum GlobalActionValues {
  SET_START_DATE = "SET_START_DATE",
  SET_END_DATE = "SET_END_DATE",
}

export interface GlobalValues {
  startDate: string;
  endDate: string;
}

export interface GlobalActions<T = any> {
  type: GlobalActionValues;
  payload?: T;
}

export interface GlobalContext {
  state: GlobalValues;
  dispatch: Dispatch<GlobalActions>;
}

const defaultValues: GlobalValues = {
  startDate: new Date(new Date().setDate(1)).toISOString(),
  endDate: new Date(new Date().setDate(31)).toISOString(),
};

const GlobalContext = createContext<GlobalContext>({
  state: defaultValues,
  dispatch: () => null,
});

export default GlobalContext;

interface GlobalContextProvider {
  children: ReactNode;
}

const reducer = (state: GlobalValues, action: GlobalActions) => {
  switch (action.type) {
    case GlobalActionValues.SET_START_DATE:
      const newState = { ...state, startDate: action.payload };
      setItem(Storage.GLOBAL, newState);
      return newState;
    case GlobalActionValues.SET_END_DATE:
      const newEndDateState = { ...state, endDate: action.payload };
      setItem(Storage.GLOBAL, newEndDateState);
      return newEndDateState;
    default:
      return state;
  }
};

export const GlobalContextProvider: FC<GlobalContextProvider> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    reducer,
    getItem<GlobalValues>(Storage.GLOBAL) || defaultValues
  );

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
