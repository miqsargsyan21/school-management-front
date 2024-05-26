import { Person, School } from "@mui/icons-material";
import {
  Badge,
  Box,
  Card,
  CardActions,
  CardContent,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";

const Index = () => {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Toolbar
        sx={{
          pr: "24px",
          backgroundColor: "#1976D2",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            color: "white",
          }}
        >
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Badge color="secondary">
              <School />
            </Badge>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              School Management Tool
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
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
        </Box>
      </Toolbar>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
        }}
      >
        <Card
          variant="outlined"
          sx={{ padding: 4, borderRadius: 4, textAlign: "center" }}
        >
          <CardContent>
            <Typography sx={{ fontSize: 20 }} variant="body2">
              You can check out Dashboard
            </Typography>
            <Typography sx={{ mb: 1.5, fontSize: 20 }} variant="body2">
              While our new features are in progress
            </Typography>
          </CardContent>
          <CardActions>
            <Link
              href="/dashboard"
              underline="none"
              color="inherit"
              sx={{ margin: "0 auto" }}
            >
              Go To Dashboard
            </Link>
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

export default Index;
