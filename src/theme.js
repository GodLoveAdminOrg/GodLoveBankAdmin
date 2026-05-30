import { createTheme } from "@mui/material/styles";

// Brand palette — deep red from the existing design.
const BRAND = "#631D15";
const BRAND_LIGHT = "#a4534a";
const BRAND_DARK = "#42130f";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: BRAND, light: BRAND_LIGHT, dark: BRAND_DARK, contrastText: "#ffffff" },
    secondary: { main: "#F55227" },
    background: { default: "#f4f6f8", paper: "#ffffff" },
    success: { main: "#2e7d32" },
    error: { main: "#d32f2f" },
    divider: "#e9ebef",
    text: { primary: "#1f2329", secondary: "#5b6470" },
  },

  spacing: 8,
  shape: { borderRadius: 14 },

  typography: {
    fontFamily: '"Roboto","Helvetica Neue",Arial,sans-serif',
    h4: { fontWeight: 700, letterSpacing: "-0.5px" },
    h5: { fontWeight: 700, letterSpacing: "-0.3px" },
    h6: { fontWeight: 700 },
    subtitle1: { fontWeight: 600 },
    subtitle2: { fontWeight: 600 },
    body2: { lineHeight: 1.6 },
    button: { textTransform: "none", fontWeight: 600, letterSpacing: 0 },
  },

  // Softer, layered shadows for a premium feel (override the first few levels).
  shadows: [
    "none",
    "0 1px 2px rgba(16,24,40,0.06)",
    "0 2px 6px rgba(16,24,40,0.06)",
    "0 4px 12px rgba(16,24,40,0.08)",
    "0 6px 18px rgba(16,24,40,0.08)",
    "0 8px 24px rgba(16,24,40,0.10)",
    "0 10px 30px rgba(16,24,40,0.10)",
    "0 12px 36px rgba(16,24,40,0.12)",
    ...Array(17).fill("0 16px 48px rgba(16,24,40,0.14)"),
  ],

  components: {
    // Spacious / comfortable defaults
    MuiButton: {
      defaultProps: { size: "medium", disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingInline: 18,
          paddingBlock: 9,
          transition: "transform .15s ease, box-shadow .15s ease, background-color .15s ease",
          "&:hover": { transform: "translateY(-1px)" },
          "&:active": { transform: "translateY(0)" },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "transform .15s ease, background-color .15s ease, color .15s ease",
          "&:hover": { transform: "scale(1.12)" },
          "&:active": { transform: "scale(0.96)" },
        },
      },
    },
    MuiTextField: { defaultProps: { size: "medium" } },
    MuiOutlinedInput: { styleOverrides: { root: { borderRadius: 10 } } },
    MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
    MuiAppBar: {
      defaultProps: { elevation: 0, color: "inherit" },
      styleOverrides: { root: { borderBottom: "1px solid #e9ebef", backdropFilter: "saturate(180%) blur(6px)" } },
    },
    MuiPaper: { styleOverrides: { rounded: { borderRadius: 16 } } },
    MuiDialog: { styleOverrides: { paper: { borderRadius: 18 } } },
    MuiDialogTitle: { styleOverrides: { root: { fontSize: "1.15rem", fontWeight: 700, padding: "20px 24px" } } },
    MuiDialogContent: { styleOverrides: { root: { padding: "20px 24px" } } },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          transition: "background-color .2s ease, transform .15s ease",
          "&:hover": { transform: "translateX(2px)" },
        },
      },
    },
    MuiTableCell: { styleOverrides: { root: { paddingTop: 14, paddingBottom: 14 } } },
    MuiTooltip: { styleOverrides: { tooltip: { fontSize: "0.75rem", borderRadius: 8 } } },
  },
});

export default theme;
