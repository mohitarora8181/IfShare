import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const connectDB = async () => {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI!).then(() => {
        console.log("MongoDb Database Connected");
    })
};

const whiteBoardSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    img: { type: mongoose.Schema.Types.Mixed, required: true }, 
    timeStamp : { type: Date, default: Date.now }
} );
whiteBoardSchema.set('timestamps', true);
const whiteBoardModel = mongoose.models.whiteBoard || mongoose.model('whiteBoard', whiteBoardSchema);

export async function POST(req: NextRequest) {
    await connectDB();

    const { id, img } = await req.json();

    if (!id || !img) {
        return new NextResponse("Invalid data: 'id' and 'img' are required", {
            status: 400,
        });
    }

    try {
        await whiteBoardModel.updateOne(
            { id: id },
            { $set: { id, img } },
            { upsert: true }
        );
        return new Response("done" , {status : 200})
    } catch (error) {
        console.log(error)
        return new Response(
            "Internal Sever error :- " + error, {
            status: 500
        })
    }
}


export async function GET(req: NextRequest) {
    await connectDB();
    const { searchParams } = req.nextUrl;
    const data = await whiteBoardModel.findOne({
        id: searchParams.get('id')
    });
    return new Response(JSON.stringify(data))
}