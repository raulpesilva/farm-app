import { NotificationCard, Typography } from '@/components';
import { useSortedNotifications } from '@/hooks';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

export default function Notifications() {
  const { sortedNotifications, loading } = useSortedNotifications();

  if (loading && !sortedNotifications?.length) {
    return (
      <View style={styles.container}>
        <Typography style={styles.loading} variant='heading3'>
          Carregando notificações...
        </Typography>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!sortedNotifications?.length && (
        <Typography variant='heading1' style={styles.withoutNotifications}>
          Você ainda não tem notificações
        </Typography>
      )}

      {!!sortedNotifications?.length && (
        <FlatList
          data={sortedNotifications}
          renderItem={({ item }) => (
            <NotificationCard id={item.id} type={item.type} content={item.content} read={item.read} />
          )}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    paddingHorizontal: 24,
  },

  loading: {
    margin: 'auto',
    textAlign: 'center',
  },

  withoutNotifications: {
    margin: 'auto',
  },

  listContent: {
    paddingBottom: 8,
  },

  separator: {
    height: 8,
  },
});
