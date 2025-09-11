import { NotificationCard, Typography } from '@/components';
import { useSortedNotifications } from '@/hooks';
import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';

export default function Notifications() {
  const sortedNotifications = useSortedNotifications();

  return (
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
  },

  withoutNotifications: {
    margin: 'auto',
    paddingHorizontal: 24,
  },

  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 8,
  },

  separator: {
    height: 8,
  },
});
