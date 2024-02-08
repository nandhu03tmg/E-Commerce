const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String
        },
        password: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

const user = mongoose.model('user', userSchema);

module.exports = user;