import foodModel from "../models/foodModel.js";
import fs from 'fs'


// add food item

const addFood = async (req,res) => {

    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:req.file.filename
    })
    try{
        await food.save();
        res.json({
            success:true,
            message:"Food Added Successfully"
        })
    } catch (error){
        console.log(error)
        res.json({
            success:false,
            message:"Error Adding Food"
        })
    }
}


//all food list
const listFood = async (req,res) => {
    try{
        const foods = await foodModel.find({});
        res.json({
            success : true,
            data : foods
        })
    } catch {
        console.log(error);
        res.json({
            success : false,
            message : "Error retrieving foods"
        })
    }
}


//remove food item
const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({
            success : true,
            message : "Food removed successfully"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success : false,
            message : "Error removing food"
        })
    }
}

// get details of a single food item
const getFoodById = async (req, res) => {
    try {
        const food = await foodModel.findById(req.params.id); // use req.params for URL param
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }
        res.json({ success: true, data: food });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error fetching food details" });
    }
};


// update food item
const updateFood = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        const updateData = { name, description, price, category };

        if (req.file) { // if new image uploaded
            const food = await foodModel.findById(req.params.id);
            if (food && food.image) {
                fs.unlink(`uploads/${food.image}`, () => {}); // remove old image
            }
            updateData.image = req.file.filename;
        }

        const updatedFood = await foodModel.findByIdAndUpdate(req.params.id, updateData, { new: true });

        res.json({ success: true, data: updatedFood, message: "Food updated successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error updating food" });
    }
};


export {addFood, listFood, removeFood, getFoodById, updateFood}