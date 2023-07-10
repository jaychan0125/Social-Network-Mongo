const { Schema, model } = require('mongoose');

const usersSchema = new Schema(
    {
        username: {
            type: String,
            required: true, 
            unique: true, 
            trim: true,
        }, 
        email: {
            type: String, 
            required: true, 
            unique: true, 
            validate: {
                // using regex to test to see if email syntax: has 1 or more characters, '@', has 1 or more characters,'.', has 2+ characters from a-z; all case insensitive.
                validator: function(v) { 
                    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v);
                },
                message: props => `${props.value} is not a valid email address!`
            },
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',                     //reference to thought model
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',                        //self-reference
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        }, 
        id: false,
    },
);

usersSchema.virtual('friendCount').get(function () {
    return `${this.friends.length}`
});


const User = model('user', usersSchema);

module.exports = User;
