/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const AppTheme = {
  colors: {
    primary: "#1E7BFF",
    primaryDeep: "#0D5EE0",
    accent: "#10233F",
    background: "#F4F8FF",
    surface: "#FFFFFF",
    surfaceMuted: "#ECF3FF",
    text: "#13213A",
    textMuted: "#5A6C88",
    success: "#19A870",
    danger: "#E2465A",
    border: "#D8E5FF",
  },
  typography: {
    hero: 40,
    h1: 30,
    h2: 24,
    h3: 20,
    body: 16,
    bodySmall: 14,
    caption: 12,
  },
  radius: {
    sm: 10,
    md: 16,
    lg: 22,
    xl: 30,
    pill: 999,
  },
  spacing: {
    xs: 6,
    sm: 10,
    md: 16,
    lg: 24,
    xl: 32,
  },
} as const;

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "Avenir Next",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "sans-serif",
    serif: "serif",
    rounded: "sans-serif-medium",
    mono: "monospace",
  },
  web: {
    sans: "'Avenir Next', 'Nunito Sans', 'Segoe UI', sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});















// export const AppTheme = {
//   colors: {
//     primary: "#1E7BFF",
//     primaryDeep: "#0D5EE0",
//     accent: "#10233F",
//     background: "#F4F8FF",
//     surface: "#FFFFFF",
//     surfaceMuted: "#ECF3FF",
//     text: "#13213A",
//     textMuted: "#5A6C88",
//     success: "#19A870",
//     danger: "#E2465A",
//     border: "#D8E5FF",
//   },