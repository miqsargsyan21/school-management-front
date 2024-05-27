import { Typography, TextField, Container, Button, Box } from "@mui/material";
import { signInQuery } from "../../../services/apollo/users/queries";
import Copyright from "../../shared/Copyright";
import { useCallback, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { useApp } from "../../../AppContext";

const Index = () => {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const [signIn] = useLazyQuery(signInQuery, {
    variables: signInData,
  });

  const { handleSetToken } = useApp();

  const onSubmit = useCallback(async (event) => {
    event.preventDefault();

    try {
      const response = await signIn();

      const token = response.data?.signIn?.token;

      if (token) {
        handleSetToken(token);
      } else {
        setErrorMessage("Ooops, something went wrong...");
      }
    } catch (e) {
      console.error(e.message);
    }
  }, []);

  const handleTextInputChange = useCallback(
    (event) => {
      if (errorMessage) {
        setErrorMessage("");
      }

      setSignInData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    },
    [errorMessage],
  );

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleTextInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleTextInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          {errorMessage ? (
            <Typography component="p" variant="p" color="red">
              {errorMessage}
            </Typography>
          ) : null}
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default Index;
