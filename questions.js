// ===== QUESTION DATABASE =====
// Categories: animals, cities, celebrities, team, custom

const QUESTIONS = {

    animals: [
        {
            question: "Welches flauschige Tier ist das?",
            image: "Tiere/Alpaka.jpg",
            answers: ["Lama", "Alpaka", "Schaf", "Ziege"],
            correct: 1
        },
        {
            question: "Diese kleinen Kerle stehen gern Wache – welches Tier?",
            image: "Tiere/Erdmaennchen.jpg",
            answers: ["Präriehund", "Erdmännchen", "Murmeltier", "Hamster"],
            correct: 1
        },
        {
            question: "Welches Tier hat es überhaupt nicht eilig?",
            image: "Tiere/Faultier.jpg",
            answers: ["Koala", "Faultier", "Opossum", "Katta"],
            correct: 1
        },
        {
            question: "Dieses Tier sieht aus wie ein Pokémon – was ist es?",
            image: "Tiere/Axolotl.jpg",
            answers: ["Molch", "Salamander", "Axolotl", "Gecko"],
            correct: 2
        },
        {
            question: "Welches Tier gilt als das glücklichste der Welt?",
            image: "Tiere/Quokka.jpg",
            answers: ["Quokka", "Wombat", "Kaninchen", "Chinchilla"],
            correct: 0
        },
        {
            question: "Welches Tier kann seine Farbe wechseln?",
            image: "Tiere/Chamaeleon.jpg",
            answers: ["Leguan", "Gecko", "Chamäleon", "Agame"],
            correct: 2
        },
        {
            question: "Süß, rot und flauschig – welches Tier?",
            image: "Tiere/Roter Panda.jpg",
            answers: ["Fuchs", "Roter Panda", "Waschbär", "Marder"],
            correct: 1
        },
        {
            question: "Dieses Tier legt Eier, hat einen Schnabel und ist ein Säugetier!",
            image: "Tiere/Schnabeltier.jpg",
            answers: ["Biber", "Schnabeltier", "Otter", "Bisamratte"],
            correct: 1
        },
        {
            question: "Welcher Fisch bläht sich bei Gefahr auf?",
            image: "Tiere/Kugelfisch.jpg",
            answers: ["Kofferfisch", "Kugelfisch", "Seeteufel", "Clownfisch"],
            correct: 1
        },
        {
            question: "Welches Tier wäscht gern sein Essen?",
            image: "Tiere/Waschbaer.jpg",
            answers: ["Waschbär", "Dachs", "Skunk", "Marder"],
            correct: 0
        }
    ],

    cities: [
        {
            question: "Welche Stadt ist das?",
            image: "Städte/New York.jpg",
            answers: ["Los Angeles", "Chicago", "New York", "Las Vegas"],
            correct: 2
        },
        {
            question: "Welche Stadt ist das?",
            image: "Städte/Berlin.jpeg",
            answers: ["München", "Berlin", "Hamburg", "Wien"],
            correct: 1
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
            image: "Städte/München.jpg",
            answers: ["Stuttgart", "München", "Nürnberg", "Salzburg"],
            correct: 1
        },
        {
            question: "Welche Stadt hat diese verrückte Kirche?",
            image: "Städte/Barcelona.jpg",
            answers: ["Madrid", "Barcelona", "Valencia", "Sevilla"],
            correct: 1
        },
        {
            question: "In welcher Stadt fährt man Gondel statt Auto?",
            image: "Städte/Venedig.jpg",
            answers: ["Venedig", "Brügge", "Amsterdam", "Stockholm"],
            correct: 0
        },
        {
            question: "Welche Stadt hat die berühmte Christus-Statue?",
            image: "Städte/Rio de Janeiro.jpg",
            answers: ["Buenos Aires", "Lima", "Rio de Janeiro", "São Paulo"],
            correct: 2
        },
        {
            question: "In welcher Stadt steht dieser bunte Tempel?",
            image: "Städte/Bangkok.jpg",
            answers: ["Bangkok", "Hanoi", "Jakarta", "Manila"],
            correct: 0
        },
        {
            question: "Welche Stadt liegt auf zwei Kontinenten?",
            image: "Städte/Istanbul.jpg",
            answers: ["Kairo", "Istanbul", "Teheran", "Beirut"],
            correct: 1
        },
        {
            question: "In welcher Stadt fährt eine berühmte gelbe Straßenbahn?",
            image: "Städte/Lissabon.jpg",
            answers: ["Porto", "Lissabon", "Sevilla", "Marseille"],
            correct: 1
        },
        {
            question: "Welche Stadt hat die schönste Brücke Europas?",
            image: "Städte/Prag.jpg",
            answers: ["Wien", "Prag", "Budapest", "Dresden"],
            correct: 1
        },
        {
            question: "Welche Stadt liegt am Fuß des Tafelbergs?",
            image: "Städte/Kapstadt.jpg",
            answers: ["Johannesburg", "Nairobi", "Kapstadt", "Dakar"],
            correct: 2
        },
        {
            question: "Welche Stadt hat dieses futuristische Hotel am Wasser?",
            image: "Städte/Singapur.jpg",
            answers: ["Hongkong", "Kuala Lumpur", "Singapur", "Shanghai"],
            correct: 2
        },
        {
            question: "In welcher Stadt steht dieses prächtige Parlamentsgebäude?",
            image: "Städte/Budapest.jpg",
            answers: ["Wien", "Warschau", "Budapest", "Bukarest"],
            correct: 2
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
        },
        // === Neue Promis (lustig, 20-35 Zielgruppe) ===
        {
            question: "Welcher Wrestler wurde Filmstar und riecht, was der Rock kocht?",
            image: "Promis/Dwayne Johnson.jpg",
            answers: ["Vin Diesel", "John Cena", "Dwayne Johnson", "Jason Statham"],
            correct: 2
        },
        {
            question: "Welcher Schauspieler ist quasi mit Deadpool verschmolzen?",
            image: "Promis/Ryan Reynolds.jpg",
            answers: ["Chris Pratt", "Ryan Reynolds", "Ryan Gosling", "Chris Evans"],
            correct: 1
        },
        {
            question: "Wer rappt, kocht mit Martha Stewart und liebt Gin & Juice?",
            image: "Promis/Snoop Dogg.jpg",
            answers: ["50 Cent", "Dr. Dre", "Snoop Dogg", "Ice Cube"],
            correct: 2
        },
        {
            question: "Wer hat bei den Oscars für Schlagzeilen gesorgt – im wahrsten Sinne?",
            image: "Promis/Will Smith.jpg",
            answers: ["Denzel Washington", "Will Smith", "Jamie Foxx", "Samuel L. Jackson"],
            correct: 1
        },
        {
            question: "Welcher Schauspieler ist quasi unsterblich und atmet pure Güte?",
            image: "Promis/Keanu Reeves.jpg",
            answers: ["Keanu Reeves", "Tom Cruise", "Brad Pitt", "Johnny Depp"],
            correct: 0
        },
        {
            question: "Wer spielt MJ und läuft auf jedem roten Teppich alle an die Wand?",
            image: "Promis/Zendaya.jpg",
            answers: ["Zendaya", "Halle Bailey", "Florence Pugh", "Sydney Sweeney"],
            correct: 0
        },
        {
            question: "Welcher Fußballer hat mehr Instagram-Follower als manche Länder Einwohner?",
            image: "Promis/Cristiano Ronaldo.jpg",
            answers: ["Lionel Messi", "Neymar", "Cristiano Ronaldo", "Kylian Mbappé"],
            correct: 2
        },
        {
            question: "Wer singt 'Bad Guy' und hat grüne Haare berühmt gemacht?",
            image: "Promis/Billie Eilish.jpg",
            answers: ["Olivia Rodrigo", "Dua Lipa", "Billie Eilish", "Ariana Grande"],
            correct: 2
        },
        {
            question: "Welcher rothaarige Brite macht Stadien voll – nur mit einer Gitarre?",
            image: "Promis/Ed Sheeran.jpg",
            answers: ["Ed Sheeran", "Harry Styles", "Sam Smith", "Lewis Capaldi"],
            correct: 0
        },
        {
            question: "Wer hat ein eigenes Reality-TV-Imperium und bricht regelmäßig das Internet?",
            image: "Promis/Kim Kardashian.jpg",
            answers: ["Paris Hilton", "Kim Kardashian", "Kylie Jenner", "Khloé Kardashian"],
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
            question: "Welche dieser Nummern ist für uns relevant?",
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
            answers: ["gemein", "gemeinnützig", "gerechte", "gemeinsam"],
            correct: 1
        },
        {
            question: "Für was steht fsnw?",
            answers: ["Freestyle Netzwerk", "Freestyle Sozial Nachhaltig Wertschätzend", "Freestyle Neue Wege"],
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
