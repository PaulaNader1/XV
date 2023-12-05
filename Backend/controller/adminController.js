const User = require('../Models/userModel');
const Agent = require('../Models/agentModel');

const adminController = {
    createNewUser: async (req, res) => {
        try {
            const { username, email, password, role } = req.body;

            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(409).json({ message: 'User with this email is already registered' });
            }

            const newUser = await User.create({ username, email, password, role });

            return res.status(201).json({ message: 'User created successfully', user: newUser });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    getAllUsers: async (req, res) => {
        try {
            if (!req.user || req.user.role !== 'admin') {
                return res.status(403).json({ error: 'Unauthorized' });
            }
            //ashan manbayensh el password
            const allUsers = await User.find({}, { password: 0 });

            return res.status(200).json({ users: allUsers });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },


    updateUserRole: async (req, res) => {
        try {
            if (!req.user || req.user.role !== 'admin') {
                return res.status(403).json({ error: 'Unauthorized' });
            }

            const { userid, newRole, primaryCategory} = req.body;

            if (newRole === 'agent' && !primaryCategory) {
                return res.status(400).json({ error: 'Primary category is required for an agent' });
            }

            const user = await User.findById(userid);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const updatedUser = await User.findByIdAndUpdate(
                userid,
                { role: newRole },
                { new: true }
            );

            if (newRole === 'agent') {

                const newAgent = await Agent.create({
                    agentId: user.userid,
                    username: user.username,
                    password: user.password,
                    email: user.email,
                    primaryCategory : primaryCategory // Assign the provided primaryCategory
                });
    
                // Save the new agent
                const savedAgent = await newAgent.save();
                console.log('New Agent created:', savedAgent);

            }
            return res.status(200).json({ message: 'User role updated successfully', user: updatedUser });


        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    deleteUser: async (req, res) => {
        try {
            if (!req.user || req.user.role !== 'admin') {
                return res.status(403).json({ error: 'Unauthorized' });
            }

            const { userid } = req.body;
            const user = await User.findById(userid);

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            //hay find we ye delete by id 
            await User.findByIdAndDelete(userid);

            //dah ashan law el user agent hay delete men aand agent
            if (user.role === 'agent') {
                await Agent.findOneAndDelete({ agentId: userid });
            }

            return res.status(200).json({ message: 'User deleted successfully' });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
              //table customization we ne retrieve data we n update meno
    changeCustomization: async (req, res) => {
        try {
            if (!req.user || req.user.role !== 'admin') {
                return res.status(403).json({ error: 'unauthorized' });
            }
            const { colors, companyName, logo } = req.body;

            return res.status(200).json({ message: 'Help Desk customization updated successfully' });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },
};

module.exports = adminController;
