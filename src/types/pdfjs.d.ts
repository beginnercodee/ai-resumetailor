// pdfjs.d.ts
import type { TextItem as PdfTextItem } from "pdfjs-dist/types/src/display/api";

declare module "pdfjs-dist/legacy/build/pdf" {
  export interface TextItem extends PdfTextItem {
    str: string;
  }

  export const GlobalWorkerOptions: {
    workerSrc: string;
  };

  export function getDocument(
    src: Uint8Array | string | { data: Uint8Array }
  ): {
    promise: Promise<{
      numPages: number;
      getPage: (pageNumber: number) => Promise<{
        getTextContent: () => Promise<{
          items: TextItem[];
        }>;
      }>;
    }>;
  };
}
