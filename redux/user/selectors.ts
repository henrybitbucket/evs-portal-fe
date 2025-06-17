import { key } from './';
import { IUserState } from './reducer';

export const getReducer = (state): IUserState => state[key];
