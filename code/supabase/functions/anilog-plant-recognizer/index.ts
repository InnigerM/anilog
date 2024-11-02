import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import OpenAI from 'https://deno.land/x/openai@v4.69.0/mod.ts';

Deno.serve(async (req) => {
    try {
        const { imageUrl } = await req.json();

        const openai = new OpenAI({
            apiKey: Deno.env.get('OPENAI_KEY'),
        });

        let assistantId = 'asst_86rYwd4L2Ux25rWec1mRSEoY';

        const thread = await openai.beta.threads.create({
            messages: [
                {
                    role: 'user',
                    content: imageUrl,
                },
            ],
        });

        const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
            assistant_id: assistantId,
        });

        if (run.status == 'completed') {
            const messages = await openai.beta.threads.messages.list(thread.id);
            const assistantResponse = messages.data[0]?.content[0].text.value;

            return new Response(assistantResponse, {
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error) {
        console.error(error);
    }

    return new Response(
        JSON.stringify({
            error: 'Unknown error',
        }),
        {
            headers: { 'Content-Type': 'application/json' },
            status: 500,
        },
    );
});
