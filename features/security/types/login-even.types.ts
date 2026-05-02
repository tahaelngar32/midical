type LoginStatus = "success" | "failed";
export interface LoginEvent {
  id: string;
  device: string;
  location: string;
  time: string;
  status: LoginStatus;
}
