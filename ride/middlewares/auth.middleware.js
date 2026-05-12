import jwt from "jsonwebtoken"
import axios from "axios"

export const userAuth = async(req,res,next)=>{

    try {
        const token = req.cookies.token || req.headers.authorization.split(" ")[1]

        if(!token ){
            return res.status(403).json({message:"unauthorize"})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const response = await axios.get(process.env.BASE_URL,{
            headers:{
                Authorization: `Bearer ${token}` 
            }
        })

        const user = response.data

        if(!user){
            return res.status(401).json({message:"unauthorize"})
        }

        req.user = user

        next()

    } catch (error) {
        res.status(500).json({message:"server error",error})
    }

}