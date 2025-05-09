import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FIVE_MINUTES_MS,
  LAST_LOGIN_KEY,
  ONE_DAY_MS,
  PIN_KEY,
  PIN_KEY_DATE,
} from './consts';

export function getStatus(openingHour: any, closingHour: any) {
  const currentHour = new Date().getHours();
  if (openingHour === 0 && closingHour === 24) {
    return {text: 'Круглосуточно', color: '#00C036'};
  }
  if (currentHour >= openingHour && currentHour < closingHour) {
    return {text: 'Открыто', color: '#00C036'};
  } else {
    return {text: `Закрыто до ${openingHour}:00`, color: '#FF0000'};
  }
}

const USER_KEY = '@user';

export const getUserFromStorage = async () => {
  try {
    const user = await AsyncStorage.getItem(USER_KEY);
    const parsedUser = user ? JSON.parse(user) : null;

    if (parsedUser && parsedUser._j) {
      return parsedUser._j;
    }

    return parsedUser;
  } catch (error) {
    return null;
  }
};

export const removeUserFromStorage = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {}
};

export const saveUserToStorage = async (data: any) => {
  try {
    if (data !== null) {
      const dataToSave = data._j ? data._j : data;
      const jsonUser = JSON.stringify(dataToSave);
      await AsyncStorage.setItem(USER_KEY, jsonUser);
    } else {
      await AsyncStorage.removeItem(USER_KEY);
    }
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

export const getRightToken = (data: any) => {
  const user = data.accessToken || data['_j'];
  return user;
};

export const checkLoginDate = async () => {
  try {
    const lastLoginDate = await AsyncStorage.getItem(LAST_LOGIN_KEY);
    if (!lastLoginDate) return false;

    const lastLoginTime = new Date(lastLoginDate).getTime();
    const currentTime = Date.now();

    return currentTime - lastLoginTime < ONE_DAY_MS;
  } catch (error) {
    return false;
  }
};

export const checkPinDate = async () => {
  try {
    const lastLoginDate = await AsyncStorage.getItem(PIN_KEY_DATE);
    if (!lastLoginDate) return false;

    const lastLoginTime = new Date(lastLoginDate).getTime();
    const currentTime = Date.now();

    console.log(
      'Last PIN login time:',
      new Date(lastLoginTime).toLocaleString(),
    );
    console.log('Current time:', new Date(currentTime).toLocaleString());
    console.log('Time difference (ms):', currentTime - lastLoginTime);
    console.log('Valid if less than:', FIVE_MINUTES_MS);

    // PIN session is valid if less than 5 minutes have passed
    return currentTime - lastLoginTime < FIVE_MINUTES_MS;
  } catch (error) {
    console.error('Error checking PIN date:', error);
    return false;
  }
};

// Function to update PIN session timestamp
export const updatePinSession = async () => {
  try {
    const currentTime = new Date().toISOString();
    await AsyncStorage.setItem(PIN_KEY_DATE, currentTime);
    console.log('PIN session updated at:', currentTime);
    return true;
  } catch (error) {
    console.error('Error updating PIN session:', error);
    return false;
  }
};

export const statusColor = (txt: string) => {
  switch (txt) {
    case 'Принят на склад ожидает отправки':
      return '#2B3F6C';
    case 'В пути':
      return '#E1DC00';
    case 'Выдан получателю':
      return '#93C225';
    case 'Груз прибыл в Москву':
      return '#3B3F8C';
    default:
      break;
  }
};

export function formatDate(isoString: string): string {
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];

  const date = new Date(isoString);
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  return `${day} ${month} ${hours}:${minutes}`;
}

export const searchLocations = (locations: any[], query: string) => {
  if (!query.trim()) return locations;
  const lowerQuery = query.toLowerCase();

  return locations.filter(location =>
    Object.values(location).some(value => {
      if (typeof value === 'object' && value !== null) {
        return Object.values(value).some(
          nestedValue =>
            typeof nestedValue === 'string' &&
            nestedValue.toLowerCase().includes(lowerQuery),
        );
      }
      return (
        typeof value === 'string' && value.toLowerCase().includes(lowerQuery)
      );
    }),
  );
};
