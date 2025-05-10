import moment from 'moment';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Pressable,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {AgendaList, AgendaListProps} from 'react-native-calendars';

type AgendaEvent = {
  date: string;
  name: string;
};
const AgendaListView = () => {
  const [visible, setVisible] = useState<boolean>(false);
  const [activeEvent, setActiveEvent] = useState<AgendaEvent>({
    name: '',
    date: '',
  });
  const [sections, setSections] = useState([
    {
      title: '2025-05-10',
      data: [{name: 'Meeting with team', height: 60}],
    },
    {
      title: '2025-05-11',
      data: [{name: 'Project Deadline', height: 50}],
    },
    {
      title: '2025-05-12',
      data: [
        {name: 'Design Review Meeting', height: 55},
        {name: 'Backend Refactoring', height: 55},
        {name: 'Team Lunch', height: 55},
      ],
    },
    {
      title: '2025-05-13',
      data: [
        {name: 'Release Planning', height: 60},
        {name: '1:1 with Manager', height: 60},
      ],
    },
    {
      title: '2025-05-14',
      data: [],
    },
    {
      title: '2025-05-15',
      data: [
        {name: 'New Sprint Kickoff', height: 60},
        {name: 'Onboarding New Dev', height: 60},
        {name: 'Product Demo', height: 60},
      ],
    },
  ]);

  const deleteEvent = (eventName: string) => {
    const updatedSections = sections.map(section => {
      const updatedData = section.data.filter(item => item.name !== eventName);
      return {
        ...section,
        data: updatedData,
      };
    });

    setSections(updatedSections);
    setVisible(false);
  };

  const handleItemPress = (item: any) => {
    setActiveEvent({date: item.title, name: item.name});
    setVisible(true); // You can navigate, open modals, or trigger other logic here
  };

  return (
    <View style={styles.container}>
      <AgendaList
        sections={sections}
        renderItem={({item}) => (
          <TouchableOpacity
            onLongPress={() => handleItemPress(item)}
            onPress={() => handleItemPress(item)}
            style={styles.item}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        sectionStyle={styles.section}
      />
      <Modal
        onRequestClose={() => setVisible(false)}
        visible={visible}
        backdropColor={'rgba(0,0,0,0.6)'}>
        <View style={styles.centered}>
          <View style={styles.modalView}>
            <View style={{width: '100%', alignItems: 'flex-end'}}>
              <Pressable
                style={{
                  height: 25,
                  width: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  borderWidth: 1,
                }}
                onPress={() => setVisible(false)}>
                <Text>X</Text>
              </Pressable>
            </View>
            <Text>Title: {activeEvent.name}</Text>
            <Text>Date: {moment(activeEvent.date).format('DD MMMM YYYY')}</Text>
            <Pressable
              style={{paddingVertical: 10}}
              onPress={() => deleteEvent(activeEvent.name)}>
              <Text>Delete</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 7,
    elevation: 5,
  },
  section: {
    backgroundColor: '#f2f2f2',
    padding: 10,
  },
});

export default AgendaListView;
