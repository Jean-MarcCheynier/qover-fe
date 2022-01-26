import { EnhancedStore } from '@reduxjs/toolkit';
import axios, { AxiosInstance } from 'axios';

export default class QoverAPI {
  private static instance: AxiosInstance;

  public static getInstance() {
    if (!this.instance) {
      this.instance = axios.create({
        baseURL: process.env.REACT_APP_QOVER_API_BASE_URL,
        timeout: 15000,
        headers: {
          accept: '*/*',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      });
    }
    return this.instance;
  }

  // Anti pattern
  public static initInterceptor(store: EnhancedStore) {
    this.getInstance().interceptors.request.use((req) => {
      const state = store.getState();
      const token = state.auth?.user?.access_token;
      if (req && req.headers) {
        req.headers.authorization = `Bearer ${token}`;
      }
      return req;
    });
  }
}
