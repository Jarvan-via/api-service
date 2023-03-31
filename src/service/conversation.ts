import moment from 'moment';
import { getChtGPT } from '../dao/conversation';
import env from '../utils/env';

export async function conversation(userId: string, message: string) {
  const [
    chatGPT,
    pMessageId,
  ] = await Promise.all([
    getChtGPT(userId),
    env._redis.get(`conversation:msg:${userId}`),
  ]);

  const { id, text } = await chatGPT.sendMessage(message, { parentMessageId: pMessageId });
  const duration = moment().endOf('d').unix() - moment().unix();
  env._redis.set(`conversation:msg:${userId}`, id, 'EX',  duration);

  return text;
}