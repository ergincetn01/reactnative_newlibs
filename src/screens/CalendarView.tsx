import {
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {Calendar, DateData} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import 'moment/locale/tr';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {MarkedDates} from 'react-native-calendars/src/types';
import {frequency} from '../helpers/calendarHelpers';

type EventType = {
  title: string;
  date: string;
};
LocaleConfig.locales['tr'] = {
  monthNames: [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ],
  monthNamesShort: [
    'Oca',
    'Şub',
    'Mar',
    'Nis',
    'May',
    'Haz',
    'Tem',
    'Ağu',
    'Eyl',
    'Eki',
    'Kas',
    'Ara',
  ],
  dayNames: [
    'Pazar',
    'Pazartesi',
    'Salı',
    'Çarşamba',
    'Perşembe',
    'Cuma',
    'Cumartesi',
  ],
  dayNamesShort: ['Paz', 'Pts', 'Sal', 'Çar', 'Per', 'Cum', 'Cts'],
  today: 'Bugün',
};

LocaleConfig.defaultLocale = 'tr';

const CalendarView = () => {
  const [events, setEvents] = useState<EventType[]>([]);

  const [title, setTitle] = useState<string>('');

  const [date_, setDate] = useState<string>(new Date().toString());

  const eventDatesYMD = events.map(e => moment(e.date).format('YYYY-MM-DD'));
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  const isToday = (d: string) => {
    return moment(new Date()).format('YYYY-MM-DD') === d;
  };

  useEffect(() => {
    updateMarkedDates();
  }, [eventDatesYMD.length, date_]);

  const isSelectedDate = (d: string): boolean => {
    return date_ === d;
  };

  const updateMarkedDates = useCallback(() => {
    const newMarked: MarkedDates = {};

    eventDatesYMD.forEach(e => {
      const count = frequency(eventDatesYMD, e);
      newMarked[e] = {
        dotColor: isToday(e) ? '#fff' : 'black',
        marked: true,
        type: count > 1 ? 'multi-dot' : 'dot',
        selected: isSelectedDate(e),
        selectedColor: isSelectedDate(e)
          ? isToday(e)
            ? 'red'
            : 'purple'
          : undefined,
      };
    });

    const selectedDateYMD = moment(date_).format('YYYY-MM-DD');
    if (!newMarked[selectedDateYMD]) {
      //date is selected and has no events
      newMarked[selectedDateYMD] = {
        selected: true,
        selectedColor: isToday(selectedDateYMD) ? 'blue' : 'lightblue',
      };
    } else {
      //date is selected and has event
      newMarked[selectedDateYMD].selected = true;
      newMarked[selectedDateYMD].selectedColor = isToday(selectedDateYMD)
        ? 'blue'
        : 'pink';
    }

    setMarkedDates(newMarked);
  }, [eventDatesYMD, date_]);

  const [pickerOpen, setPickerOpen] = useState(false);

  const showDatePicker = () => {
    setPickerOpen(true);
  };

  const hideDatePicker = () => {
    setPickerOpen(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(date.toString());
    hideDatePicker();
  };

  const handleAddEvent = () => {
    const newEvent: EventType = {
      date: date_ ? new Date(date_).toString() : '',
      title: title,
    };
    if (title.length > 0) {
      setEvents(prev => [...prev, newEvent]);
      Keyboard.dismiss();
      setTimeout(() => setTitle(''), 500);
    }
  };

  const deleteEvent = (evt: EventType) => {
    const filteredEvents: EventType[] = events.filter(e => e !== evt);
    setEvents(filteredEvents);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{paddingBottom: 20}}
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        paddingHorizontal: 12,
        paddingTop: 12,
        backgroundColor: '#fff',
      }}>
      <Calendar
        renderArrow={direction => (
          <Text style={{height: 20, width: 30}}>
            {direction === 'left' ? '<---' : '--->'}{' '}
          </Text>
        )}
        headerStyle={{
          borderWidth: 0.7,
          borderColor: 'rgb(127,127,127)',

          justifyContent: 'center',
          paddingHorizontal: 4,
          paddingVertical: 4,
          borderRadius: 12,
        }}
        theme={{
          backgroundColor: '#690d0d',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#fff',
          todayBackgroundColor: 'lightgreen',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',

          disabledArrowColor: '#d9e1e8',
          monthTextColor: 'black',
          indicatorColor: 'blue',
          textDayFontFamily: 'monospace',
          textMonthFontFamily: 'monospace',
          textDayHeaderFontFamily: 'monospace',
          textDayFontWeight: '300',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '300',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 16,
        }}
        markedDates={markedDates}
        enableSwipeMonths
        onDayPress={(date: DateData) => {
          setDate(date.dateString);
        }}
      />
      <View style={{flex: 1, alignItems: 'center', paddingTop: 20, rowGap: 15}}>
        <Text style={{alignSelf: 'flex-start'}}>Etkinlik Ekle</Text>
        <View
          style={{
            width: '100%',
            borderWidth: 1,
            borderRadius: 9,
            paddingHorizontal: 10,
            justifyContent: 'flex-start',
          }}>
          <TextInput
            style={{width: '100%'}}
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>
        <Text
          style={{
            width: '100%',
            borderRadius: 9,
            borderWidth: 1,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}>
          Seleced Date: {moment(date_).format('DD/MM/YYYY')}
        </Text>

        <Pressable
          style={{
            paddingHorizontal: 10,
            paddingVertical: 12,
            backgroundColor: 'lightgray',
            alignItems: 'center',
          }}
          onPress={handleAddEvent}>
          <Text>Etlinlk Ekle</Text>
        </Pressable>
        <Pressable
          style={{
            paddingHorizontal: 10,
            paddingVertical: 12,
            backgroundColor: 'lightgray',
            alignItems: 'center',
          }}
          onPress={() => setEvents([])}>
          <Text>Hepsini Sil</Text>
        </Pressable>
      </View>
      {eventDatesYMD.map((e, i) => (
        <Text key={i}>{e}</Text>
      ))}
      {events.length > 0 ? (
        <View style={{flex: 1, width: '100%'}}>
          {events.map((e, ix) => (
            <Pressable
              key={ix}
              onPress={() => deleteEvent(e)}
              style={{
                borderWidth: 0.4,
                width: '100%',
                paddingHorizontal: 12,
                paddingVertical: 5,
              }}>
              <Text>{e.title} </Text>
              <Text>{moment(e.date).format('DD/MM/YYYY')} </Text>
            </Pressable>
          ))}
        </View>
      ) : (
        <></>
      )}

      <DateTimePickerModal
        isVisible={pickerOpen}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </ScrollView>
  );
};

export default CalendarView;
