import React from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useLoginStore from "../State/state";
import axios from "axios";
import useMediaQuery from "@mui/material/useMediaQuery";
import { BASE_URL } from "../Utils/helper";

const Login = () => {
  const smallScreen = useMediaQuery("(max-width: 600px)");
  const isLogin = useLoginStore((state) => state.loginStatus);
  const setLoginStatus = useLoginStore((state) => state.setLoginStatus);

  const navigate = useNavigate();

  const initialvalues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(6, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    const { data } = await axios.post(`${BASE_URL}/api/v1/user/login`, {
      email: values.email,
      password: values.password,
    });
    console.log(data);
    if (data.success) {
      toast.success("User Logged-in Successfully.");
      setLoginStatus(true);

      localStorage.setItem("userId", data?.user?._id);
      localStorage.setItem("userName", data?.user?.username);

      navigate("/blogs");
    }
  };

  const formik = useFormik({
    initialValues: initialvalues,
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          width={smallScreen ? "80%" : "35%"}
          margin={"auto"}
          marginTop={5}
          padding={"50px"}
          boxShadow={"10px 10px 20px #ccc"}
          borderRadius={5}
        >
          <Typography variant="h4" align="center" marginBottom={"10px"}>
            Login
          </Typography>
          <TextField
            name="email"
            type="email"
            variant="outlined"
            label="Email"
            margin="normal"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            name="password"
            type="password"
            variant="outlined"
            label="Password"
            margin="normal"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            marginTop={"20px"}
            marginBottom={"10px"}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: "30%", borderRadius: 3 }}
            >
              Login
            </Button>
            <Button
              type="reset"
              variant="contained"
              color="error"
              sx={{ width: "30%", borderRadius: 3 }}
            >
              Reset
            </Button>
          </Box>
          <Typography
            marginTop={"20px "}
            color={"primary"}
            textAlign={"center"}
            textTransform={"uppercase"}
          >
            Not Registered yet ? Please click to{" "}
            <Link to={"/Register"}>
              <b>Register</b>
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Login;
