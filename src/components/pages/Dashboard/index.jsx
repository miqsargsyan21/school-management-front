import {
  CardActions,
  CardContent,
  Typography,
  Container,
  Card,
  Link,
} from "@mui/material";

const Index = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Card
        variant="outlined"
        sx={{ padding: 4, borderRadius: 4, textAlign: "center" }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 20 }} variant="body2">
            Welcome to the Dashboard
          </Typography>
        </CardContent>
        <CardActions>
          <Link
            href="/"
            underline="none"
            color="inherit"
            sx={{ margin: "0 auto" }}
          >
            Go back to Home Page
          </Link>
        </CardActions>
      </Card>
    </Container>
  );
};

export default Index;
