import EventEmitter from 'eventemitter3';

const BITFINEX_WS = 'wss://api-pub.bitfinex.com/ws/2';

class WSService extends EventEmitter {
  private ws: WebSocket | null;
  private reconnectDelay: number;
  private shouldReconnect: boolean;
  private channelId: number | null;
  private symbol: string | null;
  private precision: string;

  constructor(){
    super();
    this.ws = null;
    this.reconnectDelay = 1000;
    this.shouldReconnect = true;
    this.channelId = null;
    this.symbol = null;
    this.precision = 'P1';
  }

  connect(symbol = 'tBTCUSD', precision = 'P1'){
    this.symbol = symbol;
    this.precision = precision;
    this.shouldReconnect = true;
    this._open();
  }

  updatePrecision(precision: string) {
    this.precision = precision;
  }

  disconnect(){
    this.shouldReconnect = false;
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  _open(){
    if (this.ws) return;
    this.ws = new WebSocket(BITFINEX_WS);

    this.ws.onopen = ()=>{
      this.reconnectDelay = 1000;
      const subscribe = {
        event: 'subscribe',
        channel: 'book',
        symbol: this.symbol,
        prec: this.precision,
        freq: 'F0',
        len: 25
      };
              if (this.ws) {
          this.ws.send(JSON.stringify(subscribe));
        }
      this.emit('open');
    };

    this.ws.onmessage = (msgEvent)=>{
      try{
        const data = JSON.parse(msgEvent.data);
        if (data.event === 'subscribed' && data.channel === 'book'){
          this.channelId = data.chanId;
          this.emit('subscribed', data);
          return;
        }
        if (Array.isArray(data)){
          const [chanId, payload] = data;
          if (payload === 'hb') return;
          if (Array.isArray(payload[0])){
            this.emit('snapshot', payload);
          } else {
            this.emit('update', payload);
          }
        }
      }catch(e){
        console.warn('ws parse error', e);
      }
    };

    this.ws.onerror = (e)=>{
      this.emit('error', e);
    };

    this.ws.onclose = ()=>{
      this.ws = null;
      this.emit('close');
      if (this.shouldReconnect) {
        setTimeout(()=>{
          this.reconnectDelay = Math.min(30000, this.reconnectDelay * 1.5);
          this._open();
        }, this.reconnectDelay);
      }
    };
  }
}

export default new WSService();

let currentWsService: WSService | null = null;

export function connectOrderBook(dispatch: any, symbol: string, precision: string) {
  if (currentWsService) {
    currentWsService.disconnect();
  }
  
  currentWsService = new WSService();
  currentWsService.connect(symbol, precision);
  
  currentWsService.on('open', () => {
    dispatch({ type: 'orderbook/connected', payload: { channelId: null } });
  });
  
  currentWsService.on('subscribed', (data) => {
    dispatch({ type: 'orderbook/connected', payload: { channelId: data.chanId } });
  });
  
  currentWsService.on('snapshot', (data) => {
    dispatch({ type: 'orderbook/snapshot', payload: data });
  });
  
  currentWsService.on('update', (data) => {
    dispatch({ type: 'orderbook/update', payload: data });
  });
  
  currentWsService.on('close', () => {
    dispatch({ type: 'orderbook/disconnected' });
  });
  
  currentWsService.on('error', () => {
    dispatch({ type: 'orderbook/disconnected' });
  });
  
  return currentWsService;
}

export function disconnectOrderBook() {
  if (currentWsService) {
    currentWsService.disconnect();
    currentWsService = null;
  }
}

export function updateOrderBookPrecision(precision: string) {
  if (currentWsService) {
    currentWsService.updatePrecision(precision);
  }
}