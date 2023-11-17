import express from 'express'
import { 
    registerController, 
    loginController, 
    testController,
    forgotPasswordController,
} from '../controllers/authController.js'

import { isAdmin, requireSignIn } from '../middlewares/authMidleware.js';


//router object
const router = express.Router()

//routing
router.post("/register", registerController);

//LOGIN
router.post("/login", loginController);

//forgot password
router.post('/forgot-password', forgotPasswordController);

//test
router.get("/testing", requireSignIn, isAdmin, testController);

//protected route
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true})
})

router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true})
})



export default router