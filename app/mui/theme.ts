import { createTheme } from '@mui/material';
import { getDesignTokens } from "~/themes/main";

// Create a theme instance.
const theme = createTheme(getDesignTokens('light'));

export default theme;