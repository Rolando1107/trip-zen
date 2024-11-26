import { JwtPayload, jwtDecode } from "jwt-decode";
import type { UserData } from "../interfaces/UserData";

class AuthService {
  getProfile() {
    // return the decoded token
    return jwtDecode<UserData>(this.getToken());
  }

  loggedIn() {
    // return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    // return a value that indicates if the token is expired
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        return true;
      }
    } catch {
      return false;
    }
  }

  getToken(): string {
    // return the token
    const loggedUser = localStorage.getItem("id_token") || "";
    return loggedUser;
  }

  login(idToken: string) {
    // set the token to localStorage
    // redirect to the home page
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  logout() {
    // remove the token from localStorage
    // redirect to the login page
    localStorage.removeItem("id_token");
    window.location.reload();
  }
}

export default new AuthService();
