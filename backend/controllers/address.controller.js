import Address from "../models/address.model.js";

// Add new address: /api/address/add
export const addAddress = async (req, res) => {
    try {
        const { address } = req.body;
        const userId = req.user;
        const savedAddress = await Address.create({ ...address, userId: userId, });
        res.status(201).json({ message: "Address added successfully", address: savedAddress });
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
};

export const getAddress = async (req, res) => {
    try {
        const userId = req.user;
        const addresses = await Address.find({ userId });
        res.status(200).json({ addresses });
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
};
