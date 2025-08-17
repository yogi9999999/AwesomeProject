import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { formatPrice } from '../utils/format';

interface OrderRowProps {
  price: number;
  count: number;
  amount: number;
  total: number;
  side: 'bid' | 'ask';
  precision: string;
  scale?: number;
  maxSize?: number;
}

export default function OrderRow({ price, count, amount, total, side, precision, scale = 1, maxSize = 1 }: OrderRowProps) {
  const ratio = maxSize > 0 ? (total / maxSize) * scale : 0;
  const widthPercent = Math.min(1, ratio);

  return (
    <View style={styles.row}>
      {side === 'bid' ? (
        <>
          <View style={styles.total}>
            <Text style={styles.totalText}>{Number(total).toFixed(3)}</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={[styles.price, styles.bid]}>{formatPrice(price, precision)}</Text>
            <View style={styles.barWrap} pointerEvents="none">
              <Animated.View
                style={[
                  styles.bar,
                  styles.barBid,
                  { width: `${widthPercent * 100}%` },
                ]}
              />
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={styles.priceContainer}>
            <Text style={[styles.price, styles.ask]}>{formatPrice(price, precision)}</Text>
            <View style={styles.barWrap} pointerEvents="none">
              <Animated.View
                style={[
                  styles.bar,
                  styles.barAsk,
                  { width: `${widthPercent * 100}%` },
                ]}
              />
            </View>
          </View>
          <View style={styles.total}>
            <Text style={styles.totalText}>{Number(total).toFixed(3)}</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#0b1114',
    position: 'relative',
  },
  total: { 
    width: 60,
    alignItems: 'flex-start',
  },
  totalText: { 
    color: '#9ca3af', 
    fontSize: 12, 
    textAlign: 'left' 
  },
  priceContainer: { 
    flex: 1, 
    alignItems: 'center',
    position: 'relative',
  },
  price: { 
    fontSize: 14, 
    fontWeight: '600',
    zIndex: 1,
  },
  bid: { color: '#10b981' },
  ask: { color: '#ef4444' },
  barWrap: { 
    position: 'absolute', 
    left: 0, 
    right: 0, 
    height: '100%', 
    zIndex: 0,
    top: 0,
  },
  bar: { 
    height: '100%', 
    opacity: 0.15,
    borderRadius: 2,
  },
  barBid: { 
    backgroundColor: '#10b981',
    alignSelf: 'flex-end',
  },
  barAsk: { 
    backgroundColor: '#ef4444',
    alignSelf: 'flex-start',
  },
});
