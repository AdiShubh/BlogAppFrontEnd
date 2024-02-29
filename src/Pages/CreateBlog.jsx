import { useState } from "react";
import { Typography, TextField, Box, Button, Input } from "@mui/material";
import Image from "mui-image";
import defaultImage from "../assets/images/image.jpg";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { BASE_URL } from "../Utils/helper";

const CreateBlog = () => {
  const smallScreen = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(defaultImage);

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
    user: localStorage.getItem("userId"),
  });

  const handleImageChange = (event) => {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));

    setInputs({ ...inputs, image: event.target.files[0] });
  };

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formInputs = new FormData();
    formInputs.append("title", inputs.title);
    formInputs.append("description", inputs.description);
    formInputs.append("image", inputs.image);

    formInputs.append("user", inputs.user);
    //for (const value of formInputs.values()) {
    // console.log(value);
    //}

    const { data } = await axios.post(
      `${BASE_URL}/api/v1/blog/create`,

      formInputs,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (data.success) {
      toast.success("Created Successfully!");
      navigate("/blogs");
    }
  };

  return (
    <>
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        method="POST"
        action="/create"
      >
        <Box
          display="flex"
          flexDirection={"column"}
          width={smallScreen ? "80%" : "50%"}
          margin={"auto"}
          boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
          padding="20px 40px 40px 40px "
          marginTop={"25px"}
          marginBottom={"25px"}
        >
          <Typography variant="h4" sx={{ margin: "30px auto 20px auto" }}>
            Create Blog
          </Typography>

          <TextField
            name="title"
            onChange={onChange}
            label="Title"
            variant="outlined"
            size="medium"
            margin="normal"
            value={inputs.title}
          />
          <TextField
            name="description"
            onChange={onChange}
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            size="medium"
            margin="normal"
            value={inputs.description}
          />
          <Image src={selectedImage} alt="blog-image" height="200px" />
          <Button
            component="label"
            variant="contained"
            sx={{ margin: "10px 0 10px 0" }}
          >
            <Input
              name="image"
              type="file"
              accept="image/*"
              sx={{ display: "none" }}
              onChange={handleImageChange}
            />
            Upload file
          </Button>

          {/* <MuiFileInput
            value={inputs.image}
            margin="normal"
            sx={{ display: "none" }}
            accept="image/*"
          /> */}

          <Box display="flex" justifyContent="space-between" marginTop="10px">
            <Button type="submit" variant="contained" color="success">
              Create Blog
            </Button>
            <Button type="reset" variant="contained" color="error">
              Reset
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CreateBlog;
