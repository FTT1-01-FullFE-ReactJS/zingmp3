import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { database } from '../../../../../services/firebase';
import { DATABASE_NAME_SONG } from '../../../../../services/firebase/database';

/**
 * Get song name
 * Get singer id
 * Get song image
 */
const songName = 'Le Bao Binh';
const singerId = 1;
const songImage = 'https://nld.mediacdn.vn/2020/5/5/tieu-su-ca-si-le-bao-binh-8616-1588640510243574370886.jpg';
const songUrl = 'https://www.youtube.com/watch?v=6IX9kq4Ovzc';

/**
 * Step 1: Listen submit form event
 * Step 2: Get information of songs
 * Step 2.1:
 *  - validate:
 *         - if name is empty: throw error "Song name is required!"
 *         - if singer id is empty: throw error "Song name is required!"
 *         - if song image is empty: throw error "Song name is required!"
 *         - if song link is empty: throw error "Song name is required!"
 * Step 3: Send that information to firebase
 * Step 4: 2 case
 *  - case: Create succeed:
 *      - step 1: Show message "Create song succeed!"
 *      - step 2: Redirect to 'admin-songs-list'
 *  - case: Create failure:
 *      - step 1: Show message "Create song failure!"
 *      - step 2: Reset form data
 */

async function sendRequestCreateSongToFirebase(songName, singerId, songImage, songUrl) {
    try {
        const songCollection = collection(database, DATABASE_NAME_SONG);

        /** @Promise songDocument */
        const songDocument = addDoc(songCollection, {
            name: songName,
            singer_id: singerId,
            song_url: songUrl,
            image_url: songImage,
            created_at: serverTimestamp()
        });

        const data = await songDocument;
        console.log('Admin Song Create succeed!', data);
    } catch (err) {
        console.error('Admin Song Create failure!', err);
    }
}


const demoButton = document.getElementById('demo-create-song');

demoButton.addEventListener('click', function() {
    sendRequestCreateSongToFirebase(songName, singerId, songImage, songUrl);
});