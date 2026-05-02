import { DeviceType } from "../config/device-type.config";
import { SessionStatus } from "../config/session-status.config";

export interface Session {
  id: string;
  device: string;
  location: string;
  type: DeviceType;
  status: SessionStatus;
  isCurrent: boolean;
  lastActive: string;
}
