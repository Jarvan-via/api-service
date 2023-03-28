import { getChtGPT } from '../dao/conversation';
import env from '../utils/env';

export async function conversation(userId: string, message: string) {
  const [
    chatGPT,
    pMessageId,
  ] = await Promise.all([
    getChtGPT(userId),
    env._redis.hget(`conversation:${userId}`, 'p_msg_id'),
  ]);

  console.log(pMessageId);
  const { id, text } = await chatGPT.sendMessage(message, { parentMessageId: pMessageId });
  env._redis.hset(`conversation:${userId}`, { p_msg_id: id });

  return text;
}