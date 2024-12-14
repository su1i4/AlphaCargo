import React from 'react';
import {StyleSheet, View, TextInput, Button, Text} from 'react-native';
import Header from '../../screens/Header';
import SingleUser from '../../assets/icons/SingleUser';
import {useNavigation} from '@react-navigation/native';
import {usePostFranchiseMutation} from '../../services/base.service';
import {useForm, Controller} from 'react-hook-form';

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
      console.log('Response:', response);
      reset(); // Сброс формы после успешной отправки
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        id="Orders"
        text="Франшиза"
        Right={SingleUser}
        func={() => navigation.navigate('Profile')}
        isSearch={false}
      />

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

        <Button
          title={isLoading ? 'Отправка...' : 'Отправить'}
          onPress={handleSubmit(onSubmit)}
          disabled={isLoading}
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
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
