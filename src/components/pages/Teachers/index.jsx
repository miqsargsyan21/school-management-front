import { getTeachersPageData } from "../../../services/apollo/teachers/queries";
import CustomizedTable from "../../shared/CustomizedTable";
import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { useQuery } from "@apollo/client";
import Modal from "../../shared/Modal";
import {
  OutlinedInput,
  ListItemText,
  FormControl,
  InputLabel,
  Typography,
  Container,
  TextField,
  MenuItem,
  Checkbox,
  Select,
  Button,
  Paper,
  Grid,
  Box,
} from "@mui/material";

const Index = () => {
  const [chosenSubjects, setChosenSubjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [fetchedData, setFetchedData] = useState({
    teachers: [],
    subjects: [],
  });

  const { loading, error, data } = useQuery(getTeachersPageData);

  useEffect(() => {
    if (!loading && !error) {
      setFetchedData({
        teachers: data.teachers
          ? data.teachers.map((teacher) => {
              const { firstName, lastName, ...restProperties } = teacher;

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
          <CustomizedTable
            rows={fetchedData.teachers}
            columns={["Name", "id"]}
          />
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
          Add new teacher
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
            disabled={!fetchedData.subjects.length}
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={chosenSubjects.map((item) => item.title)}
            onChange={handleSelectChange}
            input={<OutlinedInput label="Subjects" />}
            renderValue={(selected) => selected.join(", ")}
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
