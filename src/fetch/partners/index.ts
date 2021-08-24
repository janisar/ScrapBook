import {get, post, del} from '../post';
import {Partner} from '../../models/partner';

const AddPartnerEndpoint =
  'https://cxcnyn3v82.execute-api.ap-southeast-2.amazonaws.com/dev';

const GetPartnersEndpoint =
  'https://txa20dv48i.execute-api.ap-southeast-2.amazonaws.com/dev/';

export const addPartnerFetch = (
  partner: Partner,
  userId: string,
): Promise<Response> => {
  return post(AddPartnerEndpoint, {...partner, userId: userId});
};

export const getAllPartnersFetch = async (id: string): Promise<any> => {
  const response = await get(GetPartnersEndpoint + '?id=' + id);
  if (response.ok) {
    return response.json();
  }
};

export const removePartner = async (id?: string): Promise<any> => {
  const response = await del(AddPartnerEndpoint + '/' + id);
  console.log(response);
}
