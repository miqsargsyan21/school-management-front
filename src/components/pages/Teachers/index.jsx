import { Container, Grid, Paper } from "@mui/material";

const Index = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          Teachers
        </Paper>
      </Grid>
    </Container>
  );
};

export default Index;
