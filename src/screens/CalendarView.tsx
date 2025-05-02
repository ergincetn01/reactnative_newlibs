import {Text} from 'react-native';
import React, {useState} from 'react';
import {Calendar, DateData} from 'react-native-calendars';
import {LocaleConfig} from 'react-native-calendars';
import 'moment/locale/tr';

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
  const [date_, setDate] = useState<string>();
  return (
    <>
      <Calendar
        theme={{
          backgroundColor: '#690d0d',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#fff',
          todayBackgroundColor: 'blue',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',

          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
          disabledArrowColor: '#d9e1e8',
          monthTextColor: 'blue',
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
        markedDates={{
          [date_ ?? '']: {
            selected: true,
            selectedColor: '#00adf5',
            selectedTextColor: '#ffffff',
          },
        }}
        enableSwipeMonths
        onDayPress={(date: DateData) => {
          setDate(date.dateString);
        }}
      />
      <Text>{date_?.toString()} </Text>
    </>
  );
};

export default CalendarView;
