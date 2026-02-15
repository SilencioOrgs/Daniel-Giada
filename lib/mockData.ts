export const WEDDING_DETAILS = {
    couple: {
        groom: "Daniel",
        bride: "Giada",
        initials: "D & G",
        hashtag: "#OriDANIELlyDestinedToGIADA",
    },
    date: {
        full: "May 16, 2026",
        month: "May",
        day: "16",
        year: "2026",
    },
    venue: {
        ceremony: {
            name: "San Fernando De Dilao Parish Church",
            address: "1521 Paz St. Paco, Manila",
            time: "2:00pm (ceremony), 1:30pm (ingress)",
            mapLink: "https://maps.google.com/?q=San+Fernando+De+Dilao+Parish+Church+Manila",
            presiders: [
                "Rev. Fr. Maxell Lowell C. Aranilla",
                "Rev. Fr. Lorenz Moises J. Festin"
            ]
        },
        reception: {
            name: "Patio De Manila",
            address: "Baypark, Roxas Blvd East Svc Rd, Malate, Manila",
            time: "4:30pm",
            mapLink: "https://maps.google.com/?q=Patio+De+Manila+Malate",
        }
    },
    giftGuide: "With all that we have we've been truly blessed. Your presence and prayers are all that we request, but if you desire to give nonetheless, a monetary gift is the one we humbly suggest."
};

export const DRESS_CODE = {
    principalSponsors: {
        gentlemen: "Gray Barong and Black Slacks",
        ladies: "Gown in Silver Gray"
    },
    guests: {
        gentlemen: "Long sleeves / polo in any shade of Gray",
        ladies: "Dress / Formal Top and Pants / Formal Jumpsuit in any shade of Gray"
    },
    note: "Please strictly follow the dress code."
};

export const ENTOURAGE = {
    groomsParents: [
        "Mr. Rodelio P. Quinto",
        "Mrs. Valeriana G. Quinto"
    ],

    bridesParents: [
        "Mr. Menandro N. Flores",
        "Mrs. Erlinda B. Flores"
    ],

    principalSponsors: [
        { male: "Mr. Armando P. Quinto", female: "Mrs. Marilyn C. Quinto" },
        { male: "Mr. Leonardo I. Gabriel", female: "Ms. Cecilia Palero" },
        { male: "Mr. Glen Lim", female: "Mrs. Evangeline Q. Lim" },
        { male: "Mr. Bobby B. Villamor", female: "Mrs. Catalina I. Gabriel" },
        { male: "Mr. Tomas N. Flores", female: "Mrs. Elizabeth T. Flores" },
        { male: "Mr. Arvin M. Flores", female: "Mrs. Abigail T. Flores" },
        { male: "Mr. Josue M. Nepomuceno", female: "Mrs. Ma. Glenda F. Nepomuceno" },
        { male: "Mr. Henry C. Cabangon", female: "Mrs. Delia V. Cabangon" },
        { male: "Mr. Renato N. Monsale Jr.", female: "Mrs. Alice R. Pagdunzulan" },
        { male: "Mr. Carlito O. Camaturan Jr.", female: "Mrs. Sushine H. Camaturan" }
    ],

    bestMan: "Mr. Aldrin Lee Diamond Q. Pingul",
    maidOfHonor: "Ms. Glendalyn B. Flores",
    matronOfHonor: "Mrs. Lesly Anne Lechado-Mamansag",

    secondarySponsors: {
        veil: {
            male: "Mr. Francis Paul B. Flores",
            female: "Mrs. Mary Grace F. Dulin"
        },
        cord: {
            male: "Mr. Jhon Michael R. Subia",
            female: "Ms. Ailyn L. Lamoste"
        },
        candle: {
            male: "Mr. Miguel Andrew C. Quinto",
            female: "Ms. Dianne G. Quinto"
        }
    },

    groomsmen: [
        "Mr. Arjay Cris C. Salazar",
        "Mr. John Leorick F. Salalila",
        "Mr. Aries Jade Sapon"
    ],

    bridesmaids: [
        "Ms. Christine B. Edic",
        "Mrs. Hannah Canimo-Torres"
    ],

    flowerLadies: [
        "John Marie F. Nepomuceno",
        "Christianne F. Nepomuceno",
        "Phoebe Adia Reese Q. Flores"
    ],

    flowerGirls: [
        "Angel Yesha F. Dulin",
        "Angela Yassi F. Dulin",
        "Mckyla Jazen H. Quinto",
        "Zariyah Callie S. Cuevas"
    ],

    bearers: {
        coin: "Mckale Jace H. Quinto",
        bible: "Paul Ryker C. Flores",
        ring: "Angelo Yohan F. Dulin"
    }
};

export type Guest = {
    id: number;
    name: string;
    status: "pending" | "confirmed" | "declined";
    maxGuests: number;
    role: string;
};

export const mockGuests: Guest[] = [
    {
        id: 1,
        name: "John Marie F. Nepomuceno",
        status: "pending",
        maxGuests: 1,
        role: "Flower Lady"
    },
    {
        id: 2,
        name: "Christianne F. Nepomuceno",
        status: "pending",
        maxGuests: 1,
        role: "Flower Lady"
    },
    {
        id: 3,
        name: "Phoebe Adia Reese Q. Flores",
        status: "pending",
        maxGuests: 1,
        role: "Flower Lady"
    },
    {
        id: 4,
        name: "Angel Yesha F. Dulin",
        status: "pending",
        maxGuests: 1,
        role: "Flower Girl"
    },
    {
        id: 5,
        name: "Angela Yassi F. Dulin",
        status: "pending",
        maxGuests: 1,
        role: "Flower Girl"
    },
    {
        id: 6,
        name: "Mckyla Jazen H. Quinto",
        status: "pending",
        maxGuests: 1,
        role: "Flower Girl"
    },
    {
        id: 7,
        name: "Zariyah Callie S. Cuevas",
        status: "pending",
        maxGuests: 1,
        role: "Flower Girl"
    },
    {
        id: 8,
        name: "Mckale Jace H. Quinto",
        status: "pending",
        maxGuests: 1,
        role: "Coin Bearer"
    },
    {
        id: 9,
        name: "Paul Ryker C. Flores",
        status: "pending",
        maxGuests: 1,
        role: "Bible Bearer"
    },
    {
        id: 10,
        name: "Angelo Yohan F. Dulin",
        status: "pending",
        maxGuests: 1,
        role: "Ring Bearer"
    },
];
