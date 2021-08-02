import React, {
  createContext,
  FunctionComponent,
  useEffect,
  useReducer,
} from 'react';
import {Partner} from '../models';
import {AppReducer} from './Reducer';
import {Action, makeMiddleware} from './middleware';
import {User} from '../hooks/useLoginUser';
import {immerable} from 'immer';

export type ContextType = {
  partners: Partner[];
  profile?: User;
};

const defaultContext: ContextType = {
  partners: [],
  profile: undefined,
  [immerable]: true,
} as ContextType;

const defaultDispatch: (dispatch: Action) => void = () => {};

const AppState = createContext(defaultContext);
const AppDispatch = createContext(defaultDispatch);

const AppStateProvider: FunctionComponent = ({children}) => {
  const [state, dispatch] = useReducer(AppReducer, defaultContext);

  const middleware = makeMiddleware(dispatch, state);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppState.Provider value={state}>
      <AppDispatch.Provider value={middleware}>{children}</AppDispatch.Provider>
    </AppState.Provider>
  );
};

export {AppStateProvider, AppState, AppDispatch};
