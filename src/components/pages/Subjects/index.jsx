import CustomizedTable from "../../shared/CustomizedTable";
import { Add } from "@mui/icons-material";
import Modal from "../../shared/Modal";
import { useEffect, useState } from "react";
import {
  Typography,
  Container,
  TextField,
  Button,
  Paper,
  Grid,
  Box,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import { getSubjectsPageData } from "../../../services/apollo/subjects/queries";

const Index = () => {
  const [subjects, setSubjects] = useState([]);
  const [open, setOpen] = useState(false);

  const { loading, error, data } = useQuery(getSubjectsPageData);

  useEffect(() => {
    if (!loading && !error && data?.subjects?.length) {
      setSubjects(data.subjects);
    }
  }, [loading, error]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <CustomizedTable columns={["title", "id"]} rows={subjects} />
          <Box
            sx={{ display: "flex", justifyContent: "end", marginTop: "24px" }}
          >
            <Button
              sx={{
                width: "fit-content",
                borderRadius: "100%",
                padding: "16px",
              }}
              variant="contained"
              onClick={handleOpen}
              color="success"
            >
              <Add />
            </Button>
          </Box>
        </Paper>
      </Grid>
      <Modal
        open={open}
        handleClose={handleClose}
        onSubmit={() => {}}
        btnText="Add"
      >
        <Typography
          variant="h6"
          component="p"
          color="text.secondary"
          align="center"
        >
          Add new subject
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoComplete="Title"
        />
      </Modal>
    </Container>
  );
};

export default Index;
