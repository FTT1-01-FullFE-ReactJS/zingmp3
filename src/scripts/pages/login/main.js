import Cookies from 'js-cookie';
import { auth, FacebookAuthProvider, signInWithPopup } from '../../../services/firebase';

Cookies.set('foo', 'bar');
const provider = new FacebookAuthProvider();
const facebookLoginButton = document.getElementById('login-facebook-button');

facebookLoginButton.addEventListener('click', async function () {
    const data = await signInWithPopup(auth, provider);
    handleFBLogin(data);
});

function handleFBLogin(data) {
    // Clear cookie
    Cookies.remove('DataFromFb');
    Cookies.remove('accessTokenFromFb');
    //set cookie
    Cookies.set('DataFromFb', JSON.stringify(data.user), { expires: 7 });
    Cookies.set('accessTokenFromFb', data.user.accessToken, { expires: 7 });
    const token = Cookies.get('accessTokenFromFb');
    if (token == null ) {
        window.location.href = 'login.html'
    } else {
        window.location.href = 'discover.html'
    }
};
