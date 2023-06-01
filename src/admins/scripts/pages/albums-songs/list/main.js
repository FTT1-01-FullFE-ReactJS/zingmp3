import { DATABASE_NAME_ALBUM_SONG } from "../../../../../services/firebase/database";
import { showList } from "../../../common/helpers";

showList(DATABASE_NAME_ALBUM_SONG, renderDom);
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