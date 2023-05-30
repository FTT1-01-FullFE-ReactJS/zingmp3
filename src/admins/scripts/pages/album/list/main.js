
import { DATABASE_NAME_ALBUM} from "../../../../../services/firebase/database";
import firebaseClient from "../../../../../services/firebase/firebaseClient";

firebaseClient.RenderDoms.showList(DATABASE_NAME_ALBUM, renderDom);
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