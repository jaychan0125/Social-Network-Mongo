const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String, 
            required: true, 
            minlength: 1,
            maxlength: 280,
        }, 
        createdAt: {
            type: Date,
            default: Date.now,
            get: function (date) {
                return new Date (date).toLocaleDateString()          //javasccript date formatting
            } 
        },
        username: {                             
            type: String,        
            required: true, 
        },
        reactions: [reactionSchema],            //subdocument reactionSchema
    },
    {
        toJSON: {
          getters: true,            //is this the 'getter method to format timestamp on query' for README.md line103??
          virtuals: true,
        },
        id: false,
      }, 

);

thoughtSchema.virtual('reactionCount').get(function () {
    return `${this.reactions.length}`
})

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
