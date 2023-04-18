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
    Cookies.set('user_access_token', data.user.accessToken, { expires: 7 });
    const token = Cookies.get('user_access_token');
    if(token) {
        window.location.href = '/'
    }
};


