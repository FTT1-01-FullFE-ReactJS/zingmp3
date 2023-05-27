import { query, collection, onSnapshot, deleteDoc } from "firebase/firestore";
import { database } from "../../../../../services/firebase";
import { DATABASE_NAME_ALBUM_SONG } from "../../../../../services/firebase/database";

const songQuery = query(collection(database, DATABASE_NAME_ALBUM_SONG));
onSnapshot(songQuery, snapshot => {
    const collection = [];
    snapshot.forEach(doc => {
        collection.push({ ...doc.data(), id: doc.id });
    });
    renderDom(collection);
});

function renderDom(albumSongs) {
    const _html = albumSongs.map(albumSong => (
        `<tr>
            <td>${albumSong.album_id}</td>
            <td>${albumSong.song_id}</td>
            <td>
                <button>Delete</button>
                <button>Edit</button>
            </td>
        </tr>`
    ));

    document.querySelector('.table-data').innerHTML = _html.join('');
}