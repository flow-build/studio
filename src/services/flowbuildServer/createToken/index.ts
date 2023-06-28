import { flowbuildApi } from 'services/flowbuildServer';

export async function createToken(userId: string) {
  return await flowbuildApi.post('/token', {
    user_id: userId
  });
}
