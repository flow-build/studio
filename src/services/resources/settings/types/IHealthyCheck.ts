import { IEngine } from "services/resources/settings/types/IEngine";
import { IMqtt } from "services/resources/settings/types/IMqtt";

export interface IHealthyCheck {
  message: string;
  version: string;
  engine: IEngine;
  "diagram-builder": string;
  mqtt: IMqtt;
}
