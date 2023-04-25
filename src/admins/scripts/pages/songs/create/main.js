import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database } from "../../../../../services/firebase";
import { DATABASE_NAME_SONG } from "../../../../../services/firebase/database";

const form = document.querySelector('#song-form');
form.addEventListener('submit', function(event){
    event.preventDefault();
    const nameValue = document.querySelector('#name').value;
    const idValue = document.querySelector('#singer_id').value;
    const linkValue = document.querySelector('#link').value;
    const imageValue = document.querySelector('#image').value;
    sendRequestSongToFirebase(nameValue, idValue, linkValue, imageValue);

});
async function sendRequestSongToFirebase(nameValue, idValue, linkValue, imageValue){
    try {
        const songCollection = collection(database, DATABASE_NAME_SONG);
        const songDoc = addDoc(songCollection, {
            name_song:nameValue,
            id_song:idValue,
            link_song:linkValue,
            image_song:imageValue,
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