// src/modules/users/user.validation.js
import { ROLES } from '../../core/roles.js';
import { validate } from '../../middlewares/validate.js';

const userUpdateSchema = () => ({
    params: {
        id: { required: true, type: 'string' } // User ID
    },
    body: {
        // রোল ভ্যালিডেশন: শুধুমাত্র বৈধ রোলই গ্রহণ করা হবে
        role: { 
            required: false, 
            type: 'string',
            // এখানে Enum চেক যুক্ত করা যেতে পারে
            validate: (value) => value && Object.values(ROLES).includes(value) 
        }
    }
});

export const validateUserUpdate = (req, res, next) => {
    // কাস্টম রোল চেক
    if (req.body.role && !Object.values(ROLES).includes(req.body.role)) {
        return res.status(400).json({ message: `Invalid role: ${req.body.role}. Must be one of ${Object.values(ROLES).join(', ')}` });
    }
    
    // validate মিডলওয়্যার ব্যবহার
    validate(userUpdateSchema)(req, res, next);
};

// এই ভ্যালিডেশনকে user.routes.js-এ ব্যবহার করতে হবে:
// router.put('/:id', validateUserUpdate, updateUser);