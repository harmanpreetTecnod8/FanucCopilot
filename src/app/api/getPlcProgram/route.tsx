import Configuration, { OpenAI } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAI({
    apiKey: process.env.NEXT_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});



export async function POST(req: Request) {

    const { inputs, outputs, inputDescriptions, outputDescriptions, programObjective , programType} = await req.json();

    const prompt = `
      Inputs:
      ${inputs}
      Outputs:
      ${outputs}
      Input Descriptions:
      ${inputDescriptions}
      Output Descriptions:
      ${outputDescriptions}
      Program Objective:
      ${programObjective}
      Generate a PLC program in ${programType} based on the provided information. only provide code no description, no explanation, no warning , no notes, just plc code only.
    `;
    // console.log(prompt);
 //   Process Flow:
    //   ${processFlow}

    //   Other Protocols:
    //   ${otherProtocols}

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: "system",
                content:
                    "you are the PLC Programming expert",
            },

            {
                role: "user",
                content: `"${prompt}"`,
            },
        ],
        model: "gpt-4o",
        temperature: 0.4,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        n: 1,
    });

    const program = completion.choices[0].message.content


    return new Response(program)
}
