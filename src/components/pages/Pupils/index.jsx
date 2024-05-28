import CustomizedTable from "../../shared/CustomizedTable";
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Add } from "@mui/icons-material";
import Modal from "../../shared/Modal";
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
import {
  getPupilsPageData,
  createPupilQuery,
  deletePupilQuery,
} from "../../../services/apollo/pupils/queries";

const Index = () => {
  const [chosenSubjects, setChosenSubjects] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  const [newPupil, setNewPupil] = useState({
    firstName: "",
    lastName: "",
  });

  const [fetchedData, setFetchedData] = useState({
    pupils: [],
    subjects: [],
  });

  const { loading, error, data, refetch } = useQuery(getPupilsPageData);

  const [createPupil] = useMutation(createPupilQuery, {
    onCompleted: () => {
      refetch();
    },
  });

  const [deletePupil] = useMutation(deletePupilQuery, {
    onCompleted: () => {
      refetch();
    },
  });

  useEffect(() => {
    if (!loading && !error) {
      setFetchedData({
        pupils: data.pupils
          ? data.pupils.map((pupil) => {
              const { firstName, lastName, subjects, ...restProperties } =
                pupil;
              console.log("subjects: ", subjects);

              return {
                name: firstName + " " + lastName,
                subjects: subjects
                  .map(({ subject: { title } }) => title)
                  .join(", "),
                ...restProperties,
              };
            })
          : [],
        subjects: data.subjects ? data.subjects : [],
      });
    }
  }, [loading, error, data?.pupils, data?.subjects]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSelectChange = useCallback(
    (event) => {
      const {
        target: { value },
      } = event;

      setChosenSubjects(
        fetchedData.subjects.filter((element) => value.includes(element.title)),
      );
    },
    [fetchedData.subjects],
  );

  const handleInputsChange = useCallback((event) => {
    setNewPupil((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleCreatePupil = useCallback(
    async (event) => {
      event.preventDefault();

      const variables = {
        ...newPupil,
        subjectIds: chosenSubjects.map((subject) => Number(subject.id)),
      };
      try {
        const response = await createPupil({
          variables,
        });

        if (response.data?.createPupil) {
          handleClose();
        } else {
          throw new Error("Ooops, something went wrong...");
        }
      } catch (e) {
        setErrorMessage("Ooops, something went wrong...");
        console.error(e.message);
      }
    },
    [chosenSubjects, createPupil, newPupil],
  );

  const handleDelete = useCallback(
    async (id) => {
      try {
        const response = await deletePupil({
          variables: {
            id,
          },
        });

        if (!response.data?.deletePupil) {
          throw new Error("Ooops, something went wrong...");
        }
      } catch (e) {
        console.error(e.message);
      }
    },
    [deletePupil],
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <CustomizedTable
            columns={["name", "subjects", "id"]}
            rows={fetchedData.pupils}
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
        onSubmit={handleCreatePupil}
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
          onChange={handleInputsChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="lastName"
          label="Last Name"
          id="lastName"
          autoComplete="lastName"
          onChange={handleInputsChange}
        />
        <FormControl fullWidth sx={{ marginTop: "16px" }}>
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
