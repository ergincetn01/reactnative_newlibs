import React, {useRef, useState} from 'react';
import {
  View,
  Button,
  Alert,
  StyleSheet,
  Text,
  Pressable,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {pick, types} from '@react-native-documents/picker';
import FileViewer from 'react-native-file-viewer';
import {Modalize} from 'react-native-modalize';

type File = {
  name: string | null;
  uri: string;
  type: string | null;
  size: Number | null;
};

const App = () => {
  const [fileInfo, setfileInfo] = useState<File>({
    name: '',
    uri: '',
    type: '',
    size: null,
  });

  const pickDocument = async () => {
    try {
      const [{name, uri, type, size}] = await pick({
        type: [
          types.docx,
          types.doc,
          types.json,
          types.ppt,
          types.xls,
          types.xlsx,
          types.pdf,
        ],
      });
      setfileInfo({name: name, type: type, size: size, uri: uri});
    } catch (err: any) {
      if (err.code === 'OPERATION_CANCELED') {
        return;
      }
      Alert.alert('Error', JSON.stringify(err));
      Alert.alert('Hata!');
    }
  };

  const viewDetailsRef = useRef<Modalize>(null);

  const openDetails = () => {
    viewDetailsRef.current?.open();
  };

  const hide = () => {
    viewDetailsRef.current?.close();
  };
  const sizeInMB = (Number(fileInfo.size) / 1000000).toFixed(2);

  const handleOpenFile = () => {
    FileViewer.open(fileInfo.uri, {showOpenWithDialog: true})
      .then(() => {})
      .catch(() => {
        Alert.alert('Dosya açılamadı!');
      });
  };
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  return (
    <View style={styles.container}>
      {fileInfo.name !== '' ? (
        <>
          <View style={{width: '100%', marginVertical: 20}}>
            <Pressable
              onLongPress={() => setModalVisible(!modalVisible)}
              onPress={handleOpenFile}
              style={{
                alignItems: 'center',
                paddingVertical: 10,
                borderWidth: 1,
                borderRadius: 9,
                paddingHorizontal: 12,
              }}>
              <Text>{fileInfo.name} </Text>
            </Pressable>
          </View>
        </>
      ) : (
        <></>
      )}
      <Button title="Dosya Seç" onPress={pickDocument} />
      <Text style={{marginTop: 10}}>
        pdf, txt, doc, docx, pptx, xls, xlsx, json
      </Text>
      <Modalize
        handlePosition="inside"
        // ref={viewDetailsRef}
        modalHeight={250}
        panGestureComponentEnabled
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
          style: {
            backgroundColor: 'lightblue',
            alignSelf: 'center',
            padding: 20,
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
          },
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <Text style={{fontWeight: '800', fontSize: 16}}>Dosya Adı: </Text>
          <Text>{fileInfo.name} </Text>
          <Text style={{fontWeight: '800', fontSize: 16}}>Dosya Türü: </Text>

          <Text>{fileInfo.type} </Text>
          <Text style={{fontWeight: '800', fontSize: 16}}>Dosya URI: </Text>

          <Text>{fileInfo.uri} </Text>
          <Text style={{fontWeight: '800', fontSize: 16}}>Boyut: </Text>

          <Text>{sizeInMB} MB </Text>
        </View>
      </Modalize>
      <Modal
        onRequestClose={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        style={{flex: 1, justifyContent: 'center'}}
        backdropColor={'rgba(0,0,0,0.7)'}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                padding: 5,
                width: 36,
                alignItems: 'center',
                justifyContent: 'center',
                height: 36,
                borderRadius: 100,
                alignSelf: 'flex-end',
              }}
              onPress={() => setModalVisible(false)}>
              <Text style={{fontSize: 18}}>X</Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignSelf: 'center',
              }}>
              <Text style={{fontWeight: '800', fontSize: 16}}>Dosya Adı: </Text>
              <Text>{fileInfo.name} </Text>
              <Text style={{fontWeight: '800', fontSize: 16}}>
                Dosya Türü:{' '}
              </Text>

              <Text>{fileInfo.type} </Text>
              <Text style={{fontWeight: '800', fontSize: 16}}>Dosya URI: </Text>

              <Text>{fileInfo.uri} </Text>
              <Text style={{fontWeight: '800', fontSize: 16}}>Boyut: </Text>

              <Text>{sizeInMB} MB </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 25,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    width: '100%',
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default App;
