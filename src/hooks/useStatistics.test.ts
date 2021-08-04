import {renderHook} from '@testing-library/react-hooks';
import {useStatistics} from './useStatistics';
import {usePartners} from './usePartners';
import {useLoginUser} from './useLoginUser';
import {Mode, Partner, Sex} from '../models';

jest.mock('./usePartners');
jest.mock('./useLoginUser');

describe('Usestatitsics.tests', () => {
  it('should create all time statistics', async () => {
    const mode = Mode.ALL_TIME;
    (usePartners as jest.Mock).mockReturnValue([[{}]]);
    (useLoginUser as jest.Mock).mockReturnValue([{sex: Sex.Male, age: 29}]);

    const {result} = renderHook(() => useStatistics(mode));

    expect(result.current[0]).toBe(5);
    expect(result.current[1]).toBe('85.96');
  });

  it('should create past year statistics', () => {
    const mode = Mode.ALL_TIME;
    const partner = new Partner();
    partner.startDate = new Date();
    (usePartners as jest.Mock).mockReturnValue([[partner]]);
    (useLoginUser as jest.Mock).mockReturnValue([{sex: Sex.Male, age: 29}]);

    const {result} = renderHook(() => useStatistics(mode));

    expect(result.current[0]).toBe(5);
    expect(result.current[1]).toBe('13.96');
  });
});
