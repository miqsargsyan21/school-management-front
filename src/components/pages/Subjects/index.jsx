import CustomizedTable from "../../shared/CustomizedTable";
import { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Add } from "@mui/icons-material";
import Modal from "../../shared/Modal";
import {
  Typography,
  Container,
  TextField,
  Button,
  Paper,
  Grid,
  Box,
} from "@mui/material";
import {
  getSubjectsPageData,
  createSubjectQuery,
  deleteSubjectQuery,
} from "../../../services/apollo/subjects/queries";

const Index = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [open, setOpen] = useState(false);

  const { loading, error, data, refetch } = useQuery(getSubjectsPageData);

  const [createSubject] = useMutation(createSubjectQuery, {
    onCompleted: () => {
      refetch();
    },
  });
  const [deleteSubject] = useMutation(deleteSubjectQuery, {
    onCompleted: () => {
      refetch();
    },
  });

  useEffect(() => {
    if (!loading && !error && data?.subjects?.length) {
      const modifiedSubjectsData = data.subjects.map((subject) => {
        const { teacher, ...restData } = subject;

        return {
          ...restData,
          teacher: teacher ? teacher.firstName + " " + teacher.lastName : "",
        };
      });
      setSubjects(modifiedSubjectsData);
    }
  }, [loading, error, data?.subjects]);

  const handleCreateSubject = useCallback(
    async (event) => {
      event.preventDefault();

      const variables = {
        title: newSubject,
      };
      try {
        const response = await createSubject({
          variables,
        });

        if (response.data?.createSubject) {
          handleClose();
        } else {
          throw new Error("Ooops, something went wrong...");
        }
      } catch (e) {
        setErrorMessage("Ooops, something went wrong...");
        console.error(e.message);
      }
    },
    [createSubject, newSubject],
  );

  const handleSubjectChange = useCallback((event) => {
    const {
      target: { value },
    } = event;

    setNewSubject(value);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleDelete = useCallback(
    async (id) => {
      try {
        const response = await deleteSubject({
          variables: {
            id,
          },
        });

        if (!response.data?.deleteSubject) {
          throw new Error("Ooops, something went wrong...");
        }
      } catch (e) {
        console.error(e.message);
      }
    },
    [deleteSubject],
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <CustomizedTable
            columns={["Title", "Teacher", "id"]}
            onDelete={handleDelete}
            rows={subjects}
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
        onSubmit={handleCreateSubject}
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
          onChange={handleSubjectChange}
        />
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
