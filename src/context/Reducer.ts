import produce from 'immer';
import {Action} from './middleware';
import {ContextType} from './Context';
import {retrieveData, storeData} from '../storage/AsyncStorage';
import {Partner} from '../models';
import {partnersAsyncStorageKey} from './reducers/partnerReducer';
import {userKey} from '../hooks/useLoginUser';

async function storePartner(partner: Partner) {
  let asyncPartners = await retrieveData<Partner[]>(partnersAsyncStorageKey);
  if (!asyncPartners) {
    asyncPartners = [];
  }
  asyncPartners.push(partner);
  await storeData(partnersAsyncStorageKey, asyncPartners);
}

export const AppReducer = produce((draft: ContextType, action: Action) => {
  switch (action.type) {
    case 'SAVE_PROFILE':
      storeData(userKey, action.value);
      draft.profile = action.value;
      return;
    case 'ADD_PARTNER':
      storePartner(action.value);
      draft.partners?.push(action.value);
      return;
    default:
      return action.value;
  }
});
