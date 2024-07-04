import validator from 'validator';
import { Feedback } from '../models/feedbackModel.js';

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({});
    return res.status(200).json({
      feedbackCount: feedbacks.length,
      data: feedbacks,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
const postFeedback = async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, message } = req.body;
    if (!email || !name || !message) {
      throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)) {
      throw Error('Email not valid');
    }
    await Feedback.create({
      name,
      email,
      message,
    });
    return res.status(200).json({ feedbackSubmitted: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: error.message, feedbackSubmitted: false });
  }
};

export { postFeedback, getAllFeedbacks };
