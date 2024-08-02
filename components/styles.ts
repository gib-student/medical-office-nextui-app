import { PT_Serif } from "next/font/google";

export const pt_serif_font = PT_Serif({
    weight: ["400", "700"],
    subsets: ["latin"],
  });
  

export const Styles = {
    subheading: "text-blue-900 text-2xl font-semibold",
    secondaryNavDiv:
    "my-4 mx-2 border-1 shadow-lg rounded-lg border-gray-300",
    secondaryNavButton:
    "p-11 rounded-lg relative capitalize text-lg font-bold text-blue-700",
    cardTitle: "text-blue-900 text-lg font-semibold"
}