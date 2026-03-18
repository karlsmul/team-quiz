// ===== QUESTION DATABASE =====
// Categories: animals, cities, celebrities, custom

const QUESTIONS = {

    animals: [
        {
            question: "Welches Tier ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
            answers: ["Katze", "Luchs", "Ozelot", "Puma"],
            correct: 0
        },
        {
            question: "Welches Tier ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/YellowLabradorLooking_new.jpg/1200px-YellowLabradorLooking_new.jpg",
            answers: ["Golden Retriever", "Labrador", "Pudel", "Beagle"],
            correct: 1
        },
        {
            question: "Welches Tier ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/2010-kodiak-bear-1.jpg/1200px-2010-kodiak-bear-1.jpg",
            answers: ["Grizzlybär", "Eisbär", "Kodiakbär", "Braunbär"],
            correct: 2
        },
        {
            question: "Welches Tier ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg",
            answers: ["Perserkatze", "Hauskatze", "Maine Coon", "Siamkatze"],
            correct: 1
        },
        {
            question: "Welches Tier ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Dog_park_in_San_Jose_CA.jpg/1200px-Dog_park_in_San_Jose_CA.jpg",
            answers: ["Schäferhund", "Rottweiler", "Dobermann", "Labrador"],
            correct: 3
        },
        {
            question: "Welches Tier ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGatebridge-001.jpg/1200px-GoldenGatebridge-001.jpg",
            answers: ["Elefant", "Nashorn", "Nilpferd", "Giraffe"],
            correct: 0,
            // Placeholder — will be replaced with proper image
            _note: "Replace with elephant image"
        },
        {
            question: "Welches Tier siehst du hier?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Lion_waiting_in_Namibia.jpg/1200px-Lion_waiting_in_Namibia.jpg",
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
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Flickr_-_Rainbirder_-_Spot-billed_Pelican_%28Pelecanus_philippensis%29.jpg/1200px-Flickr_-_Rainbirder_-_Spot-billed_Pelican_%28Pelecanus_philippensis%29.jpg",
            answers: ["Storch", "Flamingo", "Pelikan", "Reiher"],
            correct: 2
        },
        {
            question: "Welches Tier ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Panda_Cub_from_Wolong%2C_Sichuan%2C_China.JPG/1200px-Panda_Cub_from_Wolong%2C_Sichuan%2C_China.JPG",
            answers: ["Waschbär", "Koala", "Pandabär", "Lemur"],
            correct: 2
        },
        {
            question: "Welches Tier ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Collage_of_Nine_Dogs.jpg/1200px-Collage_of_Nine_Dogs.jpg",
            answers: ["Katzen", "Hunde", "Wölfe", "Füchse"],
            correct: 1
        },
        {
            question: "Welches Tier ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Killerwhales_jumping.jpg/1200px-Killerwhales_jumping.jpg",
            answers: ["Delfin", "Blauwal", "Orca", "Hai"],
            correct: 2
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
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/New_york_times_square-terabass.jpg/1200px-New_york_times_square-terabass.jpg",
            answers: ["Los Angeles", "Chicago", "New York", "Las Vegas"],
            correct: 2
        },
        {
            question: "Welche Stadt ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Colosseum_in_Rome-April_2007-1-_copie_2B.jpg/1200px-Colosseum_in_Rome-April_2007-1-_copie_2B.jpg",
            answers: ["Athen", "Rom", "Istanbul", "Barcelona"],
            correct: 1
        },
        {
            question: "Welche Stadt ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Sydney_%28AU%29%2C_Opera_House_--_2019_--_2055-57.jpg/1200px-Sydney_%28AU%29%2C_Opera_House_--_2019_--_2055-57.jpg",
            answers: ["Melbourne", "Sydney", "Auckland", "Kapstadt"],
            correct: 1
        },
        {
            question: "Welche Stadt ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/1200px-Skyscrapers_of_Shinjuku_2009_January.jpg",
            answers: ["Seoul", "Shanghai", "Tokio", "Hongkong"],
            correct: 2
        },
        {
            question: "Welche Stadt ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Brandenburger_Tor_abends.jpg/1200px-Brandenburger_Tor_abends.jpg",
            answers: ["München", "Berlin", "Hamburg", "Wien"],
            correct: 1
        },
        {
            question: "Welche Stadt ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Ponte_Vecchio_-_Florence%2C_Italy_-_June_15%2C_2013_-_panoramio.jpg/1200px-Ponte_Vecchio_-_Florence%2C_Italy_-_June_15%2C_2013_-_panoramio.jpg",
            answers: ["Venedig", "Florenz", "Verona", "Pisa"],
            correct: 1
        },
        {
            question: "Welche Stadt ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Dubai_Marina_Skyline.jpg/1200px-Dubai_Marina_Skyline.jpg",
            answers: ["Abu Dhabi", "Doha", "Dubai", "Riad"],
            correct: 2
        },
        {
            question: "Welche Stadt ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/London_Thames_Sunset_panorama_-_Feb_2008.jpg/1200px-London_Thames_Sunset_panorama_-_Feb_2008.jpg",
            answers: ["London", "Amsterdam", "Dublin", "Edinburgh"],
            correct: 0
        },
        {
            question: "Welche Stadt ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Barcelona_-_Pair_of_Towers_-_2016.jpg/800px-Barcelona_-_Pair_of_Towers_-_2016.jpg",
            answers: ["Madrid", "Lissabon", "Barcelona", "Valencia"],
            correct: 2
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
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head_Cleaned_N_Brightened.jpg/800px-Albert_Einstein_Head_Cleaned_N_Brightened.jpg",
            answers: ["Max Planck", "Albert Einstein", "Niels Bohr", "Werner Heisenberg"],
            correct: 1
        },
        {
            question: "Wer ist diese Person?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/President_Barack_Obama.jpg/800px-President_Barack_Obama.jpg",
            answers: ["Joe Biden", "Barack Obama", "Bill Clinton", "George Bush"],
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
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
            answers: ["Mona Lisa", "Venus", "Maria", "Kleopatra"],
            correct: 0
        },
        {
            question: "Wer ist diese Person?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Abraham_Lincoln_O-77_matte_collodion_print.jpg/800px-Abraham_Lincoln_O-77_matte_collodion_print.jpg",
            answers: ["George Washington", "Theodore Roosevelt", "Abraham Lincoln", "Thomas Jefferson"],
            correct: 2
        },
        {
            question: "Wer ist diese Person?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Frida_Kahlo_1932.jpg/800px-Frida_Kahlo_1932.jpg",
            answers: ["Georgia O'Keeffe", "Frida Kahlo", "Yoko Ono", "Tamara de Lempicka"],
            correct: 1
        },
        {
            question: "Wer ist diese Person?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Bundesarchiv_Bild_183-S33882%2C_Adolf_Hitler_%28cropped2%29.jpg/800px-Bundesarchiv_Bild_183-S33882%2C_Adolf_Hitler_%28cropped2%29.jpg",
            answers: ["Bismarck", "Adolf Hitler", "Stalin", "Mussolini"],
            correct: 1
        },
        {
            question: "Wer ist diese Person?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Angela_Merkel_2019_%28cropped%29.jpg/800px-Angela_Merkel_2019_%28cropped%29.jpg",
            answers: ["Ursula von der Leyen", "Angela Merkel", "Annalena Baerbock", "Hillary Clinton"],
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
            question: "Wie heißt die längste Knochen im menschlichen Körper?",
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
