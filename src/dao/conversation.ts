import { random } from 'lodash';
import moment from 'moment';
import env from '../utils/env';

interface ChatMessage {
  id: string;
  text: string;
  role: Role;
  name?: string;
  delta?: string;
  detail?: any;
  parentMessageId?: string;
  conversationId?: string;
}

type Role = 'user' | 'assistant' | 'system';


export async function getChtGPT(userId: string) {
  const { ChatGPTAPI } = await import('chatgpt');

  let apiKey = await env._redis.hget(`conversation:${userId}`, 'apikey');
  if (!apiKey) {
    const apiKeys = await env._redis.lrange('conversation:apikey', 0, -1);
    apiKey = apiKeys[random(0, apiKeys.length - 1)];
    await env._redis.hset(`conversation:${userId}`, { apikey: apiKey });
  }
  return new ChatGPTAPI({ 
    apiKey, 
    completionParams: {
      model: 'gpt-3.5-turbo-16k',
    },
    getMessageById: getMsgById, 
    upsertMessage: storeMsg });
}


async function getMsgById(msgId: string): Promise<ChatMessage> {
  const msg = await env._redis.hgetall(`msg:${msgId}`);
  return msg as any;
}

async function storeMsg(message: ChatMessage) {
  await env._redis.hmset(`msg:${message.id}`, message as any);
  const duration = moment().endOf('d').unix() - moment().unix();
  env._redis.expire(`msg:${message.id}`, duration);
}