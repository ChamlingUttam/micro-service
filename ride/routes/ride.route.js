import express from 'express'
import { ride } from '../controllers/ride.controller.js'
import { userAuth } from '../middlewares/auth.middleware.js'
// import User from '../../user/models/user.model'
const router = express.Router()

router.post('/create-ride',userAuth,ride)

export default router