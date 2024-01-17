import { getStorage, ref, uploadBytes, getDownloadURL  } from 'firebase/storage';

export const uploadFileToFirebase = async (file) => {
    if (!file) {
        throw new Error("No file provided");
    }
    const storage = getStorage();
    console.log("storage:",storage)
    console.log("filename:",file.name)
    const fileRef = ref(storage, file.name);
    console.log("storageref:",fileRef)
  
    try {
      const snapshot = await uploadBytes(fileRef, file);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
        console.error("Error uploading file: ", error);
        throw error;
    }
  };