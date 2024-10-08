const mongoose = require('mongoose');

// Tạo schema cho kỳ thi (Exam)
const examSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    participant_count: {
        type: Number,
        default: 0 // Số lượng người tham gia thi
    },
    question_count: {
        type: Number,
        required: true
    },
    duration: {
        type: Number, // Số phút thi
        required: true
    },
    image: {
        required: true,
        type: String
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'question', 
    }]
}, { timestamps: true });

module.exports = mongoose.model('exam', examSchema);;