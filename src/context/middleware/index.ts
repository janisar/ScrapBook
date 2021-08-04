import {Dispatch} from 'react';
import {ContextType} from '../Context';

type ActionType = 'ADD_PARTNER' | 'SAVE_PROFILE';

export type Action = {
  type: ActionType;
  value: any;
};

export const makeMiddleware =
  (dispatch: Dispatch<Action>, state: ContextType) => (action: Action) => {
    switch (action.type) {
      case 'ADD_PARTNER':
      default:
        dispatch(action);
    }
  };
