import { kv } from '@vercel/kv';
export default async function handler(req, res) {
  let state = await kv.get('tempest_state') || { balance: 10000, trades: [], profit: 0, isAuto: true };
  return res.json(state);
}
