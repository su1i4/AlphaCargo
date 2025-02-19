import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
} from 'react-native';
import Back from '../../assets/icons/Back';
import {useNavigation} from '@react-navigation/native';
import Insta from '../../assets/icons/Insta';
import Tele from '../../assets/icons/Tele';
import TikTok from '../../assets/icons/TikTok';
import WebWorld from '../../assets/icons/Web';
import ArrowToRight from '../../assets/icons/Arrow-right';

export default function Socials() {
  const navigation: any = useNavigation();

  const openLink = async (appUrl: string, webUrl: string) => {
    try {
      const supported = await Linking.canOpenURL(appUrl);
      if (supported) {
        await Linking.openURL(appUrl);
      } else {
        await Linking.openURL(webUrl);
      }
    } catch (error) {
      // Alert.alert('Ошибка', 'Не удалось открыть ссылку');
    } finally {
      await Linking.openURL(webUrl);
    }
  };

  const SocialIcons = [
    {
      icon: <Insta />,
      text: 'Instagram',
      appLink: 'instagram://user?username=alphacargokg',
      webLink: 'https://www.instagram.com/alphacargokg/',
    },
    {
      icon: <Tele />,
      text: 'Telegram',
      appLink: 'tg://resolve?domain=alphacargo_kg', 
      webLink: 'https://t.me/alphacargo_kg',
    },
    {
      icon: <TikTok />,
      text: 'TikTok',
      appLink: 'tiktok://user?username=alphacargokg', 
      webLink: 'https://www.tiktok.com/@alphacargokg?_t=ZS-8u0kNUfMLO3&_r=1',
    },
    {
      icon: <WebWorld />,
      text: 'Сайт',
      webLink: 'https://alpha-cargo.kg/',
    },
  ];

  return (
    <View style={{flex: 1, position: 'relative', backgroundColor: 'white'}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Мы в социальных сетях</Text>
      </View>

      <View style={styles.container}>
        {SocialIcons.map((item, index) => (
          <TouchableOpacity
            style={[styles.innerFlex, {justifyContent: 'space-between'}]}
            key={index}
            onPress={() =>
              openLink(item.appLink || item.webLink, item.webLink)
            }>
            <View style={styles.innerFlex}>
              {item.icon}
              <Text style={styles.text}>{item.text}</Text>
            </View>
            <ArrowToRight />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 160,
    gap: 20,
  },
  innerFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  text: {
    fontSize: 17,
  },
});
