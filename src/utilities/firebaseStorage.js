import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadFileToFirebase = async (file, locationName, id) => {
    if (!file) {
        throw new Error("No file provided");
    }

    const storage = getStorage();
    let fileName = `${locationName}_${id}`;
    let fileRef = ref(storage, `TripImages/${fileName}`);
    let url;
    let count = 0;

    while (true) {
        try {
            // Try to get the download URL of the file
            url = await getDownloadURL(fileRef);
            console.log('already in firebase');

            // File exists, append a number to the file name and try again
            count++;
            fileName = `${locationName}_${id}_${count}`;
            fileRef = ref(storage, `TripImages/${fileName}`);
        } catch (error) {
            // If error is 'storage/object-not-found', then file does not exist, and we can upload it
            if (error.code === 'storage/object-not-found') {
                try {
                    const snapshot = await uploadBytes(fileRef, file);
                    url = await getDownloadURL(snapshot.ref);
                    console.log("File uploaded successfully: ", fileName);
                    break;
                } catch (uploadError) {
                    console.error("Error uploading file: ", uploadError);
                    throw uploadError;
                }
            } else {
                console.error("Error checking file existence: ", error);
                throw error;
            }
        }
    }

    return url;
};
