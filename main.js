function main() {

  // 1. スプレッドシートの情報を取得
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetValues = competencyValues(ss);
  const newDoc = targetNewDoc();

  writeToDoc(sheetValues, newDoc);

  Logger.log('転記が完了しました。');
  SpreadsheetApp.getUi().alert('Googleドキュメントへの転記が完了しました。ログでURLを確認してください。');
}

function competencyValues(ss) {
  // '評価データシート' という名前のシートを対象とする（実際のシート名に変更してください）
  const sheet = ss.getSheetByName(CONFIG.COMPETENCY_ITEM);
  // データが2行目から始まっていると仮定（ヘッダーを除く）
  // A列:氏名, B列:評価項目1, C列:エピソード1, D列:評価項目2, E列:エピソード2 ... と仮定
  const dataRange = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn());
  return dataRange.getValues(); // シートのデータを二次元配列で取得
}

function targetNewDoc() {

  // 2. 新しいGoogleドキュメントを作成
  const docName = CONFIG.COMPETENCY_ITEM + " - 評価まとめ"; // ドキュメント名をスプレッドシート名から生成
  const doc = DocumentApp.create(docName);
  let body = doc.getBody();
  Logger.log('Created document: ' + doc.getUrl()); // 作成されたドキュメントのURLをログに出力

  return body;
}

function writeToDoc(values, body) {

  // 3. 各行（各個人）のデータをドキュメントに書き込む
  values.forEach(function(row, index) {
    // Logger.log(row);
    // --- ここから下の列番号 (row[0], row[1] など) は、実際の列構成に合わせてください ---
    const name = row[0]; // A列の氏名を取得
    const competency1 = row[1]; // B列の評価項目1
    const episode1 = row[2]; // C列のエピソード1
    const competency2 = row[3]; // D列の評価項目2
    const episode2 = row[4]; // E列のエピソード2
    // 必要に応じて他の列も同様に取得

    // ドキュメントへの書き込み（整形）
    body.appendParagraph(name).setHeading(DocumentApp.ParagraphHeading.HEADING2); // 氏名を見出し2にする
    body.appendParagraph(competency1 + ":").setBold(true); // 評価項目名を太字に
    body.appendParagraph(episode1); // エピソード本文
    body.appendParagraph(competency2 + ":").setBold(true); // 評価項目名を太字に
    body.appendParagraph(episode2); // エピソード本文
    // 必要に応じて他の項目も書き込む

    // 最後の人でなければ区切り線を入れる
    if (index < values.length - 1) {
      body.appendHorizontalRule(); // 区切り線
    }
    // --- ここまでの書き込み処理を、データ構造に合わせて調整 ---
  });
}
