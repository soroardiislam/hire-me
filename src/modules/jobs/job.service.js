// src/modules/jobs/job.service.js
import Job from './job.model.js';
import Application from '../applications/application.model.js';

// সার্ভিস: সমস্ত জব বা ইউজার-পোস্টেড জব খুঁজে বের করা
export const findJobs = async (query = {}) => {
    return await Job.find(query).populate('postedBy', 'name email');
};

// সার্ভিস: নতুন জব তৈরি করা
export const createJobPost = async (jobData) => {
    const job = new Job(jobData);
    await job.save();
    return job;
};

// সার্ভিস: জব আপডেট করা (Partial update)
export const updateJobById = async (jobId, updateData, userId, userRole) => {
    const job = await Job.findById(jobId);
    if (!job) throw new Error('Job not found');

    // Authorization: শুধুমাত্র পোস্টার বা Admin এডিট করতে পারবে
    if (job.postedBy.toString() !== userId.toString() && userRole !== 'Admin') {
        throw new Error('Unauthorized: You can only edit your own jobs.');
    }

    Object.assign(job, updateData); // শুধু যেটা পাঠানো হয়েছে সেটাই update হবে
    await job.save();
    return job;
};

// সার্ভিস: জব ডিলিট করা
export const deleteJobById = async (jobId, userId, userRole) => {
    const job = await Job.findById(jobId);
    if (!job) throw new Error('Job not found');

    // Authorization: শুধুমাত্র পোস্টার বা Admin ডিলিট করতে পারবে
    if (job.postedBy.toString() !== userId.toString() && userRole !== 'Admin') {
        throw new Error('Unauthorized: You can only delete your own jobs.');
    }

    // জবের সাথে যুক্ত অ্যাপ্লিকেশনও ডিলিট
    await Application.deleteMany({ job: jobId });
    await job.deleteOne();

    return { message: 'Job and associated applications deleted successfully' };
};
