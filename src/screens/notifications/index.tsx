import React, {useState, useEffect, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native'; // Добавлен импорт useFocusEffect
import {useAuth} from '../../hooks/useAuth';
import Loading from '../../components/UI/Loading';
import Back from '../../assets/icons/Back';
import MiniLogo from '../../assets/icons/MiniLogo';
import {formatDate} from '../../utils/helpers';

const truncateText = (text: string, maxLength: number = 50) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const Notifications = () => {
  const user = useAuth();
  const accessToken = user?.accessToken;
  const navigation: any = useNavigation();
  const [lows, setLows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Выносим логику загрузки уведомлений в отдельную функцию
  const fetchNotifications = useCallback(async () => {
    console.log('Загружаем список уведомлений');
    if (!accessToken) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const response = await fetch(
        'https://alpha-cargo.kg/api/notifications',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setLows(data.filter((item: any) => !item.read || item.read));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  // Используем useFocusEffect для обновления уведомлений при каждом фокусе экрана
  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
      
      return () => {
        // Здесь можно добавить логику очистки, если необходимо
      };
    }, [fetchNotifications])
  );

  // Сохраняем исходный useEffect для первоначальной загрузки
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <View style={styles.safeArea}>
      <View
        style={{
          top: 80,
          position: 'static',
          paddingHorizontal: 20,
          zIndex: 99,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Back color="black" />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 30,
            lineHeight: 50,
            fontWeight: '700',
          }}>
          Уведомления
        </Text>
      </View>
      <ScrollView style={[styles.scrollView]}>
        <View style={!loading ? styles.Wrapper : styles.loadWrap}>
          {!loading ? (
            <View style={{width: '100%'}}>
              <Text
                style={{fontSize: 18, fontWeight: '500', fontFamily: 'Exo 2'}}>
                Новые
              </Text>
              {lows?.map((item: any, index: number) => (
                <TouchableOpacity
                  key={index}
                  style={styles.container}
                  onPress={() =>
                    navigation.navigate('NotificationDetail', {id: item.id})
                  }>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 10,
                      maxWidth: '70%',
                      marginTop: 15,
                    }}>
                    <View style={{position: 'relative'}}>
                      <MiniLogo />
                      {item.read === false && (
                        <View
                          style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            backgroundColor: '#02447F',
                            width: 10,
                            height: 10,
                            borderRadius: 5,

                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 1},
                            shadowOpacity: 0.3,
                            shadowRadius: 1.5,

                            elevation: 3,
                          }}
                        />
                      )}
                    </View>
                    <View>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: '700',
                          fontFamily: 'Exo 2',
                        }}>
                        {item.title}
                      </Text>
                      <Text style={{flexWrap: 'wrap', fontFamily: 'Exo 2'}}>
                        {truncateText(item.message)}
                      </Text>
                    </View>
                  </View>
                  <Text style={{fontFamily: 'Exo 2', marginBottom: 2}}>
                    {formatDate(item.createdAt)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Loading />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    top: 55,
    position: 'absolute',
    paddingHorizontal: 20,
    zIndex: 99,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 27,
    fontWeight: '700',
    marginTop: 20,
    fontFamily: 'Exo 2',
  },
  Wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    alignItems: 'center',
    marginTop: 80,
  },
  bigText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Exo 2',
  },
  smallText: {
    color: '#8C8C8C',
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Exo 2',
  },
  container: {
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    gap: 10,
  },
  loadWrap: {
    height: 600,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});