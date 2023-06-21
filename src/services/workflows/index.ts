import api from '../httpClient';

export const getWorkflows = async () => await api.get('/workflows');
