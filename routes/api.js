var express =  require('express');
var ApiRouter = express.Router();
var UserController = require('../controllers/user');
var bcrypt = require('bcryptjs');

//Login APi 
/**
 * @swagger
 * /login/:
 *   post:
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     tags:
 *	     - User
 *     description: User login
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User login
 *       500:
 *         description: Server error
 *       401:
 *         description: Invalid login
*/
ApiRouter.post('/login', (req, res) => {
	if(req.body.email && req.body.password){
		UserController.findOne({email:req.body.email}, (err, user) => {
			if(err){
				res.status(500).json({success:false, message:err})
			}else{
				if(user && user.length == 1){
					//Encrypt & verify password
					
					bcrypt.compare(req.body.password, user[0]['password'], function(err, resp) {
    					if(resp === true){
							res.status(200).json({success:true, message:'User logined successfully'})
						}else{
							res.status(401).json({success:false, message:'Invalid Credentials'})
						}
					});
				}else{
					res.status(401).json({success:false, message:'Invalid Credentials'})
				}
			}
		})
	}else{
		res.status(200).json({success:false, message:'Some parameters are missing'});
	}
});

//Register Api 
/**
 * @swagger
 * /register/:
 *   post:
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     tags:
 *	     - User
 *     description: User Registration
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User Already Exist
 *       500:
 *         description: Server error
 *       201:
 *         description: User Created
*/
ApiRouter.post('/register', (req, res) => {
	if(req.body.email && req.body.password){
		UserController.findOne({email:req.body.email}, (err, user) => {
			if(err){
				res.status(500).json({success:false, message:err})
			}else{
				if(user && user.length > 0){
					res.status(200).json({success:false, message:'User already exist !'})
				}else{
					//User create
					var salt = bcrypt.genSaltSync(10);
					var hashed_password = bcrypt.hashSync(req.body.password, salt);
					UserController.create({email:req.body.email, password:hashed_password}, (err, user) => {
						if(err){
							res.status(500).json({success:false, message:err})
						}else{
							res.status(201).json({success:true, message:'User created successfully !'})
						}
					})
				}
			}
		})
	}else{
		res.status(200).json({success:false, message:'Some parameters are missing !'})
	}
})
module.exports=ApiRouter;