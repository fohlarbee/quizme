import mongoose, { Schema } from "mongoose";


const questionSchema = new Schema({
    id: { type: mongoose.Types.ObjectId, default: () => new mongoose.Types.ObjectId() }, // Automatically generate ObjectId
    mainQuestion: {type: String, required: true},
    options:{type: [String], required: true},
    correctAnswer: {type: Number, required: true},
    answerResult: {type: Number, required: true, default: -1},
    statistics: {
        totalAttempts: {type: Number, required: true, default: 0},
        correctAttempts: {type: Number, required: true, default: 0},
        incorrectAttempts: {type: Number, required: true, default: 0}

    }
});

const quizSchema = new Schema({
    id: { type: mongoose.Types.ObjectId, default: () => new mongoose.Types.ObjectId() }, // Automatically generate ObjectId
    icon: {type: String, required: true},
    quizTitle: {type: String, required: true},
    quizQuestions:{type: [questionSchema], required: true},
    score: {type: Number, required: true, default: 0}
});

export const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', quizSchema);

export default Quiz;