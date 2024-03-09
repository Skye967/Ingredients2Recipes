
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY })

type Data = {
    success: boolean;
    message?: string;
    data?: any;
};
export async function POST(
    req: NextRequest,
    res: NextResponse<Data>
) {

    if (req.method !== 'POST') {
        return NextResponse.json({ success: false, message: 'Method Not Allowed' });
    }

    try {

        const body = await req.json();

        if (!body) {
            return new Response("Error: promt is required", { status: 400 })
        }

        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: body.prompt + ' dish',
            n: 1,
            size: "1024x1024",
        });
        const image_url = response.data[0].url;
        return NextResponse.json(image_url)
    } catch (error: any) {
        console.error(NextResponse.json(error))
        return new Response(error, { status: 400 })
    }
}