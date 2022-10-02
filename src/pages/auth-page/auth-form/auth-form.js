import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useForm, Controller, useFormState } from "react-hook-form";
import TextField from "@mui/material/TextField";
import "./auth-form.css";
import { loginValidation, passwordValidation } from "./validation";

const AuthForm = () => {
  const [authUser, setAuthUser] = useState(true);
  const { handleSubmit, control, reset } = useForm({
    mode: "onChange",
  });
  const { errors } = useFormState({ control });

  const onSubmit = (data) => {
    let url;
    if (authUser) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDiVmDmFu8P9QnCChSOxSnd1EJhS6ndGjg";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDiVmDmFu8P9QnCChSOxSnd1EJhS6ndGjg";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: data.login,
        password: data.password,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application-json",
      },
    }).then((res) => {
      if (res.ok) {
        alert(`${data.login} has signed ${authUser ? "in" : "up"}!`);
      } else {
        res.json().then((data) => {
          let errorMessage = "Something went wrong";
          if (data?.error?.message) {
            errorMessage = data.error.message;
          }
          alert(errorMessage);
        });
      }
    });
    reset();
  };

  const switchAuthModeHandler = () => {
    setAuthUser((prevState) => !prevState);
  };

  return (
    <div className="auth-form">
      <Typography variant="h4" component="div">
        {authUser ? "Sign in" : "Sign up"}
      </Typography>
      <Typography
        variant="subtitle1"
        component="div"
        gutterBottom={true}
        className="auth-form-subtitle"
      >
        In order to get access
      </Typography>
      <form className="auth-form-form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="login"
          defaultValue={""}
          rules={loginValidation}
          render={({ field }) => (
            <TextField
              label="Login"
              size="small"
              type="email"
              margin="normal"
              className="auth-form-input"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value}
              error={!!errors.login?.message}
              helperText={errors.login?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          defaultValue={""}
          rules={passwordValidation}
          render={({ field }) => (
            <TextField
              label="Password"
              size="small"
              margin="normal"
              type="password"
              className="auth-form-input"
              fullWidth={true}
              onChange={(e) => field.onChange(e)}
              value={field.value}
              error={!!errors.password?.message}
              helperText={errors.password?.message}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth={true}
          disableElevation={true}
          sx={{ marginTop: 2 }}
        >
          {authUser ? "Sign in" : "Sign up"}
        </Button>
        <Button variant="text" onClick={switchAuthModeHandler}>
          {authUser ? "Create new account" : "Sign in with an existing account"}
        </Button>
      </form>
    </div>
  );
};

export default AuthForm;
