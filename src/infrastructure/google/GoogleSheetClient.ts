import { JWT } from "google-auth-library";
import { google } from "googleapis";

export class GoogleSheetClient {
  private sheets: any;


  constructor() {

    // console.log('[ENV]', process.env);

    // console.log('[ENV DEBUG]', {
    //   client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    //   private_key: process.env.GOOGLE_PRIVATE_KEY,
    // });

    const auth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
      key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    this.sheets = google.sheets({ version: "v4", auth });
  }

  async getSheetValues(sheetId: string, range:string): Promise<string[][]> {

    // console.log('[env]', {
    //   email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    //   privateKey: process.env.GOOGLE_PRIVATE_KEY?.slice(0, 30), // 一部だけ出力
    //   sheetId,
    //   range,
    // });

    const response = await this.sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range,
    });

    return response.data.values ?? [];
  };
}
