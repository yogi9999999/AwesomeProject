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

### Trades Widget
- **Recent Trades**: Display of latest market trades
- **Color Coding**: Green for buy trades, Red for sell trades
- **Time Stamps**: Real-time trade timestamps
- **Market Tab**: Currently shows "Market" trades (expandable for other types)

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

## 📊 Order Book Features

### Precision Levels
- **P0**: No decimal places (34,829)
- **P1**: 1 decimal place (34,829.0)
- **P2**: 2 decimal places (34,829.00)
- **P3**: 3 decimal places (34,829.000)

### Scale Options
- **0.5x**: Reduced depth bar visibility
- **1x**: Standard depth bar scaling
- **2x**: Enhanced depth bar visibility

### Depth Visualization
- **Bid Depth**: Green bars extending from left
- **Ask Depth**: Red bars extending from right
- **Proportional**: Bar width represents relative volume

## 🔧 Configuration

### WebSocket Settings
- **Reconnection Delay**: Starts at 1 second, increases exponentially
- **Max Reconnection Delay**: 30 seconds
- **Heartbeat Handling**: Automatic heartbeat processing

### Display Settings
- **Default Precision**: P0 (configurable)
- **Default Scale**: 1x (configurable)
- **Order Limit**: 25 orders per side (configurable)

## 🧪 Testing

### Manual Testing
- Connect/Disconnect functionality
- Precision and scale adjustments
- Real-time data updates
- Network interruption handling

### Component Testing
- Order book rendering
- Trade display
- Control interactions
- State management

## 🚧 Future Enhancements

### Planned Features
- **Price Alerts**: Set price notifications
- **Layout Configuration**: Customizable widget arrangement
- **Additional Symbols**: Support for more trading pairs
- **Advanced Charts**: Technical analysis tools
- **Order Placement**: Execute trades directly

### Technical Improvements
- **Performance Optimization**: Virtual scrolling for large order books
- **Offline Support**: Cached data when disconnected
- **Push Notifications**: Real-time price alerts
- **Biometric Security**: Touch ID/Face ID integration

## 📄 License

This project is for educational and demonstration purposes. Please refer to Bitfinex's terms of service for API usage.

## 🤝 Contributing

Contributions are welcome! Please ensure:
- Code follows existing patterns
- TypeScript types are properly defined
- Components are properly tested
- Documentation is updated

## 📞 Support

For technical issues or questions:
- Check the existing documentation
- Review the code structure
- Test with different network conditions
- Verify Bitfinex API status

---

**Note**: This application is a demonstration of React Native development and WebSocket integration. It is not affiliated with Bitfinex and should not be used for actual trading without proper verification and compliance with financial regulations.
