import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function Products() {
  const searchParams = useLocalSearchParams();
  return (
    <View>
      <Text>product: {searchParams.id}</Text>
    </View>
  );
}
