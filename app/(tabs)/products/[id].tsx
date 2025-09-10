import { KeyboardAvoiding, Typography } from '@/components';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

export default function ProductDetail() {
  const searchParams = useLocalSearchParams();

  return (
    <KeyboardAvoiding>
      <SafeAreaView style={styles.container}>
        <Typography variant='heading1'>ProductDetail</Typography>
        <Text>product: {searchParams.id}</Text>
      </SafeAreaView>
    </KeyboardAvoiding>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    gap: 24,
  },
});
