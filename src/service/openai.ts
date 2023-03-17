import { getOpenAIClient } from '../dao/openai';
import { getLogger } from '../utils/logger';

const log = getLogger('openai-service');

export async function getCompetition(prompt: string, requestType: string) {
  if (!prompt) return '';
  const { apiKey, openai } = await getOpenAIClient(requestType);
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-002',
      prompt: `${prompt}?`,
      // temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      // TODO
      user: '',
      // stream: true
    });

    const r = (response.data.choices[0].text) as string;
    return r.trim();
  } catch (error) {
    log.error({ error: error.response?.data, apiKey });
    return 'something wrong';
  }
}

export async function getChatCompletion(prompt: string, requestType: string): Promise<string> {
  if (!prompt) return '';
  const { apiKey, openai } = await getOpenAIClient(requestType);
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'user',
        content: prompt,
      }],
      // temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      user: '',
      // stream: true
    });

    const r = (response.data.choices[0].message.content) as string;

    return r.trim();
  } catch (error) {
    log.error({ error: error.response, apiKey });
    return 'something wrong';
  }
}

export async function imageGenerations(prompt: string, requestType: string) {
  if (!prompt) return '';
  const { apiKey, openai } = await getOpenAIClient(requestType);

  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '256x256',
      response_format: 'url',
    });

    return response.data.data[0].url;
  } catch (error) {
    log.error({ error: error.response, apiKey });
    return 'something wrong';
  }

}