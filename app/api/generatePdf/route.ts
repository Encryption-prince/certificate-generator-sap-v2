import fs from "fs";
import path from "path";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { NextResponse } from "next/server";

const PAGE_WIDTH = 842.25;
const H_PADDING = 60;
const MAX_TEXT_WIDTH = PAGE_WIDTH - H_PADDING * 2;

const NAME_Y = 325;
const COLLEGE_Y = 230;

function fitFontSize(
  text: string,
  font: import("pdf-lib").PDFFont,
  maxSize: number,
  maxWidth: number
): number {
  let size = maxSize;
  while (size > 10) {
    if (font.widthOfTextAtSize(text, size) <= maxWidth) break;
    size -= 1;
  }
  return size;
}

export async function POST(req: Request) {
  const { Name, College } = await req.json();

  const templateBytes = fs.readFileSync(
    path.join(process.cwd(), "app/assets/template.pdf")
  );
  const nameFontBytes = fs.readFileSync(
    path.join(process.cwd(), "fonts/RumbleBrave.otf")
  );
  const collegeFontBytes = fs.readFileSync(
    path.join(process.cwd(), "fonts/PublicSans-Bold.ttf")
  );

  const pdfDoc = await PDFDocument.load(templateBytes);
  pdfDoc.registerFontkit(fontkit);

  const nameFont = await pdfDoc.embedFont(nameFontBytes);
  const collegeFont = await pdfDoc.embedFont(collegeFontBytes);

  const page = pdfDoc.getPages()[0];

  const nameFontSize = fitFontSize(Name, nameFont, 52, MAX_TEXT_WIDTH);
  const nameX = (PAGE_WIDTH - nameFont.widthOfTextAtSize(Name, nameFontSize)) / 2 + 70;

  page.drawText(Name, {
    x: nameX,
    y: NAME_Y,
    size: nameFontSize,
    font: nameFont,
    color: rgb(0.85, 0.65, 0.0),
  });

  const collegeFontSize = fitFontSize(College, collegeFont, 22, MAX_TEXT_WIDTH);
  const collegeX = (PAGE_WIDTH - collegeFont.widthOfTextAtSize(College, collegeFontSize)) / 2 + 80;

  page.drawText(College, {
    x: collegeX,
    y: COLLEGE_Y,
    size: collegeFontSize,
    font: collegeFont,
    color: rgb(0.09, 0.28, 0.47),
  });

  const pdfBytes = await pdfDoc.save();
  const base64 = Buffer.from(pdfBytes).toString("base64");

  return NextResponse.json({ base64 });
}
