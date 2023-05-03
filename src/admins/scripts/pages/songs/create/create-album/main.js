import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database } from "../../../../../../services/firebase";
import { DATABASE_NAME_ALBUM } from "../../../../../.././services/firebase/database"
import { v4 as uuidv4 } from 'uuid';

function createAlbum() {
    const createAlbumForm = document.querySelector('#form-wrapper');
    createAlbumForm.addEventListener('submit', function(event){
        event.preventDefault();
        const albumNameValue = document.querySelector('#album-name').value;
        const albumReleaseAtValue = document.querySelector('#release-at').value
        sendRequestSongToFirebase(albumNameValue, albumReleaseAtValue);
    });
};
async function sendRequestSongToFirebase(albumNameValue, albumReleaseAtValue){
    try {
        const songCollection = collection(database, DATABASE_NAME_ALBUM);
        const songDoc = addDoc(songCollection, {
            name_album:albumNameValue,
            release_at:albumReleaseAtValue,
            id_album:uuidv4(),
            create_at:serverTimestamp()
        });
        const data = await songDoc;
        if( data ) {
            alert('Create song succeed!');
            window.location.href = 'list.html';
        }
    }    catch (err) {
        alert('Create song failure!');
    }
};
createAlbum();