import chalk from "chalk";
import { format } from "date-fns";

import * as I from "./types";

class LogsFast implements I.LogsFast {
  private generateLog(type: I.Type) {
    const log = `: ${format(new Date(), "dd/MM/yyyy HH:mm:ss")}`;

    return I.TypeMessage[type] + log;
  }

  public log(params: I.Log): void {
    const isSave = params?.save?.isActivated;

    if (isSave) this.saveLog(params?.message, params?.save?.format || "json");

    switch (params?.type) {
      case "warn":
        console.log(
          chalk.white.bgYellow.bold(
            this.generateLog(params?.type),
            "\n",
            params?.message
          )
        );
        break;
      case "error":
        console.log(
          chalk.white.bgRed.bold(
            this.generateLog(params?.type),
            "\n",
            params?.message
          )
        );
        break;
      case "info":
        console.log(
          chalk.white.bgBlue.bold(
            this.generateLog(params?.type),
            "\n",
            params?.message
          )
        );
        break;
      default:
        console.log(
          chalk.white.bgBlue.bold(
            this.generateLog(params?.type),
            "\n",
            params?.message
          )
        );
        break;
    }
  }

  private saveLog(log: string, format: "text" | "json"): void {
    try {
      if (!log) throw new Error("Log is empty");
      if (format === "text") {
        const blob = new Blob([log], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "log.txt");
        link.click();
      } else if (format === "json") {
        const blob = new Blob([JSON.stringify(log)], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "log.json");
        link.click();
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export const logsFast = new LogsFast();
