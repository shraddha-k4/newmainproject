import express from 'express';
import { forgotPassword, getProfile, login, protectedRoute, signup } from '../controller/AuthController.js';
import {  verifyToken } from '../middleware/AuthMiddleware.js';


const route=express.Router();

route.post('/signup',signup);
route.post('/login',login);
route.get('/protected',verifyToken,protectedRoute);
route.get('/profile',verifyToken,getProfile);


route.post("/forgot-password", forgotPassword);

export default route;