import api from './api';
import { Category } from '../models';

const categoriesUrl = '/categories';

export const listAllCategories = () => {
  return api.get<Category[]>(categoriesUrl);
};
