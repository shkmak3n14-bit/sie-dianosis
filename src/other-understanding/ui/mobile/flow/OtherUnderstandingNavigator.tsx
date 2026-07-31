import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DailyEpisodeResultScreen } from '../screens/DailyEpisodeResultScreen';
import { DailyEpisodeScreen } from '../screens/DailyEpisodeScreen';
import { EpisodeInputScreen } from '../screens/EpisodeInputScreen';
import { OtherUnderstandingEntryScreen } from '../screens/OtherUnderstandingEntryScreen';
import { RelationshipInsightScreen } from '../screens/RelationshipInsightScreen';
import { sieColors } from '../theme';
import type { OtherUnderstandingStackParamList } from './types';

const Stack = createNativeStackNavigator<OtherUnderstandingStackParamList>();

/** 他者理解モジュールの画面フロー */
export function OtherUnderstandingNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Entry"
        screenOptions={{
          headerStyle: { backgroundColor: sieColors.bg },
          headerTintColor: sieColors.accentStrong,
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: sieColors.bg },
        }}
      >
        <Stack.Screen
          name="Entry"
          component={OtherUnderstandingEntryScreen}
          options={{ title: '他者理解', headerShown: false }}
        />
        <Stack.Screen
          name="EpisodeInput"
          component={EpisodeInputScreen}
          options={{ title: 'エピソード入力' }}
        />
        <Stack.Screen
          name="RelationshipInsight"
          component={RelationshipInsightScreen}
          options={{ title: '他者理解カード' }}
        />
        <Stack.Screen
          name="DailyEpisode"
          component={DailyEpisodeScreen}
          options={{ title: '日々の行動分析' }}
        />
        <Stack.Screen
          name="DailyEpisodeResult"
          component={DailyEpisodeResultScreen}
          options={{ title: '行動分析結果' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
