export interface LogsFast {
  log(params: Log): void;
}

export enum TypeMessage {
  "warn" = "⚠️ WARNING",
  "error" = "🔥 ERROR",
  "info" = "✅ INFO",
}

export type Log = {
  message: string;
  type: Type;
  save?: boolean;
  download?: {
    format: FormatDownload;
  };
};

export type FormatDownload = "text" | "json" | "pdf";

export type Type = "warn" | "error" | "info";
