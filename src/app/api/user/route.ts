import { connectDB } from "@/lib/connectDB";
import User from "../models/UserSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    await connectDB();

    try {
        // Count the number of documments in the user collections
        const countUsers = await User.countDocuments();

        if (countUsers > 0){
            // If at least one user exists, find and return the first user
            const findUser = await User.findOne();
            return NextResponse.json({
                mssg: 'User Already Exists',
                user: findUser
            });


        };

        const {name, isLoggedIn, experience} = await req.json();
        const newUser = await User.create({name,isLoggedIn,experience});    
        return NextResponse.json({
            mssg: 'User Created',
            user: newUser
        });
    } catch (error) {
        return NextResponse.json({
            mssg:'Error Creating User',
            error
        })
        
    }
}

export async function PUT(req: NextRequest){
    try {
        const id = req.nextUrl.searchParams.get('id');

        const userUpdate = await User.findById(id);

        const {updateUser} = await req.json();
        userUpdate.isLoggedIn = updateUser.isLoggedIn;
        userUpdate.experience = updateUser.experience;


        await userUpdate.save();
        return NextResponse.json({mssg:'User Saved'});
    } catch (error) {
        return NextResponse.json({
            mssg:'Error Saving User',
            error
        });
        
    }
}