import {ILoginFormFields} from './loginForm';

export interface LoginResponse extends ILoginFormFields {
  jwt: string;
}
