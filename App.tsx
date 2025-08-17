import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, FlatList } from 'react-native';
import store from './src/store';
import OrderBook from './src/components/OrderBook';
import Trades from './src/components/Trades';

export default function App() {
    const mockTrades: Array<{ time: string; price: string; amount: string; side: 'buy' | 'sell' }> = [
        { time: '16:21:36', price: '34,826', amount: '0.0456', side: 'sell' },
        { time: '16:21:36', price: '34,827', amount: '0.3223', side: 'sell' },
        { time: '16:21:36', price: '34,827', amount: '0.0024', side: 'sell' },
        { time: '16:21:16', price: '34,829', amount: '0.0824', side: 'buy' },
        { time: '16:21:16', price: '34,829', amount: '0.0026', side: 'buy' },
    ];

    const sections = [
        { type: 'header', id: 'header' },
        { type: 'orderbook', id: 'orderbook' },
        { type: 'trades', id: 'trades' },
    ];

    const renderSection = ({ item }: { item: { type: string; id: string } }) => {
        switch (item.type) {
            case 'header':
                return (
                    <View style={styles.header}>
                        <View style={styles.headerRight}>
                            <Text style={styles.starIcon}>★</Text>
                        </View>
                    </View>
                );
            
            case 'orderbook':
                return <OrderBook symbol="tBTCUSD" />;
            
            case 'trades':
                return <Trades trades={mockTrades} />;
            
            default:
                return null;
        }
    };

    return (
        <Provider store={store}>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" />
                
                <FlatList
                    data={sections}
                    keyExtractor={(item) => item.id}
                    renderItem={renderSection}
                    showsVerticalScrollIndicator={false}
                    style={styles.content}
                    contentContainerStyle={styles.contentContainer}
                />
            </SafeAreaView>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f1720',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 8,
    },
    headerLeft: {
        width: 40,
        alignItems: 'center',
    },
    headerCenter: {
        alignItems: 'center',
    },
    headerRight: {
        width: 40,
        alignItems: 'center',
    },
    backArrow: {
        fontSize: 24,
        color: '#fff',
    },
    pairText: {
        fontSize: 14,
        color: '#888',
        marginBottom: 4,
    },
    priceText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    starIcon: {
        fontSize: 24,
        color: '#ffd700', 
    },
    chartContainer: {
        height: 150,
        backgroundColor: '#1a242f',
        borderRadius: 10,
        marginHorizontal: 16,
        marginBottom: 16,
        overflow: 'hidden',
    },
    chartPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2a3846',
    },
    chartText: {
        fontSize: 18,
        color: '#888',
        fontWeight: 'bold',
    },
    content: {
        flex: 1, 
    },
    contentContainer: {
        paddingBottom: 16, 
    },
});