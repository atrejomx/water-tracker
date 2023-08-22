import * as Notifications from 'expo-notifications';

export const scheduleNotification = async (seconds = 10) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds},
  });
}