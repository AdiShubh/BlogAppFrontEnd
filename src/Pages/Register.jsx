import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { BASE_URL } from "../Utils/helper";

const Register = () => {
  const smallScreen = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();
  const initialvalues = {
    name: "",
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    name: yup
      .string("Inavliad name , Please enter alphabets only")
      .max(40)
      .required("Please enter name."),
    email: yup
      .string()
      .email("Please enter a valid email address.")
      .required("Please enter email."),
    password: yup
      .string()
      .required("Please enter your password")
      .min(6, "Please enter atleast 6 characters"),
  });

  const handleSubmit = async (e, values) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/api/v1/user/register`, {
        username: formik.values.name,
        email: formik.values.email,
        password: formik.values.password,
      });

      console.log(data);
      if (data.success) {
        toast.success("User registered successfully.", {
          duration: 5000,
          position: "top-right",
        });

        formik.resetForm();
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
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
          maxWidth={smallScreen ? "80%" : "35%"}
          display="flex"
          flexDirection={"column"}
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={"50px"}
          borderRadius={5}
        >
          <Typography variant="h4" textAlign="center" marginBottom={"10px"}>
            Register
          </Typography>
          <TextField
            placeholder="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            name="name"
            margin="normal"
            type={"text"}
            required
            error={Boolean(formik.errors.name)}
            helperText={formik.errors.name}
          />
          <TextField
            placeholder="email"
            value={formik.values.email}
            name="email"
            margin="normal"
            type={"email"}
            required
            onChange={formik.handleChange}
            error={Boolean(formik.errors.email)}
            helperText={formik.errors.email}
          />
          <TextField
            placeholder="password"
            value={formik.values.password}
            name="password"
            margin="normal"
            type={"password"}
            required
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button
            type="submit"
            sx={{
              borderRadius: 3,

              width: "30%",
              margin: " 10px auto",
            }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/login")}
            sx={{ borderRadius: 3, marginTop: 2 }}
          >
            Already Registerd ? Please Login
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Register;
