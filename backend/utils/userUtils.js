import { User } from '../models/userModel';

async function updateUserProfilePicture(userId, filePath) {
  const updatedUser = await User.findOneAndUpdate(
    {
      _id: userId,
    },
    {
      profilePicture: filePath,
    },
    {
      new: true,
    }
  );
  console.log(updatedUser);
}
export { updateUserProfilePicture };
