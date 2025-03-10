const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
    {
        title : {
            type : String,
            required : true ,
            unique : true ,
        },

        desc : {
            type : String,
            required : true,
            unique : true,
        },
        important : {
            type : Boolean,
            default : false,
        },
        complete : {
            type : Boolean,
            default : false,
        }
    } ,

    // timestamps :  automatically creates and manages two fields in your documents:
    // Stores the timestamp when the document was first created.
    // when the document was last modified.
    {timestamps : true}
)

module.exports = mongoose.model("task", TaskSchema);