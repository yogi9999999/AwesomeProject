export function formatPrice(price, precision){
  const pMap = { P0: 0, P1: 1, P2: 2, P3: 3 };
  const p = pMap[precision] ?? 1;
  return Number(price).toFixed(p);
}