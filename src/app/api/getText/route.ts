import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.NEXT_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});

export async function POST(req: Request, res: Response) {


    try {
        const formData = await req.formData();
        const file: any = formData.get("file");
        const transcription = await openai.audio.transcriptions.create({
            file: file,
            model: "whisper-1",
        });

        return new Response(JSON.stringify(transcription.text))


    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify(error), { status:500})
    }


}