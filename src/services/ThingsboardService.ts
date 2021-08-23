import axios from "axios";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

import IAuthService from "./IAuthService";

const THINGSBOARD_SERVER = "https://app.luftio.com/tb/";
const APP_BACKEND_SERVER = "https://app.luftio.com/backend/";

export default class ThingsboardService implements IAuthService {
  async getUserData() {
    const token = await AsyncStorage.getItem("token");
    if (token == null) return null;
    const decoded = jwt_decode(token) as Record<string, any>;
    return {
      email: decoded.sub,
      fullName: decoded.firstName + " " + decoded.lastName,
      scopes: decoded.scopes,
      customerId: decoded.customerId,
    };
  }

  async isLoggedIn() {
    return (await this.getUserData()) != null;
  }

  async loginEmail(email: string, password: string) {
    console.log(email, password);
    const response = await axios.post(THINGSBOARD_SERVER + "api/auth/login", {
      username: email,
      password,
    });
    console.log(response.data.token);
    await AsyncStorage.setItem("token", response.data.token);
  }

  async acceptInvite(token: string, firstName: string, lastName: string, password: string) {
    const response = await axios.post(APP_BACKEND_SERVER + "account/acceptInvite", {
      token,
      firstName,
      lastName,
      password,
    });
    await AsyncStorage.setItem("token", response.data.token);
  }

  async forgetPasswordRequest(email: string) {
    const response = await axios.post(THINGSBOARD_SERVER + "api/noauth/resetPasswordByEmail", {
      email,
    });
    return response;
  }

  async forgetPasswordReset(resetToken: string, password: string) {
    const response = await axios.post(THINGSBOARD_SERVER + "api/noauth/resetPassword", {
      resetToken,
      password,
    });
    AsyncStorage.setItem("token", response.data.token);
  }

  async logout() {
    AsyncStorage.removeItem("token");
  }

  async getAuthHeader() {
    const token = await AsyncStorage.getItem("token");
    return { "X-Authorization": "Bearer " + token };
  }

  // Singleton
  private static instance: ThingsboardService;
  static getInstance(): ThingsboardService {
    if (!this.instance) this.instance = new ThingsboardService();
    return this.instance;
  }
}
