import User from "../models/User";

// read
export const getUser = async(req,res)=>{
    try {
        const {id} = req.para
    } catch (err) {
        res.status(404).json({message: err.message})
    }
}