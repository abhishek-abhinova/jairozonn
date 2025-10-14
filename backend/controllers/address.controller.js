import Address from "../models/address.model.js";

// Add new address: /api/address/add
export const addAddress = async (req, res) => {
    try {
        const addressData = req.body;
        const userId = req.userId;
        const savedAddress = await Address.create({ ...addressData, userId });
        res.status(201).json({ 
            success: true, 
            message: "Address added successfully", 
            address: savedAddress 
        });
    } catch (error) {
        console.error('Address creation error:', error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to add address" 
        });
    }
};

export const getAddress = async (req, res) => {
    try {
        const userId = req.userId;
        const addresses = await Address.find({ userId });
        res.status(200).json({ 
            success: true, 
            addresses 
        });
    } catch (error) {
        console.error('Get addresses error:', error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to fetch addresses" 
        });
    }
};
