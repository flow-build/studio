import type { RequestState, QueryConfig } from '@elastic/search-ui';
import { localApi } from 'services/localServer';
import { Logger } from 'utils';

class SearchUIConnector {
  constructor() {
    Logger.info('SearchUIConnector');
  }

  async onSearch(requestState: RequestState, queryConfig: QueryConfig) {
    const body = {
      requestState,
      queryConfig
    };

    const response = await localApi.post('/api/searchUI', body);

    return response.data;
  }
}

export default SearchUIConnector;
