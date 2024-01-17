const mongoose = require("mongoose");
const companyModel = require("../models/Company");
const fs = require("fs").promises;

const updateCompanyLogo= async (req, res) =>{
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Not a valid ID!" });
    }

    try {
        // Check if the company with the specific ID already has a logo
        const company = await companyModel.findById(id);

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
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
            updatedCompany: updatedCompany,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = { updateCompanyLogo};
