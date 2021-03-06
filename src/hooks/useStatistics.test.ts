import {renderHook} from '@testing-library/react-hooks';
import {useStatistics} from './useStatistics';
import {useLoginUser} from './useLoginUser';
import {Mode, Sex} from '../models';
import {Partner} from '../models/partner';

jest.mock('./usePartners');
jest.mock('./useLoginUser');

describe('Usestatitsics.tests', () => {
  it('should create all time statistics', async () => {
    const mode = Mode.ALL_TIME;
    (useLoginUser as jest.Mock).mockReturnValue([{sex: Sex.Male, age: 29}]);

    const {result} = renderHook(() => useStatistics(mode));

    expect(result.current[0]).toBe(5);
    expect(result.current[1]).toBe('85.96');
  });

  it('should create past year statistics', () => {
    const mode = Mode.ALL_TIME;
    const partner = new Partner();
    partner.startDate = new Date();
    (useLoginUser as jest.Mock).mockReturnValue([{sex: Sex.Male, age: 29}]);

    const {result} = renderHook(() => useStatistics(mode));

    expect(result.current[0]).toBe(5);
    expect(result.current[1]).toBe('13.96');
  });
});
