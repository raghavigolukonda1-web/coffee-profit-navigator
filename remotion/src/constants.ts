import { loadFont as loadPlayfair } from "@remotion/google-fonts/PlayfairDisplay";
import { loadFont as loadLato } from "@remotion/google-fonts/Lato";

const { fontFamily: playfair } = loadPlayfair("normal", { weights: ["400", "700", "900"], subsets: ["latin"] });
const { fontFamily: lato } = loadLato("normal", { weights: ["300", "400", "700", "900"], subsets: ["latin"] });

export const FONTS = { display: playfair, body: lato };
export const COLORS = {
  gold: "#A17C4E",
  goldLight: "#C9A96E",
  black: "#1A1A1A",
  darkBrown: "#2C2017",
  cream: "#F5F0E8",
  warmWhite: "#FAF8F5",
  espresso: "#3D2B1F",
  dark: "#0D0906",
};
