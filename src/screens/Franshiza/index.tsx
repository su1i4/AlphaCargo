import React from 'react';
import {StyleSheet, View, TextInput, Button, Text} from 'react-native';
import Header from '../../screens/Header';
import SingleUser from '../../assets/icons/SingleUser';
import {useNavigation} from '@react-navigation/native';
import {usePostFranchiseMutation} from '../../services/base.service';
import {useForm, Controller} from 'react-hook-form';
import Toast from 'react-native-toast-message';
import {ButtonCustom} from '../../components/UI/Buttons/Button';
import Back from '../../assets/icons/Back';

export default function Franshiza() {
  const [postFranchise, {isLoading}] = usePostFranchiseMutation();
  const navigation: any = useNavigation();

  const {control, handleSubmit, reset} = useForm({
    defaultValues: {
      region: '',
      city: '',
      address: '',
      fio: '',
      birthDate: '',
      phone: '',
      email: '',
      sourceInfo: '',
    },
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await postFranchise(data).unwrap();
      Toast.show({
        type: 'success',
        text1: 'Успех',
        text2: 'Франшиза успешно отправлено',
        visibilityTime: 3000,
      });
      reset();
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Ошибка отправки',
        text2: error?.data?.error?.message || 'error',
        visibilityTime: 3000,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header
        id="Orders"
        text="Франшиза"
        Left={Back}
        funcLeft={() => navigation.goBack()}
        isSearch={false}
      />
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 10,
          backgroundColor: '#E1E1E1',
        }}>
        <Text style={{color: 'black', fontSize: 17}}>
          Анкета для открытия франшизы Альфа Карго
        </Text>
      </View>
      <Text style={{paddingHorizontal: 10}}>
        Заполните форму и мы с вами свяжемся в ближайшее время
      </Text>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="region"
          render={({field: {onChange, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Регион"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="city"
          render={({field: {onChange, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Город"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="address"
          render={({field: {onChange, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Адрес"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="fio"
          render={({field: {onChange, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="ФИО"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="birthDate"
          render={({field: {onChange, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Дата рождения (ГГГГ-ММ-ДД)"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        <Controller
          control={control}
          name="phone"
          render={({field: {onChange, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Телефон"
              value={value}
              onChangeText={onChange}
              keyboardType="phone-pad"
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({field: {onChange, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
            />
          )}
        />

        <Controller
          control={control}
          name="sourceInfo"
          render={({field: {onChange, value}}) => (
            <TextInput
              style={styles.input}
              placeholder="Источник информации"
              value={value}
              onChangeText={onChange}
            />
          )}
        />

        {/* <Button
          title={isLoading ? 'Отправка...' : 'Отправить'}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
        /> */}
        <ButtonCustom
          title="Отправить"
          onClick={handleSubmit(onSubmit)}
          isLoading={isLoading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#8C8C8C',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
  },
});
