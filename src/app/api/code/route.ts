import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const connectDB = async () => {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI!).then(() => {
        console.log("MongoDb Database Connected");
    })
};

const codeSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    value: { type: String, required: true },
    theme: String,
    language: String,
});
codeSchema.set('timestamps', true);
const CodeModel = mongoose.models.Code || mongoose.model('Code', codeSchema);

export async function POST(req: NextRequest, res: NextResponse) {
    await connectDB();

    const { id, value, language, theme } = await req.json();
    try {
        await CodeModel.updateOne(
            { id: id },
            { $set: { id, value, language, theme } },
            { upsert: true }
        );
        return new Response("done")
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
    const data = await CodeModel.findOne({
        id: searchParams.get('id')
    });
    return new Response(JSON.stringify(data))
}