/* eslint-disable @typescript-eslint/no-var-requires */

import fs from "fs";
import { JWT } from "google-auth-library";
import { GoogleSpreadsheet } from "google-spreadsheet";
import path from "path";
import creds from "../.credentials/koddy-418315-f1ceaa68067f.json" assert { type: "json" };

const spreadsheetId = "1H7MyuvpvalhSqBGgEcozpZkKAu8uOaA2YiLygXOmn9A";

export const locales = ["ko", "en"];

export const sheetHeaderValues = ["key", ...locales];

const serviceAccountAuth = new JWT({
  email: creds.client_email,
  key: creds.private_key,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export async function loadSheet() {
  const doc = new GoogleSpreadsheet(spreadsheetId, serviceAccountAuth);

  await doc.loadInfo();

  return doc;
}

export function scanAllJsonFiles(dir) {
  const files = [];

  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isDirectory()) {
      files.push(...scanAllJsonFiles(dir));
    } else if (path.extname(file).match(/\.json$/)) {
      files.push(file.replace(/\.json$/, ""));
    }
  });

  return files;
}

export function getFilePath(locale, fileName) {
  return `messages/${locale}/${fileName}.json`;
}

export function flattenObject(obj, prefix) {
  const flattened = {};

  Object.entries(obj).forEach(([key, value]) => {
    const fullKey = prefix ? `${prefix}/${key}` : key;

    if (typeof value === "string") {
      flattened[fullKey] = value;
    } else {
      Object.assign(flattened, flattenObject(value, fullKey));
    }
  });

  return flattened;
}

export function parseFlattenedObject(obj) {
  const nested = {};

  Object.entries(obj).forEach(([key, value]) => {
    const keys = key.split("/").filter((e) => e);

    let current = nested;
    keys.forEach((k, i) => {
      if (i === keys.length - 1) {
        current[k] = value;
        return;
      }

      if (!current[k]) {
        current[k] = {};
      }

      current = current[k];
    });
  });

  return nested;
}
