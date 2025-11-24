import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Fetch dashboard data
const getDashboardData = async (req, res) => {
    try {
        // Fetch all orders
        const orders = await orderModel.find().sort({ date: -1 }); // most recent first

        // Count total users
        const totalUsers = await userModel.countDocuments();

        // Calculate total revenue
        const revenue = orders.reduce((sum, order) => sum + (order.amount || 0), 0);

        // Count pending orders (not delivered)
        const pendingOrders = orders.filter(order => order.status !== "Delivered").length;

        // Get recent 5 orders
        const recentOrders = orders.slice(0, 5).map(order => ({
            id: order._id,
            status: order.status,
            date: order.date,
            amount: order.amount,
            user: order.address?.firstName + " " + order.address?.lastName
        }));

        res.json({
            success: true,
            data: {
                totalOrders: orders.length,
                revenue,
                totalUsers,
                pendingOrders,
                recentOrders
            }
        });
    } catch (error) {
        console.error("Dashboard fetch error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch dashboard data"
        });
    }
};

export { getDashboardData };