import React, { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import QuizIcon from "@mui/icons-material/Quiz";
import GroupsIcon from "@mui/icons-material/Groups";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import HubIcon from "@mui/icons-material/Hub";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ChatIcon from "@mui/icons-material/ChatBubbleOutlined";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import logo from "../../assets/logo.png";
import Reveal from "../common/Reveal";

const DRAWER_WIDTH = 264;
const RAIL_WIDTH = 76;

// Navigation model. Items with `children` render as collapsible groups.
const NAV = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  {
    label: "Ecommerce",
    icon: <ShoppingBagIcon />,
    children: [
      { label: "Products", icon: <Inventory2Icon />, path: "/product" },
      { label: "Orders", icon: <ReceiptLongIcon />, path: "/orders" },
    ],
  },
  {
    label: "Questionaire",
    icon: <QuizIcon />,
    children: [{ label: "Groups", icon: <GroupsIcon />, path: "/groups" }],
  },
  { label: "Media", icon: <VideoLibraryIcon />, path: "/media" },
  { label: "Core Values", icon: <HubIcon />, path: "/core-values" },
  { label: "Tools of Thinking", icon: <PsychologyIcon />, path: "/tools-of-thinking" },
  { label: "Chat", icon: <ChatIcon />, path: "/chat" },
  { label: "Subscription", icon: <CreditCardIcon />, path: "/subscription" },
];

// Flatten to resolve a page title from the current pathname.
const titleFor = (pathname) => {
  for (const item of NAV) {
    if (item.path && pathname.startsWith(item.path)) return item.label;
    for (const c of item.children || [])
      if (pathname.startsWith(c.path)) return c.label;
  }
  return "Admin";
};

