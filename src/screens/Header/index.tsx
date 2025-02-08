import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import {SearchInput} from '../../components/UI/SearchInput';
import LinearGradient from 'react-native-linear-gradient';
import NewBell from '../../assets/icons/NewBell';
import {useAuth} from '../../hooks/useAuth';
import {useNavigation} from '@react-navigation/native';
import Back from '../../assets/icons/Back';
import { GradientWrapper } from '../../components/Containers/WatchOrderHeader';

interface HeaderProps {
  text: string;
  Right?: any;
  Left?: any;
  isSearch?: boolean;
  value?: string;
  onChange?: any;
  placeholder?: string;
  id: string;
  func?: any;
  funcLeft?: any;
  back?: boolean;
  show?: boolean;
}

export default function Header({
  text,
  Right,
  Left,
  isSearch = false,
  value = '',
  onChange,
  placeholder = '',
  id = 'afqf',
  func,
  funcLeft,
  back = false,
  show = true,
}: HeaderProps): JSX.Element {
  const user = useAuth();
  const accessToken = user?.accessToken;
  const navigation: any = useNavigation();
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (accessToken) {
      const fetchNotifications = async () => {
        try {
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
          const unreadMessages = data.filter(
            (item: any) => item.read === false,
          );
          setUnread(unreadMessages?.length || 0);
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

  const Components = [
    {
      id: 0,
      color: '#495665',
      text: 'Регистрация',
      image: require('../../assets/images/REKLAMA5.png'),
      children: [
        require('../../assets/images/REKLAMA5.png'),
        require('../../assets/images/REKLAMA6.png'),
        require('../../assets/images/REKLAMA7.png'),
      ],
    },
  ];

  return (
    <LinearGradient
      colors={['#203B7A', '#026297', '#006599']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={styles.header}>
      <View
        style={[
          styles.container,
          {
            paddingBottom: isSearch ? 10 : 20,
            justifyContent: 'space-between',
          },
        ]}>
        <View style={{display: 'flex', flexDirection: 'row', gap: 10}}>
          {back === true && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Back />
            </TouchableOpacity>
          )}
          <Text style={styles.text}>{text}</Text>
        </View>
        {show === true && (
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}
            style={{position: 'relative'}}>
            <NewBell />
            {unread > 0 && (
              <View
                style={{
                  position: 'absolute',
                  right: -5,
                  top: -5,
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  backgroundColor: '#FF0000',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: 'white'}}>{unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScrollView}>
        <View style={[styles.headerWrapper, {paddingTop: 5}]}>
          {Components.map((item, index) => (
            <GradientWrapper key={index} Components={Components} item={item} />
          ))}
        </View>
      </ScrollView>
      {isSearch && (
        <View style={styles.component}>
          <SearchInput
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        </View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    position: 'static',
    top: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom: 40,
  },
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: Platform.OS === 'ios' ? 55 : 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: '#F9FFFF',
    fontSize: 18,
    fontWeight: '600',
    paddingBottom: 5,
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
  },
  component: {
    paddingHorizontal: 20,
    paddingBottom: 15,
    height: 'auto',
  },
  horizontalScrollView: {
    paddingHorizontal: 20,
  },
});
