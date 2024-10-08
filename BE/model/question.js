var mongoose = require("mongoose");

// Tạo schema cho câu hỏi trắc nghiệm
const questionSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['single-choice', 'multiple-choice'], 
        required: true
    },
    difficult: {
        type: String,
        enum: ['easy', 'medium', 'hard'], 
        default: 'medium'
    },
    options: [
        {
            id: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            }
        }
    ],
    correct_answer: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = new mongoose.model('question', questionSchema);

