import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import OpenAI from 'https://deno.land/x/openai@v4.69.0/mod.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const SUPABASE_NO_RECORD_ERROR_TYPE = 'PGRST116';
const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
        'authorization, x-client-info, apikey, content-type',
};
const CONTENT_TYPE_HEADERS = { 'Content-Type': 'application/json' };

Deno.serve(async (req) => {
    try {
        const { imageUrl } = await req.json();
        console.log('image recieved', imageUrl);

        // setup clients
        const openai = new OpenAI({
            apiKey: Deno.env.get('OPENAI_KEY'),
        });
        const assistantId = 'asst_86rYwd4L2Ux25rWec1mRSEoY';
        const thread = await openai.beta.threads.create({
            messages: [
                {
                    role: 'user',
                    content: imageUrl,
                },
            ],
        });

        const supabase = createClient(
            Deno.env.get('SB_URL'),
            Deno.env.get('SB_KEY'),
        );

        // query OpenAI for plant recognition
        const run = await openai.beta.threads.runs.createAndPoll(thread.id, {
            assistant_id: assistantId,
        });
        if (run.status !== 'completed') {
            return createErrorReponse('OpenAI run not completed');
        }
        const messages = await openai.beta.threads.messages.list(thread.id);
        const regocnizedPlant = JSON.parse(
            messages.data[0]?.content[0].text.value,
        );

        console.log('respose from openai', regocnizedPlant);

        // return 404 if no plant was recognized
        if (!regocnizedPlant.was_recognized) {
            return createErrorReponse('Plant not recognized', 404);
        }

        // check if plant is already in the database
        const { data: existingPlant, error: queryError } = await supabase
            .from('plants')
            .select()
            .eq('id', regocnizedPlant.id)
            .single();
        if (queryError && queryError.code !== SUPABASE_NO_RECORD_ERROR_TYPE) {
            console.error(queryError);
            return createErrorReponse('Supabase error');
        }

        // return the plant data if present
        if (existingPlant) {
            return createSuccessReponse(existingPlant.id);
        }

        // save unknown plant to the database
        const savedPlantData = mapPlantData(regocnizedPlant);
        const { error: insertError } = await supabase
            .from('plants')
            .insert(savedPlantData);
        if (insertError) {
            console.error(insertError);
            return createErrorReponse('Supabase insert error');
        }

        console.log(savedPlantData);

        return createSuccessReponse(savedPlantData.id);
    } catch (error) {
        console.error(error);
    }

    return createErrorReponse('Unknown error');
});

const createErrorReponse = (error: string, code: number = 500) => {
    return new Response(
        JSON.stringify({
            error,
        }),
        {
            headers: { ...CONTENT_TYPE_HEADERS, ...CORS_HEADERS },
            status: code,
        },
    );
};

const createSuccessReponse = (id: string) => {
    return new Response(
        JSON.stringify({
            id,
        }),
        {
            headers: { ...CONTENT_TYPE_HEADERS, ...CORS_HEADERS },
        },
    );
};

const mapPlantData = (data: any) => {
    return {
        id: throwIfUndefined(data.id),
        name_common: throwIfUndefined(data.name_common),
        name_latin: throwIfUndefined(data.name_latin),
        endangered_level: throwIfUndefined(data.endangered_level),
        description_short: throwIfUndefined(data.description_short),
        description_long: throwIfUndefined(data.description_long),
        nateive_habitat: throwIfUndefined(data.nateive_habitat),
        color: throwIfUndefined(data.color),
        family: throwIfUndefined(data.family),
        fun_fact: throwIfUndefined(data.fun_fact),
    };
};

const throwIfUndefined = (value: any) => {
    if (value === undefined) {
        // FIXME: Temporary hack until prompt is updated
        // throw new Error('Value is undefined');
        return 'Unknown';
    }
};
