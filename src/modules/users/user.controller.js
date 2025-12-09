// src/modules/users/user.controller.js
import * as userService from './user.service.js';

// @route   GET /api/users
// @access  Private/Admin
export const getUsers = async (req, res, next) => {
    try {
        const users = await userService.findAllUsers();
        res.json(users);
    } catch (error) {
        next(error);
    }
};

// @route   PUT /api/users/:id
// @access  Private/Admin
export const updateUser = async (req, res, next) => {
    try {
        const user = await userService.updateUserById(req.params.id, req.body);
        res.json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = async (req, res, next) => {
    try {
        const result = await userService.deleteUserById(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};