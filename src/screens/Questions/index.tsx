import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
} from 'react-native';
import Header from '../Header';
import Back from '../../assets/icons/Back';
import {useNavigation} from '@react-navigation/native';

const AccordionItem = ({question, answer}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [heightAnim] = useState(new Animated.Value(0));

  const toggleAccordion = () => {
    if (isOpen) {
      Animated.timing(heightAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsOpen(false));
    } else {
      setIsOpen(true);
      Animated.timing(heightAnim, {
        toValue: 100,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={toggleAccordion}
        style={styles.questionContainer}>
        <Text style={styles.questionText}>{question}</Text>
      </TouchableOpacity>
      {isOpen && (
        <Animated.View style={[styles.answerContainer]}>
          <Text style={styles.answerText}>{answer}</Text>
        </Animated.View>
      )}
    </View>
  );
};

const Questions = () => {
  const navigation: any = useNavigation();
  const data = [
    {
      id: '1',
      question: 'Как отследить мою посылку?',
      answer:
        'По номеру накладной ― узнайте его у отправителя груза или в накладной: он указан сразу под штрихкодом. Номер накладной обычно состоит из 10 цифр и не содержит букв.',
    },
    {
      id: '2',
      question: 'Что означает статусы в отслеживании?',
      answer:
        'Cоздана накладная: накладная создана, но мы еще не получили посылку от отправителя; Принят в городе отправителя: посылку сдали в офис/забрал курьер и принес на склад; Отправлен в город-транзит: посылки уже нет на складе города отправителя. Она в пути в транзитный город промежуточная остановка для сортировки;В транзитном городе: отправление прибыло в транзитный город;Отправлен в город получателя: посылка на пути в город получателя;Принят в городе получателя: отправление в городе получателя, но к выдаче/доставке не готово;Возвращен на склад: проблемы в пути, груз возвращен на склад отправителя или на склад транзита;Неудачная попытка доставки: неудачная попытка доставки, груз возвращен на склад;Готов к выдаче: груз готов к выдаче курьеру или готова к получению в пункте выдачи;На доставке у курьера: груз находится у курьера, который едет к получателю;Вручен: посылка вручена получателю;Таможенное оформление: груз проходит таможенное оформление в стране отправления или назначения;Таможенное оформление завершено: груз прошел таможенное оформление и готов к дальнейшему перемещению.',
    },
    {
      id: '3',
      question: 'Как расчитать стоимость доставки?',
      answer:
        'Измерьте габариты и вес вашего груза Перейдите в раздел «Отправления» Нажмите кнопку «Оформить» Выберите город отправителя и получателя, укажите размер (примерный или точный) Вам будут предложены на выбор все подходящие тарифы Также вы можете выбрать дополнительные услуги, которые оплачиваются отдельно, например дополнительную упаковку или подъем на этаж.',
    },
  ];

  return (
    <>
      <Header
        Left={Back}
        funcLeft={() => navigation.navigate('Alpha')}
        id="questions"
        text="Вопросы и ответы"
      />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <AccordionItem question={item.question} answer={item.answer} />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  questionContainer: {
    padding: 15,
    backgroundColor: '#f8f8f8',
  },
  questionText: {
    fontSize: 15,
  },
  answerContainer: {
    overflow: 'hidden',
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  answerText: {
    fontSize: 14,
    color: '#333',
  },
});

export default Questions;
