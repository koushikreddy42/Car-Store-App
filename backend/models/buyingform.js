const mongoose = require('mongoose');

// Update schema to include both electricCarId and gasCarId
const buyingFormSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        houseNo: String,
        streetAddress: String,
        city: String,
        region: String,
        postalCode: String,
        state: String,
        comments: String,
        pdf: String,
        carType: String,
        buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'registeruser' },
        electricCarId: { type: mongoose.Schema.Types.ObjectId, ref: 'electriccarmodel', default: null },
        gasCarId: { type: mongoose.Schema.Types.ObjectId, ref: 'gascarmodel', default: null },
        adminVerified: { type: String, default: 'pending' },
        ownerVerified: { type: String, default: 'pending' },
        isAdmin:{type:Boolean, default:false}
    },
    { collection: "buyingform" }
);

mongoose.model("buyingform", buyingFormSchema);
