import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MutualInsightScreen } from '../screens/MutualInsightScreen';
import { RelationshipEntryScreen } from '../screens/RelationshipEntryScreen';
import type { RelationshipStackParamList } from './types';

const Stack = createNativeStackNavigator<RelationshipStackParamList>();

export function RelationshipNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="RelationshipEntry">
        <Stack.Screen
          name="RelationshipEntry"
          component={RelationshipEntryScreen}
          options={{ title: '相互理解' }}
        />
        <Stack.Screen
          name="MutualInsight"
          component={MutualInsightScreen}
          options={{ title: '相互理解' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
