import {NextRequest, NextResponse} from 'next/server';
import { connectDB } from '@/lib/connectDB';
import Quiz from '../models/QuizSchema';


export async function POST(req: Request){
    await connectDB();
    const {quizTitle, icon, quizQuestions} = await req.json();
    const newQuiz = await Quiz.create({quizTitle, icon, quizQuestions});
    
    try {
        return NextResponse.json({
            id: newQuiz._id,
            message: 'The Quiz has been created successfully',
        });
    } catch (error: unknown) {
          return NextResponse.json({
            message: 'The Quiz could not be created',
            error: (error instanceof Error) ? error.message : 'Unknown error',

        });
    }

}

export async function GET( ){
    await connectDB();
    const quizzes = await Quiz.find();

    try {
    return NextResponse.json(quizzes);
        
    } catch (error) {
        return NextResponse.json({
            message: 'The Quizzes could not be fetched',
            error: (error instanceof Error) ? error.message : 'Unknown error',
        });
        
    }
}

export async function PUT(req: NextRequest){
    const id = req.nextUrl.searchParams.get('id');

    try {
        await connectDB();
        const quizToUpdate = await Quiz.findById(id);
        const {updateQuiz, updateQuizQuestions} = await req.json();

        // Update poperties of the Quiz we want to update
        if (updateQuiz) {
            quizToUpdate.icon = updateQuiz.icon;
            quizToUpdate.quizTitle = updateQuiz.quizTitle
            quizToUpdate.quizQuestions = updateQuiz.quizQuestions;
        }

        if (updateQuizQuestions) quizToUpdate.quizQuestions = updateQuizQuestions;

        
        await quizToUpdate.save();
        return NextResponse.json({mssg: 'The Quiz has been updated successfully'});
    } catch (error) {
        return NextResponse.json({
            message: 'The Quiz could not be updated',
            error: (error instanceof Error) ? error.message : 'Unknown error',
        });
    }
    
}

export async function DELETE(req: NextRequest){ 
    const id = req.nextUrl.searchParams.get('id');
    try {
        await connectDB();
        await Quiz.findByIdAndDelete(id);
        return NextResponse.json({mssg: 'The Quiz has been deleted successfully'});
    } catch (error) {
        return NextResponse.json({
            message: 'The Quiz could not be deleted',
            error: (error instanceof Error) ? error.message : 'Unknown error',
        });
    }
}


