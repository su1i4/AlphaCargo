import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Header from '../../screens/Header';
import LogoutIcon from '../../assets/icons/LogoutIcon';
import {useNavigation} from '@react-navigation/native';
import BellIcon from '../../assets/icons/BellIcon';
import { useAuth } from '../../hooks/useAuth';
import Loading from '../../components/UI/Loading';

export const Notifications = () => {
  const user = useAuth();
  const accessToken = user?.accessToken;
  const navigation: any = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (accessToken) {
      const fetchNotifications = async () => {
        try {
          const response = await fetch('https://alphacargoserver.azurewebsites.net/notifications', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          setNotifications(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchNotifications();
    } else {
      setLoading(false);
    }
  }, [accessToken]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        id="Notifications"
        text="Уведомления"
        Right={LogoutIcon}
        Left={BellIcon}
        funcLeft={() => navigation.navigate('Notifications')}
        func={() => navigation.goBack()}
      />
      <ScrollView style={[styles.scrollView]}>
        <View style={!loading ? styles.Wrapper: styles.loadWrap}>
          {!loading ? notifications?.map((item: any, index: number) => (
            <View key={index} style={styles.container}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#02447F',
                }}>
                {item.title}
              </Text>
              <View
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: '#27457C4A',
                  marginVertical: 13,
                }}
              />
              <View>
                <Text style={{color: '#8C8C8C', fontSize: 13}}>
                  дата: {item.createdAt.split("T")[0]} - {item.createdAt.split("T")[1].split('.')[0]}
                </Text>
                <Text style={{color: '#8C8C8C', fontSize: 13}}>
                  статус: {item.read ? 'Прочитано': 'Не прочитано'}
                </Text>
                <Text style={{color: '#8C8C8C', fontSize: 13}}>
                  {item.message}
                </Text>
              </View>
            </View>
          )) : (
            <Loading />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  Wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    alignItems: 'center',
  },
  bigText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: '600',
  },
  smallText: {
    color: '#8C8C8C',
    fontSize: 13,
    fontWeight: '400',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '100%',
  },
  loadWrap: {
    height: 600,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
