export type EndangeredLevel = {
    title: string;
    description: string;
}

export const EndangeredLevels: Record<string, EndangeredLevel> = {
    CR: {
        title: "Critically Endangered",
        description: "Species at an extremely high risk of extinction in the wild. Immediate action is required to prevent their disappearance.",
    },
    EN: {
        title: "Endangered",
        description: "Species at a very high risk of extinction in the wild. These plants are one step down from Critically Endangered but still need significant conservation efforts.",
    },
    VU: {
        title: "Vulnerable",
        description: "Species at a high risk of extinction if no protective measures are taken. Although not immediately threatened, they are likely to move to higher threat levels if environmental or human factors persist.",
    },
    NT: {
        title: "Near Threatened",
        description: "Species close to qualifying for a threatened category but currently at a lower risk. They may become threatened in the near future without conservation actions.",
    },
    LC: {
        title: "Least Concern",
        description: "Species at low risk of extinction. These are widespread and abundant in the wild and do not currently require special conservation efforts.",
    },
    DD: {
        title: "Data Deficient",
        description: "Species lacking enough data to make an accurate assessment of their risk of extinction. More research is needed to determine their conservation status.",
    },
    NE: {
        title: "Not Evaluated",
        description: "Species that haven’t been assessed by the IUCN, so their conservation status remains unknown.",
    },
    EW: {
        title: "Extinct in the Wild",
        description: "Species that only survive in captivity or cultivation, with no known individuals left in their natural habitat.",
    },
    EX: {
        title: "Extinct",
        description: "Species that no longer exist anywhere on Earth, with no individuals left in the wild or captivity.",
    },
};