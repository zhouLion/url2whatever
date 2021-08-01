import { SchemaMap, string } from "joi";

const VALID_FORMAT = ["letter", "legal", "tabloid", "ledger", "a0", "a1", "a2", "a3", "a4", "a5", "a6"];

export const pdfSchema: SchemaMap = {
  url: string().required().regex(/^https?:\/\//),
  format: string().default("a4"),
}

export const screenshotSchema: SchemaMap = {
  url: string().required().regex(/^https?:\/\//),
}
