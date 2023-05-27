import { query, collection, onSnapshot, deleteDoc } from "firebase/firestore";
import { database } from "../../../../../services/firebase";
import { DATABASE_NAME_ALBUM} from "../../../../../services/firebase/database";

const songQuery = query(collection(database, DATABASE_NAME_ALBUM));
onSnapshot(songQuery, snapshot => {
    const collection = [];
    snapshot.forEach(doc => {
        collection.push({ ...doc.data(), id: doc.id });
    });
    renderDom(collection);
});

function renderDom(albums) {
    const _html = albums.map(album => (
        `<tr>
            <td>${album.name_album}</td>
            <td>${album.release_at}</td>
            <td>
                <button>Delete</button>
                <button>Edit</button>
            </td>
        </tr>`
    ));

    document.querySelector('.table-data').innerHTML = _html.join('');
}