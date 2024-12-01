import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "../route";
import { files } from "jszip";
import { CodeModel } from "../../../code/route";
import { NotesModel } from "../../../notes/route";

const connectDB = async () => {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI!).then(() => {
        console.log("MongoDb Database Connected");
    })
};

export async function POST(req: NextRequest) {
    await connectDB();
    const { userId, id, status, type } = await req.json();

    try {
        const user = await UserModel.find({ userId });
        if (!user) {
            return new Response('user not found', { status: 404 });
        }
        await UserModel.updateOne(
            { userId, [`${type}.id`]: id },
            {
                $set: {
                    [`${type}.$[ele].lock`]: status
                }
            },
            {
                arrayFilters: [{
                    "ele.id": id
                }]
            }
        )

        if (type == 'codes') {
            await CodeModel.updateOne(
                { id },
                { $set: { 'lock': status } },
                { upsert: true }
            );
        }

        if (type == 'notes') {
            await NotesModel.updateOne(
                { id },
                { $set: { 'lock': status } },
                { upsert: true }
            );
        }

        return new Response('done');
    } catch (error) {
        console.log(error)
        return new Response(
            "Internal Sever error :- " + error, {
            status: 500
        })
    }
}