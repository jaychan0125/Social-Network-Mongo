const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        }, 
        reactionBody: {
            type: String, 
            required: true, 
            maxlength: 280,
        },
        username: {
            type: String, 
            required: true, 
        }, 
        createdAt: {
            type: Date, 
            default: Date.now,
            get: function (date) {
                return new Date (date).toLocaleDateString()          //javasccript date formatting
            } 
        },
    },
    {
        toJSON: {
          getters: true,            //is this the 'getter method to format timestamp on query' for README.md line136??
        },
        id: false,
      }, 
);

module.exports = reactionSchema;    //subdocuments export out the schema, not model!