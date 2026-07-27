import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RelationshipInsightScreen } from './screens/RelationshipInsightScreen';
import { sieTheme } from './theme';

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={sieTheme}>
        <StatusBar style="dark" />
        <RelationshipInsightScreen />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
