import { initializedFirebase, firebaseConfigs } from "../configs/firebase";

const storage  = initializedFirebase.storage().ref();
const userId = '12345';

export const uploadFileToStorage = (dir:string,file:any) => new Promise((resolve,reject) => {
    var doUpload = true;
    var type = '';
    switch(dir){
        case 'videos':
            if(file.type.indexOf('video') === -1) {
                doUpload = false;
                reject({message: 'NOT_CORRECT_FILETYPE'});
            }
            if(file.size/1000000 > 10) {
                doUpload = false;
                reject({message: 'NOT_CORRECT_FILESIZE'})
            }
            type = 'video';
            break;
        case 'images':
            if(file.type.indexOf('image') === -1) {
                doUpload = false;
                reject({message: 'NOT_CORRECT_FILETYPE'})
            };
            if(file.size/1000000 > 2) {
                doUpload = false;
                reject({message: 'NOT_CORRECT_FILESIZE'})
            }
            type = 'image';
            break;
    }
    if(doUpload){
        const lib = storage.child(`${userId}/${dir}/`+file.name.split(' ').join('_'));
        lib.put(file)
        .then((snapshot) => resolve({...snapshot.metadata, type}))
        .catch(err => reject(err))
    }
})


export const getFilesFromStorage = (dir:string) => {
    const lib = storage.child(`${userId}/${dir}`);
    var type = '';
    if(dir === 'videos') type = 'video';
    if(dir === 'images') type = 'image';

    return lib.listAll()
    .then(snapshot => snapshot.items.map((item:any) => {
        item.type=type;
        return item;
    }))
}

export const generateUrlFromStoreate = (path:string) => `https://firebasestorage.googleapis.com/v0/b/${firebaseConfigs.storageBucket}/o/${path.split('/').join('%2F')}?alt=media&token=d18c738a-ce45-42d2-9b0c-908805d8e3d4`