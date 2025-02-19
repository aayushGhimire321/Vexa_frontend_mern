import {
  CloseRounded,
  EmailRounded,
  PasswordRounded,
  Person,
  Visibility,
  VisibilityOff,
  TroubleshootRounded,
} from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTheme } from "styled-components";
import { IconButton, Modal } from "@mui/material";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { openSnackbar } from "../redux/snackbarSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import validator from "validator";
import { googleSignIn, signUp } from "../api/index";
import OTP from "./OTP";
import { useGoogleLogin } from "@react-oauth/google";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 360px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Title = styled.div`
  font-size: 22px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin: 16px 28px;
`;

const OutlinedBox = styled.div`
  height: 44px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.soft2};
  color: ${({ theme }) => theme.soft2};
  ${({ googleButton, theme }) =>
    googleButton &&
    `
    user-select: none; 
    gap: 16px;`}
  ${({ button, theme }) =>
    button &&
    `
    user-select: none; 
    border: none;
    background: ${theme.itemHover};
    color: '${theme.soft2}';`}
  ${({ activeButton, theme }) =>
    activeButton &&
    `
    user-select: none; 
    border: none;
    background: ${theme.primary};
    color: white;`}
  margin: 3px 20px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  padding: 0px 14px;
`;

const GoogleIcon = styled.img`
  width: 22px;
`;

const Divider = styled.div`
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.soft};
  font-size: 14px;
  font-weight: 600;
`;

const Line = styled.div`
  width: 80px;
  height: 1px;
  border-radius: 10px;
  margin: 0px 10px;
  background-color: ${({ theme }) => theme.soft};
`;

const TextInput = styled.input`
  width: 100%;
  border: none;
  font-size: 14px;
  border-radius: 3px;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.textSoft};
`;

const LoginText = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.soft2};
  margin: 20px 20px 38px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Span = styled.span`
  color: ${({ theme }) => theme.primary};
`;

const Error = styled.div`
  color: red;
  font-size: 10px;
  margin: 2px 26px 8px 26px;
  display: block;
  ${({ error, theme }) =>
    error === "" &&
    `display: none;`}
`;

const SignUp = ({ setSignUpOpen, setSignInOpen }) => {
  const [nameValidated, setNameValidated] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [credentialError, setcredentialError] = useState("");
  const [passwordCorrect, setPasswordCorrect] = useState(false);
  const [nameCorrect, setNameCorrect] = useState(false);
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const dispatch = useDispatch();

  const createAccount = () => {
    if (otpVerified) {
      dispatch(loginStart());
      setDisabled(true);
      setLoading(true);

      // Log the values to verify
      console.log({ name, email, password }); // Added this line

      try {
        signUp({ name, email, password }).then((res) => {
          if (res.status === 200) {
            dispatch(loginSuccess(res.data));
            dispatch(
              openSnackbar({ message: `OTP verified & Account created successfully`, severity: "success" })
            );
            setLoading(false);
            setDisabled(false);
            setSignUpOpen(false);
            setSignInOpen(false);
          } else {
            dispatch(loginFailure());
            setcredentialError(`${res.data.message}`);
            setLoading(false);
            setDisabled(false);
          }
        });
      } catch (err) {
        dispatch(loginFailure());
        setLoading(false);
        setDisabled(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      }
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!disabled) {
      setOtpSent(true);
    }

    if (name === "" || email === "" || password === "") {
      dispatch(
        openSnackbar({
          message: "Please fill all the fields",
          severity: "error",
        })
      );
    }
  };

  useEffect(() => {
    if (email !== "") validateEmail();
    if (password !== "") validatePassword();
    if (name !== "") validateName();
    if (
      name !== "" &&
      validator.isEmail(email) &&
      passwordCorrect &&
      nameCorrect
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [name, email, passwordCorrect, password, nameCorrect]);

  useEffect(() => {
    createAccount();
  }, [otpVerified]);

  //validate email
  const validateEmail = () => {
    if (validator.isEmail(email)) {
      setEmailError("");
    } else {
      setEmailError("Enter a valid Email Id!");
    }
  };

  //validate password
  const validatePassword = () => {
    if (password.length < 8) {
      setcredentialError("Password must be at least 8 characters long!");
      setPasswordCorrect(false);
    } else if (password.length > 16) {
      setcredentialError("Password must be less than 16 characters long!");
      setPasswordCorrect(false);
    } else if (
      !password.match(/[a-z]/g) ||
      !password.match(/[A-Z]/g) ||
      !password.match(/[0-9]/g) ||
      !password.match(/[^a-zA-Z\d]/g)
    ) {
      setPasswordCorrect(false);
      setcredentialError(
        "Password must contain at least one lowercase, uppercase, number, and special character!"
      );
    } else {
      setcredentialError("");
      setPasswordCorrect(true);
    }
  };

  //validate name
  const validateName = () => {
    if (name.length < 4) {
      setNameValidated(false);
      setNameCorrect(false);
      setcredentialError("Name must be at least 4 characters long!");
    } else {
      setNameCorrect(true);
      if (!nameValidated) {
        setcredentialError("");
        setNameValidated(true);
      }
    }
  };

  //Google SignIn
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      const user = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .catch((err) => {
          dispatch(loginFailure());
          dispatch(
            openSnackbar({
              message: err.message,
              severity: "error",
            })
          );
        });

      googleSignIn({
        name: user.data.name,
        email: user.data.email,
        img: user.data.picture,
      }).then((res) => {
        if (res.status === 200) {
          dispatch(loginSuccess(res.data));
          setSignUpOpen(false);
          dispatch(
            openSnackbar({
              message: "Logged In Successfully",
              severity: "success",
            })
          );
          setLoading(false);
        } else {
          dispatch(loginFailure(res.data));
          dispatch(
            openSnackbar({
              message: res.data.message,
              severity: "error",
            })
          );
          setLoading(false);
        }
      });
    },
    onError: (errorResponse) => {
      dispatch(loginFailure());
      dispatch(
        openSnackbar({
          message: errorResponse.error,
          severity: "error",
        })
      );
      setLoading(false);
    },
  });

  const resendOTP = () => {
    setOtpSent(false);
    setOtpVerified(false);
  };

  return (
    <Container>
      <Wrapper>
        <Title>Sign Up</Title>
        <TextInput
          placeholder="Full Name"
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
        <Error error={credentialError}>{credentialError}</Error>
        <TextInput
          placeholder="Email Id"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <Error error={emailError}>{emailError}</Error>
        <TextInput
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Error error={credentialError}>{credentialError}</Error>
        {!otpSent ? (
          <>
            <OutlinedBox
              onClick={handleSignUp}
              activeButton={!disabled ? true : false}
            >
              {Loading ? (
                <CircularProgress
                  style={{ color: "white" }}
                  size={20}
                  thickness={4}
                />
              ) : (
                "Sign Up"
              )}
            </OutlinedBox>
            <LoginText>
              Already have an account? <Span onClick={() => setSignInOpen(true)}>Sign In</Span>
            </LoginText>
            <Divider>
              <Line />
              OR
              <Line />
            </Divider>
            <OutlinedBox googleButton onClick={() => googleLogin()} >
              <GoogleIcon src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Google_2015_logo.svg/920px-Google_2015_logo.svg.png" />
              Continue with Google
            </OutlinedBox>
          </>
        ) : (
          <OTP
            setOtpVerified={setOtpVerified}
            otpVerified={otpVerified}
            email={email}
            resendOTP={resendOTP}
          />
        )}
      </Wrapper>
    </Container>
  );
};

export default SignUp;
