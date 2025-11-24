import userModel from "../models/userModel.js"

// Add items to user cart
const addToCart = async (req,res) => {
    try {
        const userData = await userModel.findById(req.user._id);
        let cartData = userData.cartData || {};
        const { itemId } = req.body;

        if (!cartData[itemId]) cartData[itemId] = 1;
        else cartData[itemId] += 1;

        await userModel.findByIdAndUpdate(req.user._id, { cartData });
        res.json({ success: true, message: "Added successfully to Cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error adding to Cart" });
    }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.user._id); // ✅ use req.user
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const { itemId } = req.body; // ✅ get itemId from body
        const cartData = userData.cartData || {};
        
        if (cartData[itemId] > 0) {
            cartData[itemId] -= 1;

            // optional: remove the key if quantity reaches 0
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        }

        await userModel.findByIdAndUpdate(req.user._id, { cartData });
        res.json({ success: true, message: "Removed From Cart" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error removing from Cart" });
    }
}

// Fetch user cart data
const getCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.user._id); // use req.user from authMiddleware
        const cartData = userData.cartData || {}; // fallback to empty object
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error retrieving Cart data" });
    }
};

export { addToCart, removeFromCart, getCart }
