export type RecognizedPlant = {
    id: string;
    name_common: string;
    name_latin: string;
    endangered_level: EngangerdLevel;
    description_short: string;
    description_long: string;
    native_habitat: string;
    color: string;
    family: string;
    fun_fact: string;
    shiny?: boolean; // is never returned from the API, can be set manually in supabase
};

export type EngangerdLevel =
    | 'CR'
    | 'EN'
    | 'VU'
    | 'NT'
    | 'LC'
    | 'DD'
    | 'NE'
    | 'EW'
    | 'EX';
