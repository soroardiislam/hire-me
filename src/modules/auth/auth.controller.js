import * as authService from "./auth.service.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userData = await authService.registerUser({
      name,
      email,
      password,
      role,
    });

    res.cookie("token", userData.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(201).json({
      message: "User registered",
      success: true,
      user: {
        id: userData._id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      },
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await authService.loginUser(email, password);

    res.cookie("token", userData.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      message: "User logged in",
      success: true,
      user: {
        id: userData._id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
      },
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.json({ message: "User logged out successfully", success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const response = await authService.forgotPasswordService(email);
    res.json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const response = await authService.verifyOTPAndResetPasswordService(
      email,
      otp,
      newPassword
    );
    res.json(response);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = await authService.updateProfileService(userId, req.body);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
