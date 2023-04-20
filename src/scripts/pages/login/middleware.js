import Cookies from 'js-cookie';
function checkToken() {
    const accessToken = Cookies.get('userAccessToken');
   if(!accessToken) {
        window.location.href = 'login.html'
   }
};
export { checkToken };