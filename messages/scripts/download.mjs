import fs from "fs";
import { loadSheet, locales, parseFlattenedObject, scanAllJsonFiles } from "./utils.mjs";

/**
 * sheet -> dict -> json
 */

const downloadSheet = async (sheet) => {
  const rows = await sheet.getRows();

  const dict = locales.reduce((acc, locale) => ({ ...acc, [locale]: {} }), {});

  locales.forEach((locale) => {
    rows.forEach((row) => {
      const [key, message] = [row.get("key"), row.get(locale)];

      dict[locale][key] = message;
    });
  });

  return dict;
};

const rewriteJson = (fileName, dict) => {
  locales.map((locale) => {
    const json = parseFlattenedObject(dict[locale]);

    fs.writeFileSync(`messages/${locale}/${fileName}.json`, JSON.stringify(json, undefined, 2));
  });
};

(async () => {
  console.info(
    "\x1b[33m ==========================================\n",
    "Download translation resources from spreadsheet\n",
    "https://docs.google.com/spreadsheets/d/1H7MyuvpvalhSqBGgEcozpZkKAu8uOaA2YiLygXOmn9A\n",
    "==========================================\n\x1b[0m"
  );

  const doc = await loadSheet();

  const files = scanAllJsonFiles("messages/ko");

  files.forEach(async (fileName) => {
    const sheet = doc.sheetsByTitle[fileName];

    if (!sheet) return;

    const dict = await downloadSheet(sheet);

    rewriteJson(fileName, dict);
  });
})();
