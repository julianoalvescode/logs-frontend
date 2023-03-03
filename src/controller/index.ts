import { format } from "date-fns";

import * as I from "./types";

class LogsFast implements I.LogsFast {
  private generateLog(type: I.Type) {
    const log = `: ${format(new Date(), "dd/MM/yyyy HH:mm:ss")}`;

    return I.TypeMessage[type] + log;
  }

  public log(params: I.Log): void {
    const isSave = params?.save?.isActivated;

    if (isSave) this.saveLogLocalStorage(params);

    console.log(
      "/-------------------------/",
      "\n",
      this.generateLog(params?.type),
      "\n",
      params?.message,
      "\n",
      "<------------------------->"
    );
  }

  // private saveLog(log: string, format: "text" | "json"): void {
  //   try {
  //     if (!log) throw new Error("Log is empty");
  //     if (format === "text") {
  //       const blob = new Blob([log], { type: "text/plain" });
  //       const url = URL.createObjectURL(blob);

  //       const link = document.createElement("a");
  //       link.setAttribute("href", url);
  //       link.setAttribute("download", "log.txt");
  //       link.click();
  //     } else if (format === "json") {
  //       const blob = new Blob([JSON.stringify(log)], { type: "text/plain" });
  //       const url = URL.createObjectURL(blob);

  //       const link = document.createElement("a");
  //       link.setAttribute("href", url);
  //       link.setAttribute("download", "log.json");
  //       link.click();
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // Save log in local storage

  public saveLogLocalStorage(params: I.Log): void {
    const isSave = params?.save?.isActivated;

    if (isSave) {
      const log = `${this.generateLog(params?.type)}: ${params?.message}`;

      const logs = localStorage.getItem("logs");
      if (logs) {
        const logsArray = JSON.parse(logs);
        logsArray.push(log);
        localStorage.setItem("logs", JSON.stringify(logsArray));
      } else {
        localStorage.setItem("logs", JSON.stringify([log]));
      }
    }
  }

  // Get logs from local storage and save in file (text or json)
  public getLogLocalStorage(format: "text" | "json"): void {
    const logs = localStorage.getItem("logs");
    if (logs) {
      const logsArray = JSON.parse(logs);

      if (format === "text") {
        const blob = new Blob(logsArray, { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "log.txt");
        link.click();
      } else if (format === "json") {
        const blob = new Blob([JSON.stringify(logsArray)], {
          type: "text/plain",
        });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "log.json");
        link.click();
      }
    }
  }
}

export const logsFast = new LogsFast();
