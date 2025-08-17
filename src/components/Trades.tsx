import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

interface Trade {
  time: string;
  price: string;
  amount: string;
  side: 'buy' | 'sell';
}

interface TradesProps {
  trades: Trade[];
}

export default function Trades({ trades = [] }: TradesProps) {
  const renderTrade = ({ item }: { item: Trade }) => (
    <View style={styles.tradeRow}>
      <View style={styles.timeColumn}>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      <View style={styles.priceColumn}>
        <Text style={[styles.priceText, item.side === 'buy' ? styles.buyPrice : styles.sellPrice]}>
          {item.price}
        </Text>
      </View>
      <View style={styles.amountColumn}>
        <Text style={styles.amountText}>{item.amount}</Text>
      </View>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerRow}>
      <Text style={styles.headerText}>TIME</Text>
      <Text style={styles.headerText}>PRICE</Text>
      <Text style={styles.headerText}>AMOUNT</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>TRADES</Text>
        <View style={styles.tabContainer}>
          <Text style={[styles.tabText, styles.activeTab]}>Market</Text>
        </View>
      </View>
      
      {renderHeader()}
      
      <FlatList
        data={trades}
        keyExtractor={(item, index) => `trade-${index}`}
        renderItem={renderTrade}
        showsVerticalScrollIndicator={false}
        style={styles.tradesList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f1720',
    padding: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1f2937',
    borderRadius: 6,
    padding: 2,
  },
  tabText: {
    color: '#9ca3af',
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  activeTab: {
    color: 'white',
    backgroundColor: '#374151',
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingHorizontal: 12,
  },
  headerText: {
    color: '#9ca3af',
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  tradesList: {
    minHeight: 200,
  },
  tradeRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1f2937',
  },
  timeColumn: {
    flex: 1,
  },
  priceColumn: {
    flex: 1,
    alignItems: 'center',
  },
  amountColumn: {
    flex: 1,
    alignItems: 'flex-end',
  },
  timeText: {
    color: '#9ca3af',
    fontSize: 12,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
  },
  buyPrice: {
    color: '#10b981',
  },
  sellPrice: {
    color: '#ef4444',
  },
  amountText: {
    color: '#9ca3af',
    fontSize: 12,
  },
  footer: {
    marginTop: 16,
    alignItems: 'center',
  },
  footerText: {
    color: '#3b82f6',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
