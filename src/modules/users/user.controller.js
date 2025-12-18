import * as userService from "./user.service.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await userService.findAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (req, res, next) => {
  try {
    const user = await userService.updateUserById(req.params.id, req.body);
    res.json(user);
  } catch (error) {
    res.status(404).json({
      message: error.message,
      success: false,
    });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const result = await userService.deleteUserById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({
      message: error.message,
      success: false,
    });
  }
};
