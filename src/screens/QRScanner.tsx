import React, {useState, useEffect, FC} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutChangeEvent,
  Dimensions,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';

type QRScannerProps = {
  onRead: (result: string | null) => void;
};

const scannerWidth = (Dimensions.get('screen').width * 2) / 3;

const QRScanner: FC<QRScannerProps> = ({onRead}) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [layoutReady, setLayoutReady] = useState(false);
  const [cameraKey, setCameraKey] = useState(0);

  const device = useCameraDevice('back');
  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      if (codes.length > 0 && codes[0].value) {
        onRead(codes[0].value);
      }
    },
  });

  useEffect(() => {
    const requestPermission = async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    };
    requestPermission();
  }, []);

  const handleLayout = (event: LayoutChangeEvent) => {
    const {width, height} = event.nativeEvent.layout;
    console.log('Container layout:', width, height);
    setLayoutReady(true);
    setCameraKey(prev => prev + 1);
  };

  if (!device || !hasPermission) {
    return (
      <View style={styles.page2}>
        <Text style={{color: '#fff'}}>
          Camera not available or permission denied.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container} onLayout={handleLayout}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Scan QR Code</Text>
      </View>
      <View style={styles.innerWrapper}>
        <View style={styles.cameraWrapper}>
          {layoutReady && (
            <Camera
              key={cameraKey}
              device={device}
              isActive={true}
              codeScanner={codeScanner}
              style={styles.camera}
            />
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => onRead(null)}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default QRScanner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    width: '100%',
  },
  innerWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraWrapper: {
    width: scannerWidth,
    height: scannerWidth,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    width: '40%',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: 'snow',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  closeText: {
    color: 'snow',
    fontSize: 16,
  },
  header: {
    height: '10%',
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  headerText: {
    fontSize: 16,
    color: 'white',
  },
  footer: {
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  page2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
