import fs from "fs";
import {
  flattenObject,
  getFilePath,
  loadSheet,
  locales,
  scanAllJsonFiles,
  sheetHeaderValues,
} from "./utils.mjs";

/**
 * json -> dict -> sheet
 */

function createDict(fileName) {
  const dict = {};

  locales.map((locale) => {
    const json = JSON.parse(fs.readFileSync(getFilePath(locale, fileName)));

    dict[locale] = flattenObject(json);
  });

  return dict;
}

function parseToSheetFormat(dict) {
  // 한국어 번역 키 구조를 기준으로 포맷 변경
  const rows = Object.keys(dict["ko"]).map((key) => {
    const messages = locales.reduce((acc, locale) => ({ ...acc, [locale]: dict[locale][key] }), {});
    return { key, ...messages };
  });

  return rows;
}

async function uploadSheet(sheet, dict) {
  const rows = parseToSheetFormat(dict);

  await sheet.loadCells();

  rows.forEach((row, i) => {
    const keyCell = sheet.getCell(i + 1, 0);
    keyCell.value = row.key;

    locales.forEach((locale, j) => {
      const cell = sheet.getCell(i + 1, j + 1);
      cell.value = row[locale];
    });
  });

  if (sheet.rowCount > rows.length) {
    await sheet.clearRows({ start: rows.length + 2 });
  }

  await sheet.saveUpdatedCells();
}

(async () => {
  console.info(
    "\x1b[33m ==========================================\n",
    "Upload translation resources to spreadsheet\n",
    "https://docs.google.com/spreadsheets/d/1H7MyuvpvalhSqBGgEcozpZkKAu8uOaA2YiLygXOmn9A\n",
    "==========================================\x1b[0m"
  );

  const doc = await loadSheet();

  const files = scanAllJsonFiles("messages/ko");

  files.forEach(async (fileName) => {
    let sheet = doc.sheetsByTitle[fileName];

    if (!sheet) {
      sheet = await doc.addSheet({ title: fileName, headerValues: sheetHeaderValues });
    }

    const dict = createDict(fileName);

    await uploadSheet(sheet, dict);
  });
})();
