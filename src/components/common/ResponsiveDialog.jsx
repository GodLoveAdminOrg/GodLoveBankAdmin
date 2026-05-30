import React from "react";
import { Dialog, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

/**
 * Dialog that goes full-screen on phones (≤ sm) and stays a centered
 * modal on tablet/desktop. Forwards all standard Dialog props.
 */
export default function ResponsiveDialog({ children, ...props }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Dialog fullScreen={fullScreen} {...props}>
      {children}
    </Dialog>
  );
}
