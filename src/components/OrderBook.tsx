import React, { useEffect, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Controls from './Controls';
import OrderRow from './OrderRow';
import { connectOrderBook, disconnectOrderBook, updateOrderBookPrecision } from '../services/wsService';
import { setPrecision, setScale } from '../store/orderbookSlice';

export default function OrderBook({ symbol }) {
  const dispatch = useDispatch();
  const { bids, asks, precision, scale, connected } = useSelector((state) => state.orderbook);

  useEffect(() => {
    connectOrderBook(dispatch, symbol, precision);
    return () => disconnectOrderBook();
  }, [symbol]);

  const handleSetPrecision = (newPrecision) => {
    dispatch(setPrecision(newPrecision));
    updateOrderBookPrecision(newPrecision);
  };

  const handleSetScale = (newScale) => {
    dispatch(setScale(newScale));
  };

  const handleConnect = () => {
    connectOrderBook(dispatch, symbol, precision);
  };

  const handleDisconnect = () => {
    disconnectOrderBook();
  };

  const { bidsWithTotal, asksWithTotal, maxBidSize, maxAskSize } = useMemo(() => {
    let bidTotal = 0;
    const bidsWithTotal = bids.map(bid => {
      bidTotal += Math.abs(bid.amount);
      return { ...bid, total: bidTotal };
    });

    let askTotal = 0;
    const asksWithTotal = asks.map(ask => {
      askTotal += Math.abs(ask.amount);
      return { ...ask, total: askTotal };
    });

    const maxBidSize = bidsWithTotal.length > 0 ? Math.max(...bidsWithTotal.map(bid => bid.total)) : 0;
    const maxAskSize = asksWithTotal.length > 0 ? Math.max(...asksWithTotal.map(ask => ask.total)) : 0;

    return { bidsWithTotal, asksWithTotal, maxBidSize, maxAskSize };
  }, [bids, asks]);

  const renderHeader = () => (
    <View style={styles.headerRow}>
      <View style={styles.headerLeft}>
        <Text style={styles.headerText}>TOTAL</Text>
        <Text style={styles.headerText}>PRICE</Text>
      </View>
      <View style={styles.headerRight}>
        <Text style={styles.headerText}>PRICE</Text>
        <Text style={styles.headerText}>TOTAL</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
       
      <View style={styles.titleRow}>
    
        <Controls 
          connected={connected}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
          precision={precision}
          setPrecision={handleSetPrecision}
          scale={scale}
          setScale={handleSetScale}
        />
        
      </View>
      <Text style={styles.title}>ORDER BOOK</Text>
      {renderHeader()}
      
      <View style={styles.bookContainer}>
        <View style={styles.bidsContainer}>
          <FlatList
            style={styles.list}
            data={bidsWithTotal}
            keyExtractor={(item) => `bid-${item.price}`}
            renderItem={({ item }) => (
              <OrderRow
                price={item.price}
                count={item.count}
                amount={item.amount}
                total={item.total}
                side="bid"
                precision={precision}
                scale={scale}
                maxSize={maxBidSize}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={styles.asksContainer}>
          <FlatList
            style={styles.list}
            data={asksWithTotal}
            keyExtractor={(item) => `ask-${item.price}`}
            renderItem={({ item }) => (
              <OrderRow
                price={item.price}
                count={item.count}
                amount={item.amount}
                total={item.total}
                side="ask"
                precision={precision}
                scale={scale}
                maxSize={maxAskSize}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  titleRow: {
    flexDirection: 'row',
  
  
    marginBottom: 16,
  },
  title: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom:20,
  },
  headerRow: {
    flexDirection: 'row',
  
    marginBottom: 5,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 14,
    marginRight: 10,
  },
  bookContainer: {
    flexDirection: 'row',
    minHeight: 300,
  },
  bidsContainer: {
    flex: 1,
    marginRight: 5,
  },
  asksContainer: {
    flex: 1,
    marginLeft: 5,
  },
  list: {
    flex: 1,
  },
});