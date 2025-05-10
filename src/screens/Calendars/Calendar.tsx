import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {FC, useState} from 'react';
import {IMainStackScreens} from '../../navigation/types';
import CalendarView from './CalendarView';
import AgendaView from './Agenda';
type Props = IMainStackScreens<'Calendar'>;
type Mode = 'calendar' | 'agenda';
const Calendar: FC<Props> = () => {
  const [mode, setMode] = useState<Mode>('calendar');
  return (
    <View style={styles.main}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 15,
          justifyContent: 'center',
          columnGap: 12,
        }}>
        <TouchableOpacity
          style={{
            width: '40%',
            alignItems: 'center',
            backgroundColor: mode === 'calendar' ? 'lightblue' : '#fff',
            borderRadius: 12,
            borderWidth: 1,
            justifyContent: 'center',
            paddingHorizontal: 6,
            paddingVertical: 8,
          }}
          onPress={() => setMode('calendar')}>
          <Text>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '40%',
            backgroundColor: mode === 'agenda' ? 'lightblue' : '#fff',

            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 12,
            borderWidth: 1,
            paddingHorizontal: 6,
            paddingVertical: 4,
          }}
          onPress={() => setMode('agenda')}>
          <Text>Agenda</Text>
        </TouchableOpacity>
      </View>
      {mode === 'calendar' && <CalendarView />}
      {mode === 'agenda' && <AgendaView />}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default Calendar;
