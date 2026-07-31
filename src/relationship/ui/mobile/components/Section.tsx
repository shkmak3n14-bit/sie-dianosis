import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

type Props = {
  title: string;
  children?: React.ReactNode;
};

export function Section({ title, children }: Props) {
  return (
    <View style={styles.root}>
      <Text variant="titleSmall">{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    gap: 6,
    marginBottom: 12,
  },
});
