import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadSourceSans } from "@remotion/google-fonts/SourceSans3";

const { fontFamily: playfair } = loadPlayfair("normal", { weights: ["700", "900"], subsets: ["latin"] });
const { fontFamily: sourceSans } = loadSourceSans("normal", { weights: ["400", "600", "700"], subsets: ["latin"] });

export const FONTS = { display: playfair, body: sourceSans };
export const COLORS = {
  espresso: "#2C1810",
  cream: "#F5F0E8",
  sienna: "#A0522D",
  gold: "#C8A96E",
  latte: "#D4B896",
  dark: "#1A0F09",
};
