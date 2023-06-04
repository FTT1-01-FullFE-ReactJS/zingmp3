import { DATABASE_NAME_ALBUM } from "../../../../../services/firebase/database";
import FireBaseClient from "../../../../../services/firebase/firebaseClient";

async function handle() {
    const firebaseClient = new FireBaseClient(DATABASE_NAME_ALBUM);
    let listAlbums = await firebaseClient.list();
    renderDom(listAlbums);
}
function renderDom(data) {
    const _html = data.map(album => (
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
handle();