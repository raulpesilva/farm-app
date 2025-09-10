import { FormAddProduct, KeyboardAvoiding, OptionSelect, Select, Typography } from '@/components';
import { useProductsSelect } from '@/states/products';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';

const TYPES_OF_REGISTRATION = [
  { displayName: 'Produto', type: 'product' },
  { displayName: 'Estoque', type: 'stock' },
  { displayName: 'Venda', type: 'sell' },
];

export default function Add() {
  const products = useProductsSelect();
  const searchPrams = useLocalSearchParams();
  const router = useRouter();
  const hasProducts = products.length > 0;

  const type = hasProducts
    ? TYPES_OF_REGISTRATION.find((type) => type.type === searchPrams.type)
    : TYPES_OF_REGISTRATION[0];
  console.log({ type, searchPrams });

  const setType = (type: OptionSelect) => {
    router.replace({
      pathname: '/add/[type]',
      params: { type: type.type },
    });
  };

  return (
    <KeyboardAvoiding>
      <SafeAreaView style={styles.container}>
        <Typography variant='heading1'>Cadastro</Typography>

        <Select
          placeholder='Selecione um tipo de cadastro'
          options={TYPES_OF_REGISTRATION}
          value={type}
          disabled={!hasProducts}
          onPress={setType}
        />

        {type?.type === TYPES_OF_REGISTRATION[0].type && <FormAddProduct />}
        {type?.type === TYPES_OF_REGISTRATION[1].type && <Typography>Estoque</Typography>}
        {type?.type === TYPES_OF_REGISTRATION[2].type && <Typography>Venda</Typography>}
      </SafeAreaView>
    </KeyboardAvoiding>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    gap: 32,
  },
});
