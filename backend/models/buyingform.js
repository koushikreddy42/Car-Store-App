const mongoose = require('mongoose')

const buyingformschema = new mongoose.Schema(
    {
        pdf:String,
    },
    {collection:"buyingform"}
)

mongoose.model("buyingform",buyingformschema)