import {
  View,
  Text,
  PermissionsAndroid,
  Platform,
  Alert,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useRef, useState} from 'react';
import ImageCropPicker, {openCamera} from 'react-native-image-crop-picker';
import {Modalize} from 'react-native-modalize';

const ImagePicker = () => {
  const [image, setImage] = useState<string | null>(null);

  const takePhoto = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'We Need Camera Access',
          message: 'To take and upload photos, we need access to your camera.',
          buttonPositive: 'Allow',
          buttonNegative: 'Nope',
          buttonNeutral: 'Ask Me Later',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Denied!');
        return;
      }
    }

    openCamera({
      cropping: true,
    })
      .then(img => {
        setImage(img.path);
        closeSheet();
      })
      .catch(err => {
        Alert.alert('Errrrr');
        console.log('Camera error:', err);
      });
  };
  const closeSheet = () => {
    modalizeRef.current?.close();
  };

  const chooseFromGallery = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        {
          title: 'Gallery Access', // Custom title
          message: 'To upload, we need access to your gallery', // Custom message
          buttonPositive: 'Allow', // Confirm button text
          buttonNegative: 'Nope', // Cancel button text
          buttonNeutral: 'Ask Me Later', // Optional third button
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Denied!');
        return;
      }
    }

    ImageCropPicker.openPicker({
      cropping: true,
    })
      .then(img => {
        setImage(img.path);
        closeSheet();
      })
      .catch(err => {
        console.log('Picker error:', err);
      });
  };
  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  return (
    <View style={{flex: 1, alignItems: 'center', paddingTop: 20, rowGap: 15}}>
      {image ? (
        <Image
          style={{height: 250, width: 250}}
          resizeMode="cover"
          source={{uri: image}}
        />
      ) : (
        <></>
      )}

      <TouchableOpacity
        style={{
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderWidth: 1,
          borderRadius: 16,
        }}
        onPress={onOpen}>
        <Text>Öge Yükle</Text>
      </TouchableOpacity>
      <Modalize
        overlayStyle={{backgroundColor: 'rgba(0,0,0,0.8)'}}
        handlePosition="inside"
        handleStyle={{backgroundColor: 'grey'}}
        keyboardAvoidingBehavior="padding"
        modalHeight={100}
        ref={modalizeRef}>
        <View
          style={{
            paddingTop: 40,
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderWidth: 1,
              borderRadius: 16,
            }}
            onPress={chooseFromGallery}>
            <Text>Galeriden Seç</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderWidth: 1,
              borderRadius: 16,
            }}
            onPress={takePhoto}>
            <Text>Fotoğraf Çek</Text>
          </TouchableOpacity>
        </View>
      </Modalize>
    </View>
  );
};

export default ImagePicker;
