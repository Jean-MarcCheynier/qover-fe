import { AxiosPromise } from 'axios';
import { Catalog } from '../../@types/Catalog';
import QoverAPI from '../../app/axios';

// A mock function to mimic making an async request for data
const axiosInstance = QoverAPI.getInstance();

export function getAllCover(): AxiosPromise<Catalog> {
  return axiosInstance.get('/car');
}

export function getCoverById(id: string): AxiosPromise<Catalog> {
  return axiosInstance.get(`/car/${id}`);
}
