import AuthService from "../services/auth.service.js";

const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await AuthService.register({
      email,
      password,
    });

    return res.status(201).json({
      message: "User Created Successfully",
      data: user,
    });
  } catch (e) {
    res.status(400).json({
      message: e.message || "something went wrong",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await AuthService.login({ email, password });

    if (user) {
      return res.status(201).json({
        message: "User Logged In Successfully",
        data: user,
      });
    }
  } catch (e) {
    return res.status(400).json({
      message: e.message || "Something went wrong",
    });
  }
};

const AuthController = {
  register,
  login,
};

export default AuthController;
