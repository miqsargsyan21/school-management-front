import { getPupilsPageData } from "../../../services/apollo/pupils/queries";
import CustomizedTable from "../../shared/CustomizedTable";
import { Add } from "@mui/icons-material";
import Modal from "../../shared/Modal";
import { useEffect, useState } from "react";
import {
  OutlinedInput,
  ListItemText,
  FormControl,
  Typography,
  InputLabel,
  Container,
  TextField,
  MenuItem,
  Checkbox,
  Button,
  Select,
  Paper,
  Grid,
  Box,
} from "@mui/material";
import { useQuery } from "@apollo/client";

const Index = () => {
  const [chosenSubjects, setChosenSubjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [fetchedData, setFetchedData] = useState({
    pupils: [],
    subjects: [],
  });

  const { loading, error, data } = useQuery(getPupilsPageData);

  useEffect(() => {
    if (!loading && !error) {
      setFetchedData({
        pupils: data.pupils
          ? data.pupils.map((pupil) => {
              const { firstName, lastName, ...restProperties } = pupil;

              return {
                name: firstName + " " + lastName,
                ...restProperties,
              };
            })
          : [],
        subjects: data.subjects ? data.subjects : [],
      });
    }
  }, [loading, error]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;

    setChosenSubjects(
      fetchedData.subjects.filter((element) => value.includes(element.title)),
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <CustomizedTable columns={["name", "id"]} rows={fetchedData.pupils} />
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
          Add new pupil
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          autoComplete="First Name"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="lastName"
          label="Last Name"
          id="lastName"
          autoComplete="lastName"
        />
        <FormControl sx={{ width: "100%", marginTop: "16px" }}>
          <InputLabel id="demo-multiple-checkbox-label">Subjects</InputLabel>
          <Select
            value={chosenSubjects.map((item) => item.title)}
            renderValue={(selected) => selected.join(", ")}
            input={<OutlinedInput label="Subjects" />}
            disabled={!fetchedData.subjects.length}
            labelId="demo-multiple-checkbox-label"
            onChange={handleSelectChange}
            id="demo-multiple-checkbox"
            multiple
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 224,
                  width: 250,
                },
              },
            }}
          >
            {fetchedData.subjects.map(({ title }) => (
              <MenuItem key={title} value={title}>
                <Checkbox
                  checked={
                    !!chosenSubjects.some((element) => element.title === title)
                  }
                />
                <ListItemText primary={title} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Modal>
    </Container>
  );
};

export default Index;
