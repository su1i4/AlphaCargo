import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useAuth} from '../../hooks/useAuth';
import Loading from '../../components/UI/Loading';
import Back from '../../assets/icons/Back';
import MiniLogo from '../../assets/icons/MiniLogo';
import {formatDate} from '../../utils/helpers';
import { useReadNotificationMutation } from '../../services/base.service';

export const NotificationDetail = () => {
  const route = useRoute();
  const {id}: any = route.params;
  const user = useAuth();
  const accessToken = user?.accessToken;
  const navigation: any = useNavigation();
  const [notification, setNotification] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readNotification] = useReadNotificationMutation();

  useEffect(() => {
    if (accessToken && id) {
      const fetchNotification = async () => {
        try {
          const response = await fetch(
            `https://alpha-cargo.kg/api/notifications`,
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
          setNotification(data.find((item: any) => item.id === id));
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchNotification();
    } else {
      setLoading(false);
    }
  }, [accessToken, id]);

  useEffect(() => {
    if (id) {
      try {
        readNotification(id);
      } catch (error) {
      }
    }
  }, [id]);



  return (
    <View style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        <View
          style={{
            top: 80,
            position: 'absolute',
            paddingHorizontal: 20,
            zIndex: 99,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
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
        <View style={!loading ? styles.wrapper : styles.loadWrap}>
          {!loading && notification ? (
            <View style={styles.container}>
              <View style={styles.notificationHeader}>
                <MiniLogo />
                <Text style={styles.date}>
                  {formatDate(notification.createdAt)}
                </Text>
              </View>
              <Text style={styles.title}>{notification.title}</Text>
              <Text style={styles.message}>{notification.message}</Text>
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
  },
  headerText: {
    fontSize: 27,
    fontWeight: '700',
    marginTop: 20,
    fontFamily: 'Exo 2',
  },
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginTop: 140,
  },
  container: {
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    fontFamily: 'Exo 2',
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Exo 2',
  },
  date: {
    color: '#666',
    fontFamily: 'Exo 2',
  },
  loadWrap: {
    height: 600,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
