import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  Pressable,
} from 'react-native';
import Header from '../Header';
import Back from '../../assets/icons/Back';
import {useNavigation} from '@react-navigation/native';
import ArrowRight from '../../assets/icons/support/ArrowRight';
import CloseIcon from '../../assets/icons/CloseIcons';

const Questions = () => {
  const navigation: any = useNavigation();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const slideAnim = useRef(new Animated.Value(0)).current;

  const data = [
    {
      id: '1',
      question: 'Какие виды грузоперевозок вы предоставляете?',
      answer: 'Мы предлагаем автомобильные а также мультимодальные решения.',
    },
    {
      id: '2',
      question: 'Как рассчитать стоимость доставки груза?',
      answer:
        'Стоимость рассчитывается индивидуально и зависит от типа груза, расстояния, способа доставки и дополнительных услуг. Вы можете посчитать в калькуляторе, оставить заявку на сайте или связаться с нашим менеджером для получения точного расчета.',
    },
    {
      id: '3',
      question: 'Какой максимальный вес и объем груза вы принимаете?',
      answer:
        'Мы работаем как с малыми, так и с крупногабаритными грузами. Максимальные параметры зависят от выбранного типа транспорта. Для уточнения обратитесь к нашему специалисту.',
    },
    {
      id: '4',
      question: 'В какие города вы отправляете грузы?',
      answer:
        'Мы осуществляем перевозки во все города России. У нас есть 13 филиалов что сделает вашу доставку дешевле!',
    },
    {
      id: '5',
      question: 'Как долго занимает доставка груза?',
      answer:
        'Сроки доставки зависят от вашего выбранного города Например, доставка в Москву занимает от 4 дней',
    },
    {
      id: '6',
      question: 'Мы юридическое лицо как мы сможем сотрудничать?',
      answer:
        'Конечно! Мы сможем выставить счет фактуру и составить договор на экспедицию, Наши специалисты проконсультируют вас по конкретному случаю.',
    },
    {
      id: '7',
      question: 'Есть ли возможность отслеживать груз?',
      answer:
        'Да, мы предоставляем услугу отслеживания груза в режиме реального времени. Вы сможете получить информацию о местонахождении вашего груза через личный кабинет или по номеру накладной, а также у менеджера.',
    },
    {
      id: '8',
      question: 'Предоставляете ли вы услуги упаковки груза?',
      answer:
        'Да, мы предлагаем услуги профессиональной упаковки для обеспечения сохранности вашего груза во время транспортировки.',
    },
    {
      id: '9',
      question: 'Что делать, если груз поврежден при перевозке?',
      answer:
        'Если груз поврежден, необходимо сразу сообщить об этом нашему менеджеру и составить акт о повреждении. Мы поможем разобраться в ситуации и решить вопрос о компенсации',
    },
    {
      id: '10',
      question: 'Сможете ли забрать груз из цеха производителя или из рынка?',
      answer:
        'Специально для вас у нас есть услуга по забору груза, которая заберет упакует ваш товар и отправит в ваш город.Специально для вас у нас есть услуга по забору груза, которая заберет упакует ваш товар и отправит в ваш город.',
    },
  ];

  const openBottomSheet = (answer: string, question: string) => {
    setSelectedQuestion(question);
    setSelectedAnswer(answer);
    Animated.timing(slideAnim, {
      toValue: 400,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  const closeBottomSheet = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      easing: Easing.in(Easing.ease),
      useNativeDriver: false,
    }).start(() => setSelectedAnswer(null));
  };

  return (
    <View style={{flex: 1}}>
      <Header
        Left={Back}
        funcLeft={() => navigation.navigate('Alpha')}
        id="questions"
        text="Вопросы и ответы"
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Где моя посылка?</Text>
        </View>
        <View style={styles.list}>
          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.question}
              onPress={() => openBottomSheet(item.answer, item.question)}>
              <Text style={styles.questionText}>{item.question}</Text>
              <ArrowRight />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* BottomSheet */}
      {selectedAnswer && (
        <Animated.View style={[styles.bottomSheet, {height: slideAnim}]}>
          <View style={styles.bottomSheetContent}>
            <Text style={styles.answerText}>{selectedQuestion}</Text>
            <TouchableOpacity
              onPress={closeBottomSheet}
              style={{position: 'absolute', top: 15, right: 10}}>
              <CloseIcon size={26} />
            </TouchableOpacity>
            <Text style={{fontSize: 16}} >{selectedAnswer}</Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  list: {
    flexDirection: 'column',
    width: '100%',
  },
  question: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 8,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  questionText: {
    maxWidth: '90%',
    fontSize: 15,
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  bottomSheetContent: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'relative',
  },
  answerText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  closeButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default Questions;
