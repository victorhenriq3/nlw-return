import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { Widget } from './src/components/Widget';
import { theme } from './src/theme';

export default function App() {
  return (
    <View style={{
      flex: 1,
      backgroundColor: theme.colors.background
    }}>
      <Widget />
      <StatusBar 
        style="light" 
      backgroundColor='transparent'
      translucent
      />
    </View>
  );
}
