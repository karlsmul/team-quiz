// ===== QUESTION DATABASE =====
// Categories: animals, cities, celebrities, team, custom

const QUESTIONS = {

    animals: [
        {
            question: "Welches Tier ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/800px-Cat_November_2010-1a.jpg",
            answers: ["Katze", "Luchs", "Ozelot", "Puma"],
            correct: 0
        },
        {
            question: "Welches Tier ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/YellowLabradorLooking_new.jpg/800px-YellowLabradorLooking_new.jpg",
            answers: ["Golden Retriever", "Labrador", "Pudel", "Beagle"],
            correct: 1
        },
        {
            question: "Welches Tier ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/2010-kodiak-bear-1.jpg/800px-2010-kodiak-bear-1.jpg",
            answers: ["Grizzlybär", "Eisbär", "Kodiakbär", "Braunbär"],
            correct: 2
        },
        {
            question: "Welches Tier ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/800px-Cat03.jpg",
            answers: ["Perserkatze", "Hauskatze", "Maine Coon", "Siamkatze"],
            correct: 1
        },
        {
            question: "Welches Tier ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dog_park_in_San_Jose_CA.jpg/800px-Dog_park_in_San_Jose_CA.jpg",
            answers: ["Schäferhund", "Rottweiler", "Dobermann", "Labrador"],
            correct: 3
        },
        {
            question: "Welches Tier ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/African_Elephant_%28Loxodonta_africana%29_bull_%2831100819046%29.jpg/800px-African_Elephant_%28Loxodonta_africana%29_bull_%2831100819046%29.jpg",
            answers: ["Elefant", "Nashorn", "Nilpferd", "Mammut"],
            correct: 0
        },
        {
            question: "Welches Tier siehst du hier?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Lion_waiting_in_Namibia.jpg/800px-Lion_waiting_in_Namibia.jpg",
            answers: ["Tiger", "Leopard", "Löwe", "Gepard"],
            correct: 2
        },
        {
            question: "Welches Tier ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Giraffe_Ithala_KZN_South_Africa_Luca_Galuzzi_2004.JPG/800px-Giraffe_Ithala_KZN_South_Africa_Luca_Galuzzi_2004.JPG",
            answers: ["Okapi", "Giraffe", "Antilope", "Zebra"],
            correct: 1
        },
        {
            question: "Welches Tier ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Panda_Cub_from_Wolong%2C_Sichuan%2C_China.JPG/800px-Panda_Cub_from_Wolong%2C_Sichuan%2C_China.JPG",
            answers: ["Waschbär", "Koala", "Pandabär", "Lemur"],
            correct: 2
        },
        {
            question: "Welches Tier ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Killerwhales_jumping.jpg/800px-Killerwhales_jumping.jpg",
            answers: ["Delfin", "Blauwal", "Orca", "Hai"],
            correct: 2
        },
        {
            question: "Welches Tier ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Flamingos_Laguna_Colorada.jpg/800px-Flamingos_Laguna_Colorada.jpg",
            answers: ["Storch", "Flamingo", "Pelikan", "Reiher"],
            correct: 1
        },
        {
            question: "Welches Tier ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Polar_Bear_-_Alaska_%28cropped%29.jpg/800px-Polar_Bear_-_Alaska_%28cropped%29.jpg",
            answers: ["Eisbär", "Schneeleopard", "Polarfuchs", "Schneehase"],
            correct: 0
        }
    ],

    cities: [
        {
            question: "Welche Stadt ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Tour_eiffel_at_sunrise_from_the_trocadero.jpg/800px-Tour_eiffel_at_sunrise_from_the_trocadero.jpg",
            answers: ["London", "Paris", "Rom", "Madrid"],
            correct: 1
        },
        {
            question: "Welche Stadt ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_york_times_square-terabass.jpg/800px-New_york_times_square-terabass.jpg",
            answers: ["Los Angeles", "Chicago", "New York", "Las Vegas"],
            correct: 2
        },
        {
            question: "Welche Stadt ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Colosseum_in_Rome-April_2007-1-_copie_2B.jpg/800px-Colosseum_in_Rome-April_2007-1-_copie_2B.jpg",
            answers: ["Athen", "Rom", "Istanbul", "Barcelona"],
            correct: 1
        },
        {
            question: "Welche Stadt ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Sydney_%28AU%29%2C_Opera_House_--_2019_--_2055-57.jpg/800px-Sydney_%28AU%29%2C_Opera_House_--_2019_--_2055-57.jpg",
            answers: ["Melbourne", "Sydney", "Auckland", "Kapstadt"],
            correct: 1
        },
        {
            question: "Welche Stadt ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/800px-Skyscrapers_of_Shinjuku_2009_January.jpg",
            answers: ["Seoul", "Shanghai", "Tokio", "Hongkong"],
            correct: 2
        },
        {
            question: "Welche Stadt ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Brandenburger_Tor_abends.jpg/800px-Brandenburger_Tor_abends.jpg",
            answers: ["München", "Berlin", "Hamburg", "Wien"],
            correct: 1
        },
        {
            question: "Welche Stadt ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Dubai_Marina_Skyline.jpg/800px-Dubai_Marina_Skyline.jpg",
            answers: ["Abu Dhabi", "Doha", "Dubai", "Riad"],
            correct: 2
        },
        {
            question: "Welche Stadt ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/London_Thames_Sunset_panorama_-_Feb_2008.jpg/800px-London_Thames_Sunset_panorama_-_Feb_2008.jpg",
            answers: ["London", "Amsterdam", "Dublin", "Edinburgh"],
            correct: 0
        },
        {
            question: "Welche Stadt ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg",
            answers: ["Chicago", "New York", "Philadelphia", "Boston"],
            correct: 1
        },
        {
            question: "Welche Stadt ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Panorama_of_Macao.jpg/800px-Panorama_of_Macao.jpg",
            answers: ["Shanghai", "Macau", "Singapur", "Hongkong"],
            correct: 1
        },
        {
            question: "Welche Stadt ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Acropolis_from_south-west.jpg/800px-Acropolis_from_south-west.jpg",
            answers: ["Rom", "Athen", "Istanbul", "Kairo"],
            correct: 1
        },
        {
            question: "Welche Stadt ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg/800px-La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg",
            answers: ["Lyon", "Paris", "Brüssel", "Marseille"],
            correct: 1
        }
    ],

    celebrities: [
        {
            question: "Wer ist diese Person?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Albert_Einstein_Head.jpg/800px-Albert_Einstein_Head.jpg",
            answers: ["Nikola Tesla", "Albert Einstein", "Isaac Newton", "Stephen Hawking"],
            correct: 1
        },
        {
            question: "Wer ist diese Person?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Beethoven.jpg/800px-Beethoven.jpg",
            answers: ["Mozart", "Bach", "Beethoven", "Chopin"],
            correct: 2
        },
        {
            question: "Wer ist diese Person?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/800px-President_Barack_Obama.jpg",
            answers: ["Joe Biden", "Barack Obama", "Bill Clinton", "George Bush"],
            correct: 1
        },
        {
            question: "Wer ist diese Person?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
            answers: ["Mona Lisa", "Venus", "Maria", "Kleopatra"],
            correct: 0
        },
        {
            question: "Wer ist diese Person?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Angela_Merkel_2019_%28cropped%29.jpg/800px-Angela_Merkel_2019_%28cropped%29.jpg",
            answers: ["Ursula von der Leyen", "Angela Merkel", "Annalena Baerbock", "Hillary Clinton"],
            correct: 1
        },
        {
            question: "Wer ist diese Person?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Frida_Kahlo_1932.jpg/800px-Frida_Kahlo_1932.jpg",
            answers: ["Georgia O'Keeffe", "Frida Kahlo", "Yoko Ono", "Tamara de Lempicka"],
            correct: 1
        },
        {
            question: "Wer ist diese Person?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Leonardo_da_Vinci_-_presumed_self-portrait_-_WGA12798.jpg/800px-Leonardo_da_Vinci_-_presumed_self-portrait_-_WGA12798.jpg",
            answers: ["Galileo Galilei", "Michelangelo", "Leonardo da Vinci", "Raffael"],
            correct: 2
        },
        {
            question: "Wer ist diese Person?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Freddie_Mercury_performing_in_New_Haven%2C_CT%2C_November_1977.jpg/800px-Freddie_Mercury_performing_in_New_Haven%2C_CT%2C_November_1977.jpg",
            answers: ["David Bowie", "Freddie Mercury", "Mick Jagger", "Elton John"],
            correct: 1
        },
        {
            question: "Wer ist diese Person?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Leonardo_Dicaprio_Cannes_2019.jpg/800px-Leonardo_Dicaprio_Cannes_2019.jpg",
            answers: ["Brad Pitt", "Leonardo DiCaprio", "Johnny Depp", "Robert Downey Jr."],
            correct: 1
        },
        {
            question: "Wer ist diese Person?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Charlie_Chaplin.jpg/800px-Charlie_Chaplin.jpg",
            answers: ["Buster Keaton", "Charlie Chaplin", "Laurel", "Hardy"],
            correct: 1
        },
        {
            question: "Wer ist diese berühmte Figur?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Marilyn_Monroe_-_publicity.jpg/800px-Marilyn_Monroe_-_publicity.jpg",
            answers: ["Grace Kelly", "Audrey Hepburn", "Marilyn Monroe", "Elizabeth Taylor"],
            correct: 2
        },
        {
            question: "Wer ist diese Person?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Nelson_Mandela_1994.jpg/800px-Nelson_Mandela_1994.jpg",
            answers: ["Martin Luther King", "Nelson Mandela", "Kofi Annan", "Desmond Tutu"],
            correct: 1
        },
        {
            question: "Wer ist diese Person?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Queen_Elizabeth_II_in_March_2015.jpg/800px-Queen_Elizabeth_II_in_March_2015.jpg",
            answers: ["Margaret Thatcher", "Queen Elizabeth II", "Queen Victoria", "Prinzessin Diana"],
            correct: 1
        },
        {
            question: "Wer ist diese Person?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg/800px-Arnold_Schwarzenegger_by_Gage_Skidmore_4.jpg",
            answers: ["Sylvester Stallone", "Dwayne Johnson", "Arnold Schwarzenegger", "Chuck Norris"],
            correct: 2
        }
    ],

    team: [
        {
            question: "Wir arbeiten gerne...",
            answers: ["isotonisch", "generisch", "systemisch", "platonisch"],
            correct: 2
        },
        {
            question: "Darf ich deine Nummer haben?",
            answers: ["192", "537", "110", "197"],
            correct: 3
        },
        {
            question: "Freestyle gibt es seit...",
            answers: ["10 Jahren", "25 Jahren", "15 Jahren", "9 Jahren"],
            correct: 2
        },
        {
            question: "Wie viele Fälle haben wir aktuell?",
            answers: ["67", "73", "80"],
            correct: 1
        },
        {
            question: "Welches ist das schönste Team?",
            answers: ["T3", "T3", "T3", "T3"],
            correct: -1,
            allCorrect: true
        },
        {
            question: "Wer ist regelmäßig im Büro aber hat keine eigenen Fälle?",
            answers: ["Der Drucker", "Naja", "Die Kaffeemaschine", "Der WLAN-Router"],
            correct: 1
        },
        {
            question: "Wie viele Arbeitsplätze haben wir im Büro?",
            answers: ["10", "12", "9", "8"],
            correct: 0
        },
        {
            question: "Wie lautet die Postleitzahl unseres Büro-Standorts?",
            answers: ["80339", "80335", "80334", "80337"],
            correct: 1
        },
        {
            question: "Für was steht das 'g' in gGmbH?",
            answers: ["gemein", "gemeinnützig", "gerechte", "gesellschaft"],
            correct: 1
        }
    ],

    custom: [
        {
            question: "Wie viele Kontinente gibt es?",
            answers: ["5", "6", "7", "8"],
            correct: 2
        },
        {
            question: "Welches ist das größte Organ des menschlichen Körpers?",
            answers: ["Leber", "Gehirn", "Haut", "Lunge"],
            correct: 2
        },
        {
            question: "Wie viele Spieler hat eine Fußballmannschaft auf dem Feld?",
            answers: ["9", "10", "11", "12"],
            correct: 2
        },
        {
            question: "Welches Land hat die meisten Einwohner?",
            answers: ["Indien", "USA", "China", "Indonesien"],
            correct: 0
        },
        {
            question: "Was ist die Hauptstadt von Australien?",
            answers: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
            correct: 2
        },
        {
            question: "Welches chemische Element hat das Symbol 'O'?",
            answers: ["Gold", "Osmium", "Sauerstoff", "Opal"],
            correct: 2
        },
        {
            question: "In welchem Jahr fiel die Berliner Mauer?",
            answers: ["1987", "1988", "1989", "1990"],
            correct: 2
        },
        {
            question: "Wie viele Zähne hat ein erwachsener Mensch normalerweise?",
            answers: ["28", "30", "32", "34"],
            correct: 2
        },
        {
            question: "Welcher Planet ist der Sonne am nächsten?",
            answers: ["Venus", "Merkur", "Mars", "Erde"],
            correct: 1
        },
        {
            question: "Welche Farbe entsteht, wenn man Blau und Gelb mischt?",
            answers: ["Grün", "Orange", "Lila", "Braun"],
            correct: 0
        },
        {
            question: "Wie viele Bundesländer hat Deutschland?",
            answers: ["14", "15", "16", "17"],
            correct: 2
        },
        {
            question: "Welches Tier kann am schnellsten laufen?",
            answers: ["Löwe", "Gepard", "Gazelle", "Pferd"],
            correct: 1
        },
        {
            question: "Welches ist das kleinste Land der Welt?",
            answers: ["Monaco", "Vatikanstadt", "San Marino", "Liechtenstein"],
            correct: 1
        },
        {
            question: "Wie heißt der längste Knochen im menschlichen Körper?",
            answers: ["Schienbein", "Oberschenkelknochen", "Oberarmknochen", "Wirbelsäule"],
            correct: 1
        },
        {
            question: "Welches Getränk wird aus Hopfen und Malz hergestellt?",
            answers: ["Wein", "Whisky", "Bier", "Gin"],
            correct: 2
        }
    ]
};
