export type GlobalLogoutListener = () => void;
export class GlobalLogout {
  private static listeners: GlobalLogoutListener[] = [];
  public static dispatch() {
    this.listeners.forEach((it) => it());
  }
  public static addListener(listener: GlobalLogoutListener) {
    this.listeners.push(listener);
  }
  public static removeListener(listener: GlobalLogoutListener) {
    this.listeners.splice(this.listeners.indexOf(listener));
  }
}
