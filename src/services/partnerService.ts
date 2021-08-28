import {Partner} from '../models/partner';
import {addPartnerFetch} from '../fetch/partners';

export const syncPartner = (
  partner: Partner,
  userId: string,
): Promise<Partner> => {
  if (!partner.synced && userId) {
    try {
      addPartnerFetch(partner, userId).then(result => {
        if (result.ok) {
          return Promise.resolve(Partner.create(partner).withSynced());
        }
      });
    } catch (e) {
      console.error(e);
    }
  }
  return Promise.resolve(partner);
};
