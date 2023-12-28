const userModel = require('../Models/userModel');
const agentModel = require('../Models/agentModel');
const customizationModel = require('../Models/customizationModel');
const jwt = require("jsonwebtoken");
const secretKey = "s1234rf,.lp";

const adminController = {
    // createNewUser: async (req, res) => {
    //     try {
    //         const { username, email, password, role } = req.body;

    //         const existingUser = await User.findOne({ email });

    //         if (existingUser) {
    //             return res.status(409).json({ message: 'User with this email is already registered' });
    //         }

    //         const newUser = await User.create({ username, email, password, role });

    //         return res.status(201).json({ message: 'User created successfully', user: newUser });
    //     }
    //     catch (error) {
    //         console.error(error);
    //         return res.status(500).json({ error: 'Internal server error' });
    //     }
    // },

    getAllUsers: async (req, res) => {
        try {
           /* if (!req.user || req.user.role !== 'admin') {
                return res.status(403).json({ error: 'Unauthorized' });
            }*/
            //ashan manbayensh el password
            const allUsers = await userModel.find(/*{}, { password: 0 }*/);

            return res.status(200).json(allUsers);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },


    updateUserRole: async (req, res) => {
        console.log('Update User Role Endpoint Accessed');
        try {
            const userRole = req.user.role;
            if (!userRole || userRole !== 'admin') {
                return res.status(403).json({ error: 'Unauthorized', error: error.message });
            }
    
            
            const {email,newRole, primaryCategory } = req.body;
    
            if (newRole === 'agent' && primaryCategory == null) {
                return res.status(400).json({ error: 'Primary category is required for an agent', error: error.message });
            }
    
            const user = await userModel.findOne({ email});
    
            if (!user) {
                return res.status(402).json({ error: 'User not found' ,error: error.message});
            }
            user.role = newRole;
    
            await user.save();
    
            if (newRole === 'agent') {
                const newAgent = await agentModel.create({
                    username: user.username,
                    password: user.password,
                    email : user.email,
                    primaryCategory: primaryCategory.trim().toLowerCase() // Assign the provided primaryCategory
                });
    
                const savedAgent = await newAgent.save();
                console.log('New Agent created:', savedAgent);
            }
    
            return res.status(200).json({ message: 'User role updated successfully', user });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error', error: error.message });
        }
    },
    

    deleteUser: async (req, res) => {
        
        try {
            if (!req.user || req.user.role !== 'admin') {
                return res.status(403).json({ error: 'Unauthorized' });
            }

            const { email } = req.body;
            const user = await userModel.findOne({ email });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            await userModel.findOneAndDelete({ email });

            if (user.role === 'agent') {
                await agentModel.findOneAndDelete({ email });
            }

            return res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
              
    changeCustomization: async (req, res) => {
        try {
            const { colors, companyName, logo } = req.body;
    
            // Validate required properties
            if (!colors || !companyName || !logo) {
                return res.status(400).json({ error: 'Missing required data' });
            }
    
            // Assuming CustomizationModel schema has fields for colors, companyName, and logo
            let customization = await customizationModel.findOne();
    
            if (!customization) {
                customization = new customizationModel();
            }
    
            // Update existing customization
            customization.colors = colors;
            customization.comapanyName = companyName;
            customization.logo = logo;
            await customization.save();
    
            return res.status(200).json({ message: 'Help Desk customization updated successfully' });
        } catch (error) {
            console.error("Error in changeCustomization:", error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
    
};

module.exports = adminController;
