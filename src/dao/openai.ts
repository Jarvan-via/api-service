import env from '../utils/env';
import { Configuration, OpenAIApi } from 'openai';
import { random } from 'lodash';

export const getOpenAIClient = async (requestType: string) => {
  const apiKey = await getApiKey(requestType);

  const configuration = new Configuration({ apiKey });
  const openai = new OpenAIApi(configuration,);
  return { apiKey, openai };
};



export async function getApiKey(requestType: string) {
  const apiKeys = await env._redis.lrange(`api-key:${requestType}`, 0, -1);
  return apiKeys[random(apiKeys.length - 1)];
}