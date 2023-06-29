import { default as api } from 'services/httpClient';

const metabaseApi = api();

metabaseApi.setBaseUrl('');

export { metabaseApi };
