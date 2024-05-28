import CustomizedTable from "../../shared/CustomizedTable";
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Add } from "@mui/icons-material";
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
import {
  getTeachersPageData,
  createTeacherQuery,
  deleteTeacherQuery,
} from "../../../services/apollo/teachers/queries";

const Index = () => {
  const [chosenSubjects, setChosenSubjects] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const [teacherData, setTeacherData] = useState({
    firstName: "",
    lastName: "",
  });

  const [fetchedData, setFetchedData] = useState({
    teachers: [],
    subjects: [],
  });

  const { loading, error, data, refetch } = useQuery(getTeachersPageData);

  const [createTeacher] = useMutation(createTeacherQuery, {
    onCompleted: () => {
      refetch();
    },
  });

  const [deleteTeacher] = useMutation(deleteTeacherQuery, {
    onCompleted: () => {
      refetch();
    },
  });

  useEffect(() => {
    if (!loading && !error) {
      setFetchedData({
        teachers: data.teachers
          ? data.teachers.map((teacher) => {
              const { firstName, lastName, subjects, ...restProperties } =
                teacher;

              return {
                name: firstName + " " + lastName,
                subjects: subjects.map(({ title }) => title).join(", "),
                ...restProperties,
              };
            })
          : [],
        subjects: data.subjects ? data.subjects : [],
      });
    }
  }, [loading, error, data?.teachers, data?.subjects]);

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

  const handleTextInputChange = useCallback((event) => {
    setTeacherData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleCreateTeacher = useCallback(
    async (event) => {
      event.preventDefault();

      const variables = {
        ...teacherData,
        subjectIds: chosenSubjects.map((subject) => Number(subject.id)),
      };
      try {
        const response = await createTeacher({
          variables,
        });

        if (response.data?.createTeacher) {
          handleClose();
        } else {
          throw new Error("Ooops, something went wrong...");
        }
      } catch (e) {
        setErrorMessage("Ooops, something went wrong...");
        console.error(e.message);
      }
    },
    [chosenSubjects, createTeacher, teacherData],
  );

  const handleDelete = useCallback(
    async (id) => {
      try {
        const response = await deleteTeacher({
          variables: {
            id,
          },
        });

        if (!response.data?.deleteTeacher) {
          throw new Error("Ooops, something went wrong...");
        }
      } catch (e) {
        console.error(e.message);
      }
    },
    [deleteTeacher],
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <CustomizedTable
            columns={["Name", "Subjects", "id"]}
            rows={fetchedData.teachers}
            onDelete={handleDelete}
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
        onSubmit={handleCreateTeacher}
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
          onChange={handleTextInputChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="lastName"
          label="Last Name"
          id="lastName"
          autoComplete="lastName"
          onChange={handleTextInputChange}
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
        {errorMessage ? (
          <Typography component="p" variant="p" color="red">
            {errorMessage}
          </Typography>
        ) : null}
      </Modal>
    </Container>
  );
};

export default Index;
