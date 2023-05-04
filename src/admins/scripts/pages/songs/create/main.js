import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database } from "../../../../../services/firebase";
import { DATABASE_NAME_ALBUM } from "../../../../../services/firebase/database"
import { v4 as uuidv4 } from 'uuid';

function createAlbum() {
    const createAlbumForm = document.querySelector('#form-wrapper');
    createAlbumForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const nameSongDom = document.querySelector('#name');
        const linkSongDom = document.querySelector('#link');
        const imageSongDom = document.querySelector('#image');
        if (!nameSongDom || !linkSongDom || !imageSongDom) {
            throw new Error('Không tìm thấy dom!');
        }
        const nameSongValue = nameSongDom.value;
        const linkSongValue = linkSongDom.value;
        const imageSongValue = imageSongDom.value;
        if (nameSongValue.trim().length === 0 || linkSongValue.trim().length === 0 || imageSongValue.trim().length === 0) {
            console.log('Không được để trống các ô');
        }
        sendRequestSongToFirebase(nameSongValue, linkSongValue, imageSongValue);
    });
};
async function sendRequestSongToFirebase(nameSongValue, linkSongValue, imageSongValue) {
    try {
        const songCollection = collection(database, DATABASE_NAME_ALBUM);
        const songDoc = addDoc(songCollection, {
            name_song: nameSongValue,
            link_song: linkSongValue,
            id_song: uuidv4(),
            image_song:imageSongValue,
            create_at: serverTimestamp()
        });
        const data = await songDoc;
        if (data) {
            $.toast('Toast message to be shown')
            window.location.href = 'list.html';
        }
    } catch (err) {
        alert('Create song failure!');
    }
};
createAlbum();