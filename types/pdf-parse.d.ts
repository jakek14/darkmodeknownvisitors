declare module "pdf-parse" {
  export interface PDFParseResult {
    text: string;
    info?: unknown;
    metadata?: unknown;
    version?: string;
  }

  function pdfParse(
    data: Buffer | Uint8Array | ArrayBuffer,
    options?: unknown,
  ): Promise<PDFParseResult>;

  export default pdfParse;
}


