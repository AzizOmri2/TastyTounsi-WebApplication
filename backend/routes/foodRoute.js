import express from "express"
import multer from "multer"
import { addFood, getFoodById, listFood, removeFood, updateFood } from "../controllers/foodController.js"


const foodRouter = express.Router();


// Image Storage Engine

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage})

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.get("/:id", getFoodById);        // GET single food by id
foodRouter.put("/:id", upload.single("image"), updateFood);  // UPDATE food
foodRouter.post("/remove",removeFood)



export default foodRouter;