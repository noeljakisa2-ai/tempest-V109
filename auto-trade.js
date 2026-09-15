// TEMPEST V109.7 - CLOUD ENGINE - Trades while phones are OFF
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  // Get current cloud balance
  let state = await kv.get('tempest_state') || { balance: 10000, trades: [], profit: 0, isAuto: true };
  
  if(!state.isAuto) return res.json({ status: 'paused' });

  // Simple Gold strategy - runs in cloud
  const goldPrice = 4292 + (Math.random() - 0.5) * 10; // Replace with real price API
  const signal = Math.random() > 0.5 ? 'BUY' : 'SELL';
  const profit = (Math.random() * 20 - 5); // Simulated profit

  state.balance += profit;
  state.profit += profit;
  state.trades.unshift({ time: new Date().toISOString(), signal, price: goldPrice.toFixed(2), profit: profit.toFixed(2) });
  state.trades = state.trades.slice(0, 50);

  await kv.set('tempest_state', state);
  
  return res.json({ status: 'traded', state });
}
