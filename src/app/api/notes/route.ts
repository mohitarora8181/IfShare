import mongoose from "mongoose";
import { NextRequest } from "next/server";

const connectDB = async () => {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGO_URI!).then(() => {
        console.log("MongoDb Database Connected");
    })
};

const codeSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true },
    value: { type: String, required: true },
});
codeSchema.set('timestamps', true);
const NotesModel = mongoose.models.Notes || mongoose.model('Notes', codeSchema);

export async function POST(req: NextRequest) {
    await connectDB();

    try {
        const { id, value } = await req.json();

        await NotesModel.updateOne(
            { id: id },
            { $set: { id, value } },
            { upsert: true }
        );
        return new Response("Done", { status: 200 });
    } catch (error) {
        console.error("POST Request Error:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}


export async function GET(req: NextRequest) {
    await connectDB();
    const { searchParams } = req.nextUrl;
    const data = await NotesModel.findOne({
        id: searchParams.get('id')
    });
    return new Response(JSON.stringify(data))
}