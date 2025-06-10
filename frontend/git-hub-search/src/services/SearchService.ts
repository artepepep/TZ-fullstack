import api from '../config/api'
import { API_ENDPOINTS } from '../constants/api';
import { EntityType } from '../types/common';
import { SearchResponseT } from '../types/search';

class SearchService {
    public async search<T>({
      page = '1', 
      value = null, 
      type = EntityType.REPOSITORIES,
    }:{
      page: string | null;
      value: null | string;
      type: EntityType;
    }): Promise<SearchResponseT<T>> {
      const result = await api.get(API_ENDPOINTS.SEARCH, { params: { page, value, type } })
      return result.data
    }
}

const searchService = new SearchService();

export default searchService;