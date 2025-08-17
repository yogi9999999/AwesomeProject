import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  asks: [],
  bids: [],
  precision: 'P0',
  scale: 1,
  connected: false,
  channelId: null,
};

function mergeBook(sideArr, updates){
  const map = new Map(sideArr.map(i => [i.price, i]));
  updates.forEach(([price, count, amount]) => {
    const p = Number(price);
    if (count === 0) {
      map.delete(p);
    } else {
      map.set(p, { price: p, count, amount });
    }
  });
  const merged = Array.from(map.values()).sort((a,b)=> a.price - b.price);
  return merged;
}

const slice = createSlice({
  name: 'orderbook',
  initialState,
  reducers: {
    connected(state, action){
      state.connected = true;
      state.channelId = action.payload.channelId || state.channelId;
    },
    disconnected(state){
      state.connected = false;
      state.channelId = null;
    },
    snapshot(state, action){
      const data = action.payload;
      const bids = [];
      const asks = [];
      data.forEach(item => {
        const [price, count, amount] = item;
        if (amount > 0) bids.push({price, count, amount});
        else asks.push({price, count, amount: Math.abs(amount)});
      });
      state.bids = bids.sort((a,b)=> b.price - a.price);
      state.asks = asks.sort((a,b)=> a.price - b.price);
    },
    update(state, action){
      const [price, count, amount] = action.payload;
      if (amount > 0){
        state.bids = mergeBook(state.bids, [[price, count, amount]]).sort((a,b)=> b.price - a.price);
      } else {
        state.asks = mergeBook(state.asks, [[price, count, Math.abs(amount)]]).sort((a,b)=> a.price - b.price);
      }
    },
    setPrecision(state, action){ state.precision = action.payload; },
    setScale(state, action){ state.scale = action.payload; },
    reset(state){
      state.asks = [];
      state.bids = [];
      state.channelId = null;
      state.connected = false;
    }
  }
});

export const { connected, disconnected, snapshot, update, setPrecision, setScale, reset } = slice.actions;
export default slice.reducer;