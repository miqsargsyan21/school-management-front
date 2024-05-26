import { AppBar, Drawer, DrawerItem } from "./components";
import Copyright from "../../shared/Copyright";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  createTheme,
  IconButton,
  Typography,
  Toolbar,
  Divider,
  Badge,
  List,
  Link,
  Box,
} from "@mui/material";
import {
  EmojiPeople,
  ChevronLeft,
  Person,
  School,
  Menu,
  Book,
} from "@mui/icons-material";

const defaultTheme = createTheme();

const Index = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <Menu />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <Link href="/dashboard" underline="none" color="inherit">
                Dashboard
              </Link>
            </Typography>
            <Box display="flex" gap="10px">
              <Typography
                component="p"
                variant="p"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Name Surname
              </Typography>
              <Badge color="secondary">
                <Person />
              </Badge>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeft />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <DrawerItem
              href={"/dashboard/teachers"}
              icon={<School />}
              text="Teachers"
            />
            <DrawerItem
              href={"/dashboard/subjects"}
              icon={<Book />}
              text="Subjects"
            />
            <DrawerItem
              href={"/dashboard/pupils"}
              icon={<EmojiPeople />}
              text="Pupils"
            />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Outlet />
          <Copyright />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Index;
