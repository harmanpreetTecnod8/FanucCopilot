import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import 'dotenv/config';

const apiKey = process.env.NEXT_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey });

export async function POST(req: NextRequest) {
  try {
    // Run CORS pre-flight checks
    // await cors(req, NextResponse.next(), corsOptions);

    const { text } = await req.json();
    console.log(text);
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: "alloy",
      input: text,
    });

    const audioBuffer = Buffer.from(await mp3.arrayBuffer());

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mp3',
      },
    });
  } catch (error) {
    console.error('Error generating speech:', error);
    return NextResponse.json(
      { error: 'Speech generation failed' },
      { status: 500 }
    );
  }
}