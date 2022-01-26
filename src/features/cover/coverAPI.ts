import { AxiosPromise } from 'axios';
import { CatalogItem } from '../../@types/Catalog';
import QoverAPI from '../../app/axios';

// A mock function to mimic making an async request for data
const axiosInstance = QoverAPI.getInstance();

export function getAllCover(): AxiosPromise<CatalogItem[]> {
  return axiosInstance.get('/car');
}

export function getCoverById(id: string): AxiosPromise<CatalogItem> {
  return axiosInstance.get(`/car/${id}`);
}
