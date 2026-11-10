import { DM_Sans } from "next/font/google";

const bodyFont = DM_Sans({ subsets: ["latin"], variable: "--nandi-body" });

export const nandiFarmFonts = bodyFont.variable;
