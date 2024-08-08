import { User } from '../models/userModel.js';

async function saveCartItems(userId, items) {
  const orderedItems = items.map(
    ({ product, quantity, price, taxRate, title, image }) => ({
      _id: product,
      quantity,
      price,
      taxRate,
      title,
      image,
    })
  );
  const user = await User.findById(userId);

  user.cart = orderedItems;
  await user.save();
}
async function getCartItems(userId) {
  const user = await User.findById(userId);
  return user.cart;
}
async function clearUserCart(userId) {
  await User.findByIdAndUpdate(userId, {
    $set: { cart: [] },
  });
}
async function updateUserOrders(userId, orderId) {
  return User.findByIdAndUpdate(
    userId,
    { $push: { orders: orderId } },
    { new: true }
  );
}
export { saveCartItems, getCartItems, updateUserOrders, clearUserCart };
