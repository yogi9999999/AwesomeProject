# Bitfinex Order Book Mobile App

A React Native mobile application that replicates the Order Book functionality from the Bitfinex trading platform, built with real-time WebSocket data integration.

## 🚀 Features

### Order Book Widget
- **Real-time Data**: Live order book updates via Bitfinex WebSocket V2 API
- **Dual Layout**: Bids (buy orders) on the left, Asks (sell orders) on the right
- **Depth Visualization**: Color-coded depth bars showing order volume
- **Precision Control**: Adjustable price precision (P0, P1, P2, P3)
- **Scale Control**: Adjustable depth bar scaling (0.5x, 1x, 2x)
- **Cumulative Totals**: Shows running totals for better market depth understanding


### Connection Management
- **WebSocket Controls**: Connect/Disconnect buttons
- **Connection Status**: Visual indicator showing connection state
- **Auto-reconnection**: Automatic reconnection on network loss
- **Error Handling**: Graceful handling of connection issues

## 🛠️ Technical Implementation

### Architecture
- **React Native**: Cross-platform mobile development
- **Redux Toolkit**: State management for market data
- **TypeScript**: Type-safe development
- **WebSocket**: Real-time data streaming

### Data Flow
1. **WebSocket Connection**: Connects to Bitfinex API
2. **Data Processing**: Processes order book snapshots and updates
3. **State Management**: Redux store manages order book state
4. **UI Updates**: Components re-render with real-time data

### Key Components
- `OrderBook`: Main order book display with depth visualization
- `OrderRow`: Individual order row with depth bars
- `Trades`: Recent trades display
- `Controls`: Connection and display controls
- `wsService`: WebSocket connection management

## 📱 UI/UX Features

### Design
- **Dark Theme**: Professional trading interface
- **Responsive Layout**: Adapts to different screen sizes
- **Visual Hierarchy**: Clear information organization
- **Interactive Controls**: Intuitive precision and scale adjustments

### Color Scheme
- **Bids**: Green (#10b981) for buy orders
- **Asks**: Red (#ef4444) for sell orders
- **Background**: Dark (#0f1720) for reduced eye strain
- **Text**: High contrast white and gray tones

## 🔌 API Integration

### Bitfinex WebSocket V2
- **Endpoint**: `wss://api-pub.bitfinex.com/ws/2`
- **Channel**: Book channel for order book data
- **Format**: Real-time snapshots and updates
- **Symbol**: BTC/USD (tBTCUSD)

### Data Structure
```typescript
interface OrderBookEntry {
  price: number;
  count: number;
  amount: number;
  total: number; // Cumulative total
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- React Native CLI
- iOS Simulator or Android Emulator
- Xcode (for iOS development)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd AwesomeProject

# Install dependencies
npm install

# iOS (requires macOS)
npx react-native run-ios

# Android
npx react-native run-android
```

### Development
```bash
# Start Metro bundler
npm start

# Run on specific simulator
npx react-native run-ios --simulator="iPhone 16 Pro"
```
## 📄 License

This project is for educational and demonstration purposes. Please refer to Bitfinex's terms of service for API usage.

---

**Note**: This application is a demonstration of React Native development and WebSocket integration. It is not affiliated with Bitfinex and should not be used for actual trading without proper verification and compliance with financial regulations.
