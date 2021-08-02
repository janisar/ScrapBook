import {SelectItem} from '../../models';
import {UserField} from '../../hooks/useLoginUser';

type RegisterSteps = 'login' | 'age' | 'sex' | 'dating';
type HistorySteps = 'relationship' | 'name' | 'duration' | 'startDate';

export interface ScrollViewPage {
  title: string;
  action?: string;
  options?: SelectItem[];
  placeholder?: string;
}

export interface RegisterPage extends ScrollViewPage {
  type: RegisterSteps;
  field?: UserField;
}

export interface HistoryPage extends ScrollViewPage {
  type: HistorySteps;
}
