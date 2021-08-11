import UserData from "../types/UserData";

export default interface IAuthService {
  isLoggedIn(): Promise<boolean>;
  getUserData(): Promise<UserData | null>;
  loginEmail(email: string, password: string): Promise<void>;
  logout(): Promise<void>;
}
