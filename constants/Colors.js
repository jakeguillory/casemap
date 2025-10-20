export const Colors = {
  // Core accent colors
  primary: "#1DB954", // soft green (main accent)
  secondary: "#2F855A", // deeper forest green
  warning: "#D9534F",   // muted red for alerts
  success: "#28A745",   // optional for positive actions
  info: "#3BAFDA",      // cyan for secondary highlights

  dark: {
    text: "#D4D4D4",
    title: "#FFFFFF",
    /*background: "#141A16",*/      // very dark green-gray **** This was original default color ********
    background: "#062220",
    navBackground: "#1B211C",   // slightly lighter for contrast
    iconColor: "#8CA391",       // muted sage tone
    iconColorFocused: "#1DB954",// bright green when active
    uiBackground: "#1F2621",    // panels/cards
    border: "#2C332E",          // subtle edge
    nodePerson: "#3BAFDA",      // optional color variations for graph nodes
    nodeOrg: "#1DB954",
    nodeEvent: "#A1CF64",
  },

  light: {
    text: "#2E2E2E",
    title: "#111111",
    background: "#F3F6F4",      // pale gray-green
    navBackground: "#E8ECEA",   // slightly darker header/footer
    iconColor: "#66796A",       // muted green-gray
    iconColorFocused: "#1B4D2B",// dark forest green
    uiBackground: "#FFFFFF",    // cards/panels
    border: "#D0D5D2",          // neutral outline
    nodePerson: "#3BAFDA",
    nodeOrg: "#1DB954",
    nodeEvent: "#A1CF64",
  },
}