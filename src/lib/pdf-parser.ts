import { getDocumentProxy, extractText } from "unpdf";

export async function parsePDF(buffer: ArrayBuffer): Promise<string> {
  try {
    const pdf = await getDocumentProxy(new Uint8Array(buffer));
    const { text } = await extractText(pdf, { mergePages: true });
    return text;
  } catch (error) {
    throw new Error(
      `PDF parsing failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  }
}
