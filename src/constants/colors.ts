import { TextStyle } from "react-native";

export const colors = {
  primary: "#007AFF",
  secondary: "#5856D6",
  success: "#34C759",
  warning: "#FF9500",
  error: "#FF3B30",

  background: "#FFFFFF",
  backgroundSecondary: "#F9FAFB",

  textPrimary: "#111111",
  textSecondary: "#666666",

  white: "#FFFFFF",
  primaryLight: "#E6F0FF",
  black: "#000000",

  gray50: "#FAFAFA",
  gray100: "#F5F5F5",
  gray200: "#EEEEEE",
  gray300: "#E0E0E0",
  gray400: "#BDBDBD",
  gray500: "#9E9E9E",
  gray600: "#757575",
  gray700: "#616161",
  gray800: "#424242",
  gray900: "#212121",
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const typography: { [key: string]: TextStyle } = {
  title1: {
    fontSize: 28,
    fontWeight: "700",
  },
  title2: {
    fontSize: 22,
    fontWeight: "600",
  },
  title3: {
    fontSize: 18,
    fontWeight: "600",
  },
  body: {
    fontSize: 16,
    fontWeight: "400",
  },
  callout: {
    fontSize: 14,
    fontWeight: "500",
  },
  caption: {
    fontSize: 12,
    fontWeight: "400",
  },
};
