import * as FileSystem from 'expo-file-system';
import * as LOCAL from './Local_List';

const imgDir = FileSystem.cacheDirectory + 'image/';


async function ensureDirExists() {
    const dirInfo = await FileSystem.getInfoAsync(imgDir);
    if (!dirInfo.exists) {
      console.log("Image directory doesn't exist, creating...");
      await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
    }
  }

  export async function downloadImage(image) {
    try {
      await ensureDirExists();
      if (image != null) image = LOCAL.layAnh(image);
      console.log('Downloading image ...');
      await Promise.all(FileSystem.downloadAsync(image, imgDir + layAnh(image)));
      console.log(imgDir + layAnh(image));
      return imgDir + layAnh(image);
    } catch (e) {
      console.error("Couldn't download gif files:", e);
    }
  }


  export async function getImage(image) {
    await ensureDirExists();
  
    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    const fileUri = fileInfo + layAnh(image);

  
    if (!fileInfo.exists) {
      console.log("Image isn't cached locally. Downloading...");
      await FileSystem.downloadAsync(image, fileUri);
    }
  
    return fileUri;
  }

  export async function getImgContentUri(image) {
    return FileSystem.getContentUriAsync(await getImage(image));
  }

  export async function deleteImg(image) {
    console.log('Deleting image ' + image);
    const imgInfo = await FileSystem.getInfoAsync(image);
    if (imgInfo.exists) {
      await FileSystem.deleteAsync(image);
    }
  }

  export async function deleteAll() {
    console.log('Deleting all image files...');
    await FileSystem.deleteAsync(gifDir);
  }

  function layAnh(image) {
    var name = image.split("/");
    name = name[name.length - 1];
    return name;
  }