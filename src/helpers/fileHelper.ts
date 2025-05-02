import {useState} from 'react';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';
type FileURLType = {
  fileName: string | null;
  fileUrl: string;
};

const getUrlExtension = (url: string): string | undefined => {
  if (url) {
    const parts = url.split(/[#?]/)[0].split('.');
    const ext = parts.pop();
    return ext ? ext.trim() : undefined;
  }
  return undefined;
};

//convert the hook to a pure fun to open local and remote files
const useFileView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setFileUrl = ({fileName, fileUrl}: FileURLType) => {
    const localFile = `${RNFS.DocumentDirectoryPath}/${
      fileName + ''
    }${getUrlExtension(fileUrl)}`;
    const options = {
      fromUrl: fileUrl,
      toFile: localFile,
    };
    setIsLoading(true);
    RNFS.downloadFile(options)
      .promise.then(() => FileViewer.open(localFile))
      .then(() => {
        setIsLoading(false);
        // success
      })
      .catch(error => {
        // error
        console.log('error', error);
        setIsLoading(false);
      });
  };

  return {isLoading, setFileUrl};
};

export default useFileView;
