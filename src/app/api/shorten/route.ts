import { NextRequest, NextResponse } from "next/server";

export default async function handler(req : NextRequest) {
    console.log(req.method);
    
    if (req.method === 'POST') {
        const reqBody = await req.json()
        const { url } = reqBody;

        try {
            const response = await fetch(`https://api.tinyurl.com/v1/create?url=${encodeURIComponent(url)}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Add your API key if necessary (check TinyURL API documentation)
                    // 'Authorization': 'Bearer '
                }
            });

            console.log("in bw route");
            

            if (!response.ok) {
                throw new Error('Error from TinyURL API');
            }

            const data = await response.json();
            return NextResponse.json({ tinyUrl: data.data.tiny_url , status:200 });
        } catch (error) {
            console.error('Error:', error);
    return NextResponse.json({ message: 'Error shortening URL' }, { status: 500 });
        }
    } else {
        // res.setHeader('Allow', ['POST']);
        return NextResponse.json({ message: 'Method Not Allowed hahaha' }, { status: 405 }); // Return 405 for methods other than POST
    }
}
