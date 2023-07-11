import { apiConfig } from 'config/api';
import { default as api } from 'services/httpClient';

const flowbuildApi = api();
console.log('BaseURL: ', apiConfig.baseUrl)

flowbuildApi.setBaseUrl(apiConfig.baseUrl ?? '');

export { flowbuildApi };
