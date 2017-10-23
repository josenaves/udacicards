import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'udacicards:notifications';

const createNotification = () => ({
  title: 'Udacicards - Remider',
  body: "👋 don't forget to study today - start a quiz now!",
  ios: {
    sound: true,
  },
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true,
  },
});

export const clearLocalNotification = async () => {
  await AsyncStorage.removeItem(NOTIFICATION_KEY);
  await Notifications.cancelAllScheduledNotificationsAsync();
};

export const setLocalNotification = async () => {
  const rawData = await AsyncStorage.getItem(NOTIFICATION_KEY);
  const data = await JSON.parse(rawData);
  if (data === null) {
    const permRet = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    const { status } = permRet;

    if (status === 'granted') {
      await Notifications.cancelAllScheduledNotificationsAsync();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(20);
      tomorrow.setMinutes(0);

      await Notifications.scheduleLocalNotificationAsync(
        createNotification(),
        {
          time: tomorrow,
          repeat: 'day',
        },
      );
      await AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
    }
  }
};
