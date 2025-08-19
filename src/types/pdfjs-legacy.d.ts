declare module "pdfjs-dist/legacy/build/pdf" {
  export const GlobalWorkerOptions: { workerSrc: string };

  export function getDocument(
    src: Uint8Array | string | { data: Uint8Array }
  ): {
    promise: Promise<PDFDocumentProxy>;
  };

  export interface PDFDocumentProxy {
    numPages: number;
    getPage(pageNumber: number): Promise<PDFPageProxy>;
  }

  export interface PDFPageProxy {
    getTextContent(): Promise<TextContent>;
  }

  export interface TextContent {
    items: PDFTextItem[];
  }

  export interface PDFTextItem {
    str: string;
  }
}