export default function Layout({ children }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [collapsed, setCollapsed] = useState(false); // desktop mini-rail
  const [mobileOpen, setMobileOpen] = useState(false); // mobile temporary drawer
  const [openGroups, setOpenGroups] = useState(() =>
    // auto-open the group that contains the active route
    NAV.filter((i) => i.children?.some((c) => location.pathname.startsWith(c.path))).map(
      (i) => i.label
    )
  );
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [logoutOpen, setLogoutOpen] = useState(false);

  const expanded = isMobile ? true : !collapsed; // labels visible?
  const width = expanded ? DRAWER_WIDTH : RAIL_WIDTH;

  const toggleSidebar = () =>
    isMobile ? setMobileOpen((o) => !o) : setCollapsed((c) => !c);

  const toggleGroup = (label) => {
    if (!expanded) setCollapsed(false); // expand rail first
    setOpenGroups((g) =>
      g.includes(label) ? g.filter((x) => x !== label) : [...g, label]
    );
  };

  const go = (path) => {
    navigate(path);
    if (isMobile) setMobileOpen(false);
  };

  const isActive = (path) => location.pathname.startsWith(path);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLogoutOpen(false);
    navigate("/login", { replace: true });
  };

  const navItem = (item) => {
    // Group with children
    if (item.children) {
      const groupActive = item.children.some((c) => isActive(c.path));
      const isOpen = openGroups.includes(item.label);
      return (
        <Box key={item.label}>
          <Tooltip title={!expanded ? item.label : ""} placement="right" arrow>
            <ListItemButton
              onClick={() => toggleGroup(item.label)}
              selected={groupActive && !isOpen}
              sx={{ borderRadius: 2, mx: 1, mb: 0.5, minHeight: 44, justifyContent: expanded ? "initial" : "center" }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: expanded ? 2 : "auto", justifyContent: "center", color: "inherit" }}>
                {item.icon}
              </ListItemIcon>
              {expanded && <ListItemText primary={item.label} />}
              {expanded && (isOpen ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
          </Tooltip>
          <Collapse in={isOpen && expanded} timeout="auto" unmountOnExit>
            <List disablePadding>
              {item.children.map((c) => (
                <ListItemButton
                  key={c.path}
                  onClick={() => go(c.path)}
                  selected={isActive(c.path)}
                  sx={{ borderRadius: 2, mx: 1, mb: 0.5, pl: 4, minHeight: 40 }}
                >
                  <ListItemIcon sx={{ minWidth: 34, color: "inherit" }}>{c.icon}</ListItemIcon>
                  <ListItemText primary={c.label} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </Box>
      );
    }

    // Leaf item
    return (
      <Tooltip key={item.path} title={!expanded ? item.label : ""} placement="right" arrow>
        <ListItemButton
          onClick={() => go(item.path)}
          selected={isActive(item.path)}
          sx={{ borderRadius: 2, mx: 1, mb: 0.5, minHeight: 44, justifyContent: expanded ? "initial" : "center" }}
        >
          <ListItemIcon sx={{ minWidth: 0, mr: expanded ? 2 : "auto", justifyContent: "center", color: "inherit" }}>
            {item.icon}
          </ListItemIcon>
          {expanded && <ListItemText primary={item.label} />}
        </ListItemButton>
      </Tooltip>
    );
  };

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Brand */}
      <Toolbar sx={{ justifyContent: "center", py: 1 }}>
        <img src={logo} alt="God Love" style={{ height: expanded ? 56 : 40, transition: "height .2s" }} />
      </Toolbar>
      <Divider />

      {/* Nav */}
      <List sx={{ flexGrow: 1, py: 1, overflowY: "auto", overflowX: "hidden" }}>
        {NAV.map(navItem)}
      </List>

      <Divider />
      {/* Logout */}
      <List sx={{ py: 1 }}>
        <Tooltip title={!expanded ? "Logout" : ""} placement="right" arrow>
          <ListItemButton
            onClick={() => setLogoutOpen(true)}
            sx={{
              borderRadius: 2, mx: 1, minHeight: 44,
              color: "error.main",
              justifyContent: expanded ? "initial" : "center",
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: expanded ? 2 : "auto", justifyContent: "center", color: "inherit" }}>
              <LogoutIcon />
            </ListItemIcon>
            {expanded && <ListItemText primary="Logout" />}
          </ListItemButton>
        </Tooltip>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      {/* TOP APP BAR */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${width}px)` },
          ml: { md: `${width}px` },
          transition: theme.transitions.create(["width", "margin"], { duration: 200 }),
          bgcolor: "background.paper",
        }}
      >
        <Toolbar>
          <IconButton edge="start" onClick={toggleSidebar} sx={{ mr: 1 }}>
            {isMobile || collapsed ? <MenuIcon /> : <MenuOpenIcon />}
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            {titleFor(location.pathname)}
          </Typography>

          <Tooltip title="Notifications">
            <IconButton sx={{ mr: 1 }}>
              <Badge color="error" variant="dot">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Account">
            <IconButton onClick={(e) => setProfileAnchor(e.currentTarget)}>
              <Avatar sx={{ width: 34, height: 34, bgcolor: "primary.main" }}>A</Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={profileAnchor}
            open={Boolean(profileAnchor)}
            onClose={() => setProfileAnchor(null)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem disabled>Admin</MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                setProfileAnchor(null);
                setLogoutOpen(true);
              }}
              sx={{ color: "error.main" }}
            >
              <LogoutIcon fontSize="small" style={{ marginRight: 8 }} /> Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR — temporary on mobile, permanent mini-variant on desktop */}
      <Box component="nav" sx={{ width: { md: width }, flexShrink: { md: 0 } }}>
        {isMobile ? (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            ModalProps={{ keepMounted: true }}
            sx={{ "& .MuiDrawer-paper": { width: DRAWER_WIDTH, boxSizing: "border-box" } }}
          >
            {drawerContent}
          </Drawer>
        ) : (
          <Drawer
            variant="permanent"
            open
            sx={{
              "& .MuiDrawer-paper": {
                width,
                boxSizing: "border-box",
                overflowX: "hidden",
                borderRight: "1px solid #e7e7ea",
                transition: theme.transitions.create("width", { duration: 200 }),
              },
            }}
          >
            {drawerContent}
          </Drawer>
        )}
      </Box>

      {/* MAIN CONTENT */}
      <Box component="main" sx={{ flexGrow: 1, width: { md: `calc(100% - ${width}px)` }, minWidth: 0 }}>
        <Toolbar /> {/* spacer under fixed AppBar */}
        <Reveal key={location.pathname} sx={{ p: { xs: 2, md: 4 }, maxWidth: 1500, mx: "auto" }}>
          {children}
        </Reveal>
      </Box>

      {/* LOGOUT CONFIRM */}
      <Dialog open={logoutOpen} onClose={() => setLogoutOpen(false)}>
        <DialogTitle>Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out? It will end your current session.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setLogoutOpen(false)}>Cancel</Button>
          <Button onClick={handleLogout} variant="contained" color="error">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
