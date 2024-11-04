import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
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
        const { userId, plantId, isNewPlant } = await req.json();
        if (
            !userId ||
            !plantId ||
            isNewPlant === undefined ||
            isNewPlant === null
        ) {
            return createErrorReponse('Missing required parameters', 400);
        }

        const supabase = createClient(
            Deno.env.get('SB_URL'),
            Deno.env.get('SB_KEY'),
        );

        const pointsForPlant = await getPointsForPlant(
            userId,
            plantId,
            isNewPlant,
            supabase,
        );
        console.log('pointsForPlant', pointsForPlant);
        if (pointsForPlant === 0) {
            return createSuccessReponse('No points awarded');
        }
        const user = await getUser(userId, supabase);
        console.log('user', user);
        if (!user) {
            return createErrorReponse('User not found', 404);
        }
        await updateLeaderboardDatabase(pointsForPlant, user, supabase);

        return createSuccessReponse('Leaderboard updated');
    } catch (error) {
        console.error(error);
        return createErrorReponse('Unknown error');
    }
});

const isFirstScanOfPlant = async (
    userId: number,
    plantId: string,
    supabase: any,
): Promise<boolean> => {
    const { data: userScans } = await supabase
        .from('scans')
        .select('*')
        .eq('userId', userId);

    if (!userScans) {
        return true;
    }
    return userScans.every(
        (scan: { plantId: string }) => scan.plantId !== plantId,
    );
};

const getPointsForPlant = async (
    userId: number,
    plantId: string,
    isNewPlant: boolean,
    supabase: any,
): Promise<number> => {
    if (isNewPlant) {
        return 100;
    }
    const isFirstScanForUser = await isFirstScanOfPlant(
        userId,
        plantId,
        supabase,
    );
    console.log('isFirstScanForUser', isFirstScanForUser);
    if (isFirstScanForUser) {
        if (plantId === 'camellia_sinensis') {
            return 418;
        }
        if (plantId === 'cannabis_sativa' || plantId === 'cannabis_indica') {
            return 420;
        }
        return 50;
    }

    return 0;
};

const getUser = async (userId: number, supabase: any): Promise<any> => {
    const { data: user } = await supabase
        .from('user')
        .select('*')
        .eq('id', userId)
        .single();
    return user;
};

const updateLeaderboardDatabase = async (
    pointsToAdd: number,
    user: any,
    supabase: any,
): Promise<void> => {
    const { data: leaderboard, error } = await supabase
        .from('leaderboard')
        .select()
        .eq('user_id', user.id)
        .single();

    console.log('leaderboard', leaderboard);

    if (error?.code === SUPABASE_NO_RECORD_ERROR_TYPE) {
        await supabase
            .from('leaderboard')
            .insert({
                points: pointsToAdd,
                user_id: user.id,
                user_name: getName(user),
            })
            .eq('user_id', user.id)
            .select()
            .single();
        return;
    }

    await supabase
        .from('leaderboard')
        .update({ points: (leaderboard?.points ?? 0) + pointsToAdd })
        .eq('user_id', user.id)
        .select()
        .single();
};

const getName = (user: any) => {
    if (!user.firstName) {
        return 'We are Anonymous';
    }
    let name = user.firstName;
    if (user.lastName) {
        name += ` ${user.lastName.charAt(0)}.`;
    }
    return name;
};

const createErrorReponse = (errorMessage: string, code: number = 500) => {
    return new Response(
        JSON.stringify({
            error: errorMessage,
        }),
        {
            headers: { ...CONTENT_TYPE_HEADERS, ...CORS_HEADERS },
            status: code,
        },
    );
};

const createSuccessReponse = (body: string, statusCode: number = 200) => {
    return new Response(body, {
        headers: { ...CONTENT_TYPE_HEADERS, ...CORS_HEADERS },
        status: statusCode,
    });
};
