import {StyleSheet, Text, TouchableOpacity, View, Linking} from 'react-native';
import Vyezd from '../../assets/icons/Vyezd';

export default function Zakazik() {
  const phoneNumber = '+996772007183';
    const whatsAppUrl = `whatsapp://send?phone=${phoneNumber}`;
    const webWhatsAppUrl = `https://wa.me/${phoneNumber}`;
  
    const openWhatsAppOrWebsite = async () => {
      try {
        const supported = await Linking.canOpenURL(whatsAppUrl);
        if (supported) {
          await Linking.openURL(whatsAppUrl);
        } else {
          await Linking.openURL(webWhatsAppUrl);
        }
      } catch (error) {
        await Linking.openURL(webWhatsAppUrl);
      }
    };
  return (
    <View style={styles.safeArea}>
      <View style={styles.Wrapper}>
        <Text style={{fontSize: 20, fontWeight: '700'}}>
          Контакты выездной группы
        </Text>
        <Text style={{fontSize: 16, fontWeight: '500', paddingVertical: 20}}>
          Тел: +996 (772) 007-183
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#A0C417',
            width: '90%',
            paddingBottom: 18,
            paddingTop: 16,
            borderRadius: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={openWhatsAppOrWebsite}>
          <Text style={{color: 'white', fontSize: 16}}>Открыть WhatsApp</Text>
        </TouchableOpacity>
        <Vyezd />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  Wrapper: {
    width: '100%',
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    alignItems: 'center',
  },
});
