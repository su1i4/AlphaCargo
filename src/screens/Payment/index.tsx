import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import Back from '../../assets/icons/Back';
import {useNavigation} from '@react-navigation/native';
import {Input} from '../../components/UI/Inputs/Input';
import {Tab} from '../../components/UI/Tab';
import {ButtonCustom} from '../../components/UI/Buttons/Button';
import DocumentPicker from 'react-native-document-picker';
import {useAuth} from '../../hooks/useAuth';

const Payment = () => {
  const user = useAuth();
  const accessToken = user?.accessToken;
  const navigation: any = useNavigation();
  const [activeTab, setActiveTab] = useState(0);
  const [parcel, setParcel] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.allFiles],
      });
      setFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        Alert.alert('Canceled', 'No file was selected.');
      } else {
        console.error(err);
        Alert.alert('Error', 'Failed to select a file.');
      }
    }
  };

  const handlePost = async () => {
    try {
      setLoading(true);

      if (!parcel || !phoneNumber || !amount || !file) {
        Alert.alert('Error', 'Please fill in all the fields.');
        return;
      }

      const formData = new FormData();
      formData.append('phoneNumber', phoneNumber);
      formData.append('amount', amount);
      formData.append('checkFile', {
        uri: file.uri,
        type: file.type,
        name: file.name,
      });

      const response = await fetch(`${URL}/api/payment`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to create payment.');
      }

      Alert.alert('Success', 'Payment created successfully.');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{flex: 1, position: 'relative'}}>
      <View
        style={{
          top: 55,
          position: 'absolute',
          paddingHorizontal: 20,
          zIndex: 99,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Back color="black" />
        </TouchableOpacity>
        <Text style={{fontSize: 30, fontWeight: '700', marginTop: 20}}>
          Оплата
        </Text>
      </View>
      <View style={styles.container}>
        <View style={{padding: 20}}>
          <Tab text="Плательщик" active={activeTab} setActive={setActiveTab}>
            <View>
              <Text style={{color: '#F9FFFF'}}>Частное лицо</Text>
            </View>
            <View>
              <Text style={{color: '#F9FFFF'}}>Юридическое лицо</Text>
            </View>
          </Tab>

          {/* <Text style={{marginTop: 10, marginBottom: 10}}>Номер накладной</Text>
          <Input
            value={parcel}
            onChange={setParcel}
            placeholder="Введите номер"
          /> */}

          <Text style={{marginTop: 10, marginBottom: 10}}>Номер телефона</Text>
          <Input
            value={phoneNumber}
            onChange={setPhoneNumber}
            placeholder="Введите номер телефона"
          />

          <Text style={{marginTop: 10, marginBottom: 10}}>Сумма платежа</Text>
          <Input
            value={amount}
            onChange={setAmount}
            placeholder="Введите сумму"
          />
          <ButtonCustom
            title="Отправить"
            isLoading={loading}
            onClick={handlePost}
            style={{marginTop: 10}}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
  },
  header: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E1E1E1',
  },
  headerText: {
    color: 'black',
    fontSize: 17,
    fontWeight: '600',
  },
  fileButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
  },
  fileButtonText: {
    color: '#333',
  },
});

export default Payment;
