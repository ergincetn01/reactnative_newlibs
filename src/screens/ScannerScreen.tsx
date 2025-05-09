import React, {FC, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
  Linking,
} from 'react-native';
import {IMainStackScreens} from '../navigation/types';
import QRScanner from './QRScanner';
import {Modalize} from 'react-native-modalize';
import {copyToClipboard} from '../helpers/clipboardHelper';

const isValidUrl = async (t: string) => {
  const canOpen = await Linking.canOpenURL(t);
  if (canOpen) {
    return true;
  }
  return false;
};

const clr1 = 'mediumseagreen';

type Props = IMainStackScreens<'QRScanner'>;

const ScannerScreen: FC<Props> = () => {
  const modalRef = useRef<Modalize>(null);
  const [showQR, setShowQR] = useState(false);
  const [qrCode, setQrCode] = useState('');

  const openQRscanner = () => {
    setShowQR(true);
    setQrCode('');
  };

  const onQrRead = (qrtext: any) => {
    setQrCode(qrtext);
    setShowQR(false);
  };

  const openModal = () => {
    modalRef.current?.open();
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  const [isValid, setIsUrlValid] = useState(false);

  useEffect(() => {
    const checkUrl = async () => {
      const valid = await isValidUrl(qrCode);
      setIsUrlValid(valid);
    };

    checkUrl();
  }, [qrCode]);
  return (
    <View style={styles.page}>
      <View style={{width: '100%', paddingHorizontal: 20}}>
        {qrCode ? (
          <>
            <Pressable
              onPress={openModal}
              style={{
                paddingHorizontal: 12,
                borderRadius: 12,
                borderWidth: 1,
                width: '100%',
                paddingVertical: 10,
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16, color: 'black'}}>{qrCode}</Text>
            </Pressable>
            {/* {isValid ? (
              <Pressable
                onPress={() => Linking.openURL(qrCode)}
                style={{
                  paddingHorizontal: 12,
                  borderRadius: 12,
                  borderWidth: 1,
                  width: '100%',
                  paddingVertical: 10,
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 16, color: 'black'}}>{qrCode}</Text>
              </Pressable>
            ) : (
              <Text style={{fontSize: 16, color: 'black'}}>{qrCode}</Text>
            )} */}
          </>
        ) : null}
      </View>

      {showQR ? (
        <QRScanner onRead={onQrRead} />
      ) : (
        <View
          style={{
            height: '100%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => openQRscanner()} style={styles.btn}>
            <Text style={{color: clr1}}>Scan QR</Text>
          </TouchableOpacity>
        </View>
      )}
      <Modalize
        ref={modalRef}
        modalHeight={100}
        handlePosition="inside"
        scrollViewProps={{showsVerticalScrollIndicator: false}}>
        {isValid ? (
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 30,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              columnGap: 10,
            }}>
            <Pressable
              onPress={() => Linking.openURL(qrCode)}
              style={{
                paddingHorizontal: 12,
                borderRadius: 12,
                borderWidth: 1,
                width: '40%',
                paddingVertical: 10,
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16, color: 'black'}}>Open Link</Text>
            </Pressable>
            <Pressable
              style={{
                paddingHorizontal: 12,
                borderRadius: 12,
                borderWidth: 1,
                width: '40%',
                paddingVertical: 10,
                alignItems: 'center',
              }}
              onPress={() => copyToClipboard(qrCode)}>
              <Text>Copy to clipboard</Text>
            </Pressable>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 30,
              paddingHorizontal: 12,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Pressable
              style={{
                paddingHorizontal: 12,
                borderRadius: 12,
                borderWidth: 1,
                width: '40%',
                paddingVertical: 10,
                alignItems: 'center',
              }}
              onPress={() => copyToClipboard(qrCode, 'top')}>
              <Text style={{width: '100%'}}>Copy text to clipboard</Text>
            </Pressable>
          </View>
        )}
      </Modalize>
    </View>
  );
};

export default ScannerScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: '10%',
  },
  btn: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 16,
    width: '60%',
    borderWidth: 2,
    borderColor: clr1,
  },
  btnText: {
    color: clr1,
  },
});
