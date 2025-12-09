// src/modules/users/user.service.js
import User from './user.model.js';
import { ROLES } from '../../core/roles.js';

// সার্ভিস: সমস্ত ইউজার খুঁজে বের করা (পাসওয়ার্ড ছাড়া)
export const findAllUsers = async () => {
    return await User.find().select('-password');
};

// সার্ভিস: একটি নির্দিষ্ট ইউজার আপডেট করা
export const updateUserById = async (userId, updateData) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error('User not found');
    }

    // অনুমোদিত ফিল্ডগুলো
    const allowedFields = ['name', 'email', 'role', 'password'];

    for (const key of Object.keys(updateData)) {
        if (allowedFields.includes(key)) {

            // রোল আপডেট করলে — শুধু admin রোলই valid
            if (key === 'role') {
                if (Object.values(ROLES).includes(updateData.role)) {
                    user.role = updateData.role;
                }
                continue;
            }

            // যদি password update হয়
            if (key === 'password') {
                user.password = updateData.password; // mongoose pre-save hook hash করবে
                continue;
            }

            // অন্য সব ফিল্ড: name, email
            user[key] = updateData[key];
        }
    }

    await user.save();

    // response থেকে password লুকিয়ে দাও
    const { password, ...safeUser } = user.toObject();
    return safeUser;
};


// সার্ভিস: ইউজার ডিলিট করা
export const deleteUserById = async (userId) => {
    const result = await User.deleteOne({ _id: userId });
    if (result.deletedCount === 0) {
        throw new Error('User not found');
    }
    return { message: 'User deleted successfully' };
};