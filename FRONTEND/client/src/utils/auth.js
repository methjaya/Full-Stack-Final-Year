import decode from "jwt-decode";


class AuthService {

  getProfile() {
    return decode(this.getJwtToken());
  }

 
  isLoggedIn() {
    try {
      const token = this.getJwtToken();

      if (!token) {
        return false;
      }

      const decodedToken = decode(token);
      if (decodedToken.exp < Date.now() / 1000) {
        return false;
      }
      else {
        return true;
      }
    }
    catch (err) {
      console.log(err)
      return false;
    }
  }


  getJwtToken() {
    return localStorage.getItem("id_token");
  }

  getUserId() {
    return this.getProfile();
  }

  login(idToken) {
  
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

const Auth = new AuthService();
export default Auth;
