import { apiConfig } from 'config/api';
import { default as api } from 'services/httpClient';

const flowbuildApi = api();

flowbuildApi.setBaseUrl(apiConfig.baseUrl ?? '');

export { flowbuildApi };
