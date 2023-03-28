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

const ONE_DAY = 60 * 60 * 24; 

export async function getChtGPT(userId: string) {
  const { ChatGPTAPI } = await import('chatgpt');

  let apiKey = await env._redis.hget(`conversation:${userId}`, 'apikey');
  if (!apiKey) {
    apiKey = await env._redis.lpop('conversation:apikey');
    await env._redis.hset(`conversation:${userId}`, { apikey: apiKey });
  }
  return new ChatGPTAPI({ apiKey, getMessageById: getMsgById, upsertMessage: storeMsg });
}


async function getMsgById(msgId: string): Promise<ChatMessage> {
  const msg = await env._redis.hgetall(`msg:${msgId}`);
  return msg as any;
}

async function storeMsg(message: ChatMessage) {
  await env._redis.hmset(`msg:${message.id}`, message as any);
  env._redis.expire(`msg:${message.id}`, ONE_DAY);
}