import { AxiosPromise } from 'axios';
import { User } from '../../@types/user';
import QoverAPI from '../../app/axios';

const axiosInstance = QoverAPI.getInstance();

export type LoginPayload = {
  username: string,

  password: string,
}

export function login(payload: LoginPayload): AxiosPromise<User> {
  return axiosInstance({
    method: 'post',
    url: '/auth/login',
    data: payload,
  }).catch((e) => {
    let errorMessage = 'Unable to reach the server';
    if (e.response) {
      switch (e.response.status) {
        case 400: errorMessage = 'signin.form.error.400';
          break;
        default: errorMessage = 'signin.form.error.default';
          break;
      }
    }
    const err = new Error(errorMessage);
    throw err;
  });
}
