import produce from 'immer';
import {Action} from './middleware';
import {ContextType} from './Context';

export const AppReducer = produce((draft: ContextType, action: Action) => {
  switch (action.type) {
    case 'ADD_PARTNER':
      console.log(action);
      draft.partners?.push(action.value);
      return;
    default:
      return action.value;
  }
});
