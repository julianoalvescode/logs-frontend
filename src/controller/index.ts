import { format } from "date-fns";

import * as I from "./types";

class LogsFast implements I.LogsFast {
  private generateLog(type: I.Type) {
    const log = `: ${format(new Date(), "dd/MM/yyyy HH:mm:ss")}`;

    return I.TypeMessage[type] + log;
  }

  public log(params: I.Log): void {
    const isSave = params?.save;

    if (isSave) this.saveLogLocalStorage(params);

    console.log(
      "<------------------------->",
      "\n",
      this.generateLog(params?.type),
      "\n",
      params?.message,
      "\n",
      "<------------------------->"
    );
  }

  public saveLogLocalStorage(params: I.Log): void {
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

  public downloadLog(format: I.FormatDownload): void {
    const logs = localStorage.getItem("logs");
    if (logs) {
      const logsArray = JSON.parse(logs);

      if (format === "text") {
        const item = localStorage.getItem("logs");
        if (!item) {
          console.error(`Item logs not found in localStorage.`);
          return;
        }

        const text = item?.replace(/,/g, "\n");
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "logs.txt");
        link.click();
      } else if (format === "json") {
        const blob = new Blob([JSON.stringify(logsArray)], {
          type: "text/plain",
        });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "logs.json");
        link.click();
      } else if (format === "pdf") {
        const blob = new Blob([JSON.stringify(logsArray)], {
          type: "application/pdf",
        });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "logs.pdf");
        link.click();
      }
    }
  }
}

export const logsFast = new LogsFast();
