import React, {useEffect, useState, useCallback} from 'react';
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
import {useFocusEffect} from '@react-navigation/native'; // Добавлен импорт useFocusEffect
import Back from '../../assets/icons/Back';
import {GradientWrapper} from '../../components/Containers/WatchOrderHeader';
import AlfaChinaStory from '../../assets/icons/story/AlfaChina';
import AlfaFullfilment from '../../assets/icons/story/Alphafullfilment';
import AlfaVyezd from '../../assets/icons/story/AlfaVyezd';

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

  const fetchNotifications = useCallback(async () => {
    console.log('Загружаем уведомления');
    if (!accessToken) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('https://alpha-cargo.kg/api/notifications', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const unreadMessages = data.filter((item: any) => item.read === false);
      setUnread(unreadMessages?.length || 0);
      setNotifications(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useFocusEffect(
    useCallback(() => {
      fetchNotifications();

      return () => {};
    }, [fetchNotifications]),
  );

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const Components = [
    {
      phoneNumber: '+996778777887',
      id: 0,
      color: '#495665',
      text: 'Регистрация',
      image: <AlfaChinaStory />,
      children: [require('../../assets/images/AlfaChina.png')],
      buttonText: 'Узнать про Китай!',
      buttonStyle: {
        backgroundColor: '#E65E42',
      },
    },
    {
      phoneNumber: '+996222990990',
      id: 1,
      color: '#495665',
      text: 'Регистрация',
      image: <AlfaFullfilment />,
      children: [require('../../assets/images/AlphaCargoStory1.png')],
      buttonText: 'Узнать про фулфилмент!',
      buttonStyle: {
        backgroundColor: '#3EA2C6',
      },
    },
    {
      phoneNumber: '+996772007183',
      id: 2,
      color: '#495665',
      text: 'Регистрация',
      image: <AlfaVyezd />,
      children: [require('../../assets/images/AlphaCargoStory2.png')],
      buttonText: 'Вызвать выездную группу!',
      buttonStyle: {
        backgroundColor: '#3EA2C6',
      },
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
    fontFamily: 'Exo 2',
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
