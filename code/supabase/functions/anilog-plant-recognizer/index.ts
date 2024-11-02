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

        const supabase = createClient(
            Deno.env.get('SB_URL'),
            Deno.env.get('SB_KEY'),
        );
        console.log('image recieved', imageUrl);

        // setup clients
        const openai = new OpenAI({
            apiKey: Deno.env.get('OPENAI_KEY'),
        });

        // Download image from url
        const response = await fetch(imageUrl);
        const arrayBuffer = await response.arrayBuffer();

        const fileName = 'plant.png';
        const mimeType = 'image/png';

        // Convert ArrayBuffer to Blob, then to File
        const blob = new Blob([arrayBuffer], { type: mimeType });

        // Create openai file for vision
        const file = await openai.files.create({
            file: new File([blob], fileName, { type: mimeType }),
            purpose: 'vision',
        });

        const recognizerAssistantId = 'asst_86rYwd4L2Ux25rWec1mRSEoY';
        const recognizerThread = await openai.beta.threads.create({
            messages: [
                {
                    role: 'user',
                    content: [
                        {
                            type: 'image_file',
                            image_file: {
                                file_id: file.id,
                            },
                        },
                    ],
                },
            ],
        });

        // query OpenAI for plant recognition
        const recognizerRun = await openai.beta.threads.runs.createAndPoll(
            recognizerThread.id,
            {
                assistant_id: recognizerAssistantId,
            },
        );
        if (recognizerRun.status !== 'completed') {
            return createErrorReponse('OpenAI run not completed');
        }
        const messages = await openai.beta.threads.messages.list(
            recognizerThread.id,
        );
        const regocnizedPlant = JSON.parse(
            messages.data[0]?.content[0].text.value,
        );

        console.log('respose from openai', regocnizedPlant);

        // return 404 if no plant was recognized
        if (regocnizedPlant.accuracy < 0.5) {
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

        const plantExpertAssistantId = 'asst_r8VoFvQkVMCPIwIlLauiazJs';
        const plantExpertThread = await openai.beta.threads.create({
            messages: [
                {
                    role: 'user',
                    content: regocnizedPlant.name_latin,
                },
            ],
        });

        const plantExpertRun = await openai.beta.threads.runs.createAndPoll(
            plantExpertThread.id,
            {
                assistant_id: plantExpertAssistantId,
            },
        );
        if (plantExpertRun.status !== 'completed') {
            return createErrorReponse('OpenAI run not completed');
        }
        const plantExpertMessages = await openai.beta.threads.messages.list(
            plantExpertThread.id,
        );
        const plantDetails = JSON.parse(
            plantExpertMessages.data[0]?.content[0].text.value,
        );

        // save unknown plant to the database
        const savedPlantData = mapPlantData(plantDetails);
        const { error: insertError } = await supabase
            .from('plants')
            .insert(plantDetails);
        if (insertError) {
            console.error(insertError);
            return createErrorReponse('Supabase insert error');
        }

        console.log(savedPlantData);

        return createSuccessReponse(plantDetails.id, true);
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

const createSuccessReponse = (id: string, isNew = false) => {
    return new Response(
        JSON.stringify({
            id,
            ...(isNew && { new: true }),
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
