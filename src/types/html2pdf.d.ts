declare module "html2pdf.js" {
  interface Html2PdfOptions {
    margin?: number | number[];
    filename?: string;
    image?: { type: string; quality: number };
    html2canvas?: { scale: number; useCORS: boolean };
    jsPDF?: { unit: string; format: string | number[]; orientation: string };
    // add more options as needed from html2pdf.js docs
    [key: string]: unknown; // fallback for untyped props
  }

  interface Html2Pdf {
    from: (element: HTMLElement) => Html2Pdf;
    save: () => void;
    set: (options: Html2PdfOptions) => Html2Pdf;
    outputPdf: () => unknown; // or more specific if known
  }

  const html2pdf: () => Html2Pdf;

  export default html2pdf;
}
