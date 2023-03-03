export interface LogsFast {
  Log: any;
  log(params: Log): Promise<void>;
}

export enum TypeMessage {
  "warn" = "WARNING",
  "error" = "ERROR",
  "info" = "INFO",
}

export type Log = {
  message: string;
  type: Type;
  save?: {
    isActivated: boolean;
    format: "text" | "json";
  };
};

export type Type = "warn" | "error" | "info";
