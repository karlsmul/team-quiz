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
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/960px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg",
            answers: ["London", "Paris", "Rom", "Madrid"],
            correct: 1
        },
        {
            question: "Welche Stadt ist das?",
            image: "Städte/New York.jpg",
            answers: ["Los Angeles", "Chicago", "New York", "Las Vegas"],
            correct: 2
        },
        {
            question: "Welche Stadt ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/960px-Colosseo_2020.jpg",
            answers: ["Athen", "Rom", "Istanbul", "Barcelona"],
            correct: 1
        },
        {
            question: "Welche Stadt ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Sydney_Australia._%2821339175489%29.jpg/960px-Sydney_Australia._%2821339175489%29.jpg",
            answers: ["Melbourne", "Sydney", "Auckland", "Kapstadt"],
            correct: 1
        },
        {
            question: "Welche Stadt ist das?",
            image: "Städte/Berlin.jpeg",
            answers: ["München", "Berlin", "Hamburg", "Wien"],
            correct: 1
        },
        {
            question: "Welche Stadt ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/London_Skyline_%28125508655%29.jpeg/960px-London_Skyline_%28125508655%29.jpeg",
            answers: ["London", "Amsterdam", "Dublin", "Edinburgh"],
            correct: 0
        },
        {
            question: "Welche Stadt ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/1029_Acropolis_of_Athens_in_Greece_at_night_Photo_by_Giles_Laurent.jpg/960px-1029_Acropolis_of_Athens_in_Greece_at_night_Photo_by_Giles_Laurent.jpg",
            answers: ["Rom", "Athen", "Istanbul", "Kairo"],
            correct: 1
        },
        {
            question: "Welche Stadt ist das?",
            image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/Burj_Khalifa_2021.jpg/960px-Burj_Khalifa_2021.jpg",
            answers: ["Abu Dhabi", "Doha", "Dubai", "Singapur"],
            correct: 2
        },
        {
            question: "Welche Stadt ist das?",
            image: "Städte/Tokio.jpg",
            answers: ["Seoul", "Shanghai", "Tokio", "Hongkong"],
            correct: 2
        },
        {
            question: "Welche Stadt ist das?",
            image: "Städte/San Francisco.jpg",
            answers: ["Los Angeles", "San Francisco", "Seattle", "San Diego"],
            correct: 1
        },
        {
            question: "Welche Stadt ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Imagen_de_los_canales_conc%C3%A9ntricos_en_%C3%81msterdam.png/960px-Imagen_de_los_canales_conc%C3%A9ntricos_en_%C3%81msterdam.png",
            answers: ["Brügge", "Amsterdam", "Kopenhagen", "Hamburg"],
            correct: 1
        },
        {
            question: "Welche Stadt ist das?",
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Saint_Basil%27s_Cathedral_and_the_Red_Square.jpg/960px-Saint_Basil%27s_Cathedral_and_the_Red_Square.jpg",
            answers: ["Moskau", "St. Petersburg", "Prag", "Warschau"],
            correct: 0
        },
        {
            question: "Welche Stadt ist das?",
            image: "Städte/München.jpg",
            answers: ["Stuttgart", "München", "Nürnberg", "Salzburg"],
            correct: 1
        }
    ],

    celebrities: [
        {
            question: "Wer ist diese Person?",
            image: "Promis/Taylor Swift.jpg",
            answers: ["Beyoncé", "Adele", "Taylor Swift", "Rihanna"],
            correct: 2
        },
        {
            question: "Wer ist diese Person?",
            image: "Promis/Obama.jpg",
            answers: ["Joe Biden", "Barack Obama", "Bill Clinton", "George Bush"],
            correct: 1
        },
        {
            question: "Wer ist diese Person?",
            image: "Promis/Steinmeier.jpg",
            answers: ["Olaf Scholz", "Frank-Walter Steinmeier", "Christian Lindner", "Friedrich Merz"],
            correct: 1
        },
        {
            question: "Wer ist diese Person?",
            image: "Promis/Michael Jackson.jpg",
            answers: ["Prince", "Michael Jackson", "Stevie Wonder", "Lionel Richie"],
            correct: 1
        },
        {
            question: "Wer ist diese Person?",
            image: "Promis/Mozart.jpg",
            answers: ["Beethoven", "Bach", "Mozart", "Haydn"],
            correct: 2
        },
        {
            question: "Wer ist diese Person?",
            image: "Promis/Martin Luther King.jpg",
            answers: ["Nelson Mandela", "Malcolm X", "Martin Luther King", "Muhammad Ali"],
            correct: 2
        },
        {
            question: "Wer ist diese Person?",
            image: "Promis/Mutter Theresa.jpg",
            answers: ["Queen Victoria", "Mutter Teresa", "Rosa Parks", "Florence Nightingale"],
            correct: 1
        },
        {
            question: "Wer ist diese Person?",
            image: "Promis/Joko.jpg",
            answers: ["Elton John", "Joko Winterscheidt", "Jan Böhmermann", "Klaas Heufer-Umlauf"],
            correct: 1
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
