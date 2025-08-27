import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaView, StatusBar, StyleSheet, View, Text, FlatList } from 'react-native';
import store from './src/store';
import OrderBook from './src/components/OrderBook';

export default function App() {
    const sections = [
        { type: 'header', id: 'header' },
        { type: 'orderbook', id: 'orderbook' },
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