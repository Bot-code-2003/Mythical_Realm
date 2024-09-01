import * as api from "../api";

export const handleLogin =
  (formData, navigate, setEmail, setPassword) => async (dispatch) => {
    try {
      const { data } = await api.handleLogin(formData);
      const action = {
        type: "LOGIN",
        payload: data,
      };

      dispatch(action);
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Show an alert with the error message
        alert("Invalid credentials. Please try again.");
        setEmail("");
        setPassword("");
        navigate("/auth");
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };
