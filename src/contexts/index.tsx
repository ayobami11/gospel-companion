'use client'

import { createContext, useContext, useReducer } from "react";

import { reducer, initialState } from '@/reducers';

import type { State } from "@/reducers";

import type { Actions } from "@/actions";

const AppContext = createContext<AppContextType | null>(null);

export interface AppContextType {
    state: State,
    dispatch: React.Dispatch<Actions>
};

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext);

    if (context === null) {
        throw new Error('AppContext does not have a valid value.');
    }

    return context;
}