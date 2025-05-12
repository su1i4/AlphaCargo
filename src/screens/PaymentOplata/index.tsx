import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Back from '../../assets/icons/Back';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../hooks/useAuth';
import {ButtonCustom} from '../../components/UI/Buttons/Button';

interface PaymentData {
  id: number;
  header_title: string;
  description: string;
  imagePath: string;
  logo: string;
}

export const PaymentOplata = ({route}: any) => {
  const navigation: any = useNavigation();
  const user = useAuth();
  const [paymentList, setPaymentList] = useState<PaymentData | null>(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [amount, setAmount] = useState('0');
  const accessToken = user?.accessToken;
  const {id, invoice_number, sum} = route.params;

  useEffect(() => {
    const fetchPaymentList = async () => {
      try {
        const response = await fetch(
          `https://alpha-cargo.kg/api/requisites/${id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          },
        );
        const data = await response.json();
        setPaymentList(data);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };
    if (id) {
      fetchPaymentList();
    }
  }, [id]);

  console.log(userData);

  useEffect(() => {
    if (accessToken) {
      const fetchNotifications = async () => {
        try {
          const response = await fetch('https://alpha-cargo.kg/api/users', {
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
          setUserData(data);
        } catch (err: any) {
        } finally {
        }
      };

      fetchNotifications();
    } else {
    }
  }, [accessToken]);

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      setSelectedFile(res[0]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.error('Error picking file:', err);
      }
    }
  };

  const submitPayment = async () => {
    if (!selectedFile) {
      Alert.alert('Ошибка', 'Пожалуйста, выберите файл чека');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('phoneNumber', userData?.phone);
      formData.append('amount', amount);
      formData.append('invoiceNumber', invoice_number);
      formData.append('checkFile', {
        uri: selectedFile.uri,
        type: selectedFile.type,
        name: selectedFile.name,
      });

      const response = await fetch('https://alpha-cargo.kg/api/payment', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        Alert.alert('Успех', 'Платеж успешно отправлен', [
          {text: 'OK', onPress: () => navigation.goBack()},
        ]);
      } else {
        const errorData = await response.json();
        Alert.alert(
          'Ошибка',
          errorData.message || 'Не удалось отправить платеж',
        );
      }
    } catch (error) {
      console.error('Error submitting payment:', error);
      Alert.alert('Ошибка', 'Не удалось отправить платеж');
    } finally {
      setIsLoading(false);
    }
  };

  if (!paymentList) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Загрузка...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{flex: 1, position: 'relative'}}>
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
        <Text
          style={{
            fontSize: 30,
            fontWeight: '700',
            marginTop: 20,
            fontFamily: 'Exo 2',
            color: '#333',
          }}>
          Реквизиты
        </Text>
      </View>

      <View style={styles.container}>
        <View style={styles.bankHeader}>
          <Text style={styles.bankName}>{paymentList.header_title}</Text>
          {paymentList.logo && (
            <Image
              source={{
                uri: `https://alpha-cargo.kg/uploads/${paymentList.logo}`,
              }}
              style={styles.bankLogo}
              resizeMode="contain"
            />
          )}
        </View>

        {paymentList.imagePath && (
          <View style={styles.qrContainer}>
            <Image
              source={{
                uri: `https://alpha-cargo.kg/uploads/${paymentList.imagePath}`,
              }}
              style={styles.qrCode}
              resizeMode="contain"
            />
            <Text style={styles.qrLabel}>QR для оплаты</Text>
          </View>
        )}

        <View style={styles.infoContainer}>
          <Text style={styles.label}>Реквизиты для оплаты:</Text>
          <Text style={styles.value}>
            {paymentList.description
              .replace(/<p>|<\/p>/g, '')
              .replace(/<br\s*\/?>/g, '\n')
              .split('\n')
              .filter(line => line.trim() !== '')
              .map((line, index) => (
                <Text key={index}>
                  {line}
                  {'\n'}
                </Text>
              ))}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: '600',
              lineHeight: 23,
              fontFamily: 'Exo 2',
            }}>
            Cумма к оплате: {sum} р.
          </Text>
        </View>

        <View style={styles.uploadSection}>
          <Text style={styles.uploadLabel}>Загрузить чек об оплате:</Text>
          <TouchableOpacity style={styles.fileButton} onPress={pickDocument}>
            <Text style={styles.fileButtonText}>
              {selectedFile ? selectedFile.name : 'Выбрать файл'}
            </Text>
          </TouchableOpacity>

          {selectedFile && (
            <Text style={styles.fileName}>
              Выбран файл: {selectedFile.name}
            </Text>
          )}
        </View>

        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Сумма платежа:</Text>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={setAmount}
            placeholder="Введите сумму"
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
        </View>

        {/* <TouchableOpacity
          style={[styles.submitButton, isLoading && styles.disabled]}
          onPress={submitPayment}
          disabled={isLoading}>
          <Text style={styles.submitButtonText}>
            {isLoading ? 'Отправка...' : 'Отправить чек'}
          </Text>
        </TouchableOpacity> */}
        <ButtonCustom
          title={isLoading ? 'Отправка...' : 'Отправить чек'}
          onClick={submitPayment}
          isLoading={isLoading}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  bankHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  bankName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    fontFamily: 'Exo 2',
  },
  bankLogo: {
    width: 60,
    height: 40,
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  qrCode: {
    width: 250,
    height: 250,
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 10,
    padding: 10,
  },
  qrLabel: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  infoContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    lineHeight: 23,
  },
  uploadSection: {
    marginBottom: 20,
  },
  uploadLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    fontWeight: '600',
  },
  fileButton: {
    backgroundColor: '#E8E8E8',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCC',
    borderStyle: 'dashed',
  },
  fileButtonText: {
    color: '#555',
    fontSize: 16,
  },
  fileName: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  disabled: {
    backgroundColor: '#A5D6A7',
  },
  amountSection: {
    marginBottom: 20,
  },
  amountLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    fontWeight: '600',
  },
  amountInput: {
    backgroundColor: '#F8F8F8',
    borderWidth: 1,
    borderColor: '#E1E1E1',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
    color: '#333',
  },
});
