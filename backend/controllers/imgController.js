const mongoose = require("mongoose");
const companyModel = require("../models/Company");
const userModel = require("../models/User");
const fs = require("fs").promises;

const updateCompanyLogo= async (req, res) =>{
    const { id } = req.params;

    if(id != req.user.id){
        return res.status(400).json({error : "You are not authorized to access this request"});
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Not a valid ID!" });
    }

    try {
        // Check if the company with the specific ID already has a logo
        const company = await companyModel.findById(id);

        if (!company) {
            return res.status(404).json({ error: "Company not found" });
        }

        // Check if req.file exists
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded!" });
        }

        // If the company already has a logo, unlink the old image
        if (company.logo) {
            const oldImagePath = './uploads/' + company.logo;

            try {
                await fs.unlink(oldImagePath);
                console.log('Old logo unlinked successfully');
            } catch (unlinkError) {
                console.error('Error while unlinking old logo:', unlinkError.message);
                // Handle the error as needed
            }
        }

        // Update the company's logo with the new filename
        const updatedCompany = await companyModel.findOneAndUpdate(
            { _id: id },
            { logo: req.file.filename },
            { new: true }
        );

        res.status(201).json({
            message: 'Logo updated successfully!',
            newLogo: updatedCompany.logo,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const updateUserProfilePic =async (req, res) =>{
    const { id } = req.params;

    if(id != req.user.id){
        return res.status(400).json({error : "You are not authorized to access this request"});
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Not a valid ID!" });
    }

    try {
        // Check if the company with the specific ID already has a logo
        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if req.file exists
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded!" });
        }

        // If the user already has a logo, unlink the old image
        if (user.profilePic) {
            const oldImagePath = './uploads/' + user.profilePic;

            try {
                await fs.unlink(oldImagePath);
                console.log('Old Pic unlinked successfully');
            } catch (unlinkError) {
                console.error('Error while unlinking old Pic:', unlinkError.message);
                // Handle the error as needed
            }
        }

        // Update the company's logo with the new filename
        const updatedUserPic = await userModel.findOneAndUpdate(
            { _id: id },
            { profilePic: req.file.filename },
            { new: true }
        );

        res.status(201).json({
            message: 'Profile Picture updated successfully!',
            newProfilePic: updatedUserPic.profilePic,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const removeUserProfilePic =async (req, res) =>{
    const { id } = req.params;

    if(id != req.user.id){
        return res.status(400).json({error : "You are not authorized to access this request"});
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Not a valid ID!" });
    }

    try {
        // Check if the company with the specific ID already has a logo
        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // If the user already has a logo, unlink the old image
        if (user.profilePic) {
            const oldImagePath = './uploads/' + user.profilePic;

            try {
                await fs.unlink(oldImagePath);
                console.log('Old Pic unlinked successfully');

                const updatedUserPic = await userModel.findOneAndUpdate({_id: id},
                    { profilePic: null },
                );

                return res.status(201).json({
                    message: 'Profile Picture Removed successfully!',
                });
            } catch (unlinkError) {
                console.error('Error while unlinking old Pic:', unlinkError.message);
                // Handle the error as needed
            }
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const removeCompanyLogo =async (req, res) =>{
    const { id } = req.params;

    if(id != req.user.id){
        return res.status(400).json({error : "You are not authorized to access this request"});
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Not a valid ID!" });
    }

    try {
        // Check if the company with the specific ID already has a logo
        const company = await companyModel.findById(id);

        if (!company) {
            return res.status(404).json({ error: "Company not found" });
        }

        // If the company already has a logo, unlink the old image
        if (company.logo) {
            const oldImagePath = './uploads/' + company.logo;

            try {
                await fs.unlink(oldImagePath);
                console.log('Old Logo unlinked successfully');

                const updatedLogo = await companyModel.findOneAndUpdate({_id: id},
                    { logo: null },
                );

                return res.status(201).json({
                    message: 'Company Logo Removed successfully!',
                });
            } catch (unlinkError) {
                console.error('Error while unlinking old Logo:', unlinkError.message);
                // Handle the error as needed
            }
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


module.exports = 
{ 
    updateCompanyLogo,
    updateUserProfilePic,
    removeUserProfilePic,
    removeCompanyLogo
};
