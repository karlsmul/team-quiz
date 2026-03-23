// ===== QUESTION DATABASE =====
// Categories: animals, cities, celebrities, team, custom

const QUESTIONS = {

    animals: [
        {
            question: "Welches Tier ist das?",
            image: "Tiere/Alpaka.jpg",
            answers: ["Lama", "Alpaka", "Schaf", "Ziege"],
            correct: 1
        },
        {
            question: "Welches Tier ist das?",
            image: "Tiere/Erdmaennchen.jpg",
            answers: ["Präriehund", "Erdmännchen", "Murmeltier", "Hamster"],
            correct: 1
        },
        {
            question: "Welches Tier ist das?",
            image: "Tiere/Faultier.jpg",
            answers: ["Koala", "Faultier", "Opossum", "Katta"],
            correct: 1
        },
        {
            question: "Welches Tier ist das?",
            image: "Tiere/Axolotl.jpg",
            answers: ["Molch", "Salamander", "Axolotl", "Gecko"],
            correct: 2
        },
        {
            question: "Welches Tier ist das?",
            image: "Tiere/Quokka.jpg",
            answers: ["Quokka", "Wombat", "Kaninchen", "Chinchilla"],
            correct: 0
        },
        {
            question: "Welches Tier ist das?",
            image: "Tiere/Chamaeleon.jpg",
            answers: ["Leguan", "Gecko", "Chamäleon", "Agame"],
            correct: 2
        },
        {
            question: "Welches Tier ist das?",
            image: "Tiere/Roter Panda.jpg",
            answers: ["Fuchs", "Roter Panda", "Waschbär", "Marder"],
            correct: 1
        },
        {
            question: "Welches Tier ist das?",
            image: "Tiere/Schnabeltier.jpg",
            answers: ["Biber", "Schnabeltier", "Otter", "Bisamratte"],
            correct: 1
        },
        {
            question: "Welches Tier ist das?",
            image: "Tiere/Kugelfisch.jpg",
            answers: ["Kofferfisch", "Kugelfisch", "Seeteufel", "Clownfisch"],
            correct: 1
        },
        {
            question: "Welches Tier ist das?",
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
            question: "Welche Stadt ist das?",
            image: "Städte/Barcelona.jpg",
            answers: ["Madrid", "Barcelona", "Valencia", "Sevilla"],
            correct: 1
        },
        {
            question: "Welche Stadt ist das?",
            image: "Städte/Venedig.jpg",
            answers: ["Venedig", "Brügge", "Amsterdam", "Stockholm"],
            correct: 0
        },
        {
            question: "Welche Stadt ist das?",
            image: "Städte/Rio de Janeiro.jpg",
            answers: ["Buenos Aires", "Lima", "Rio de Janeiro", "São Paulo"],
            correct: 2
        },
        {
            question: "Welche Stadt ist das?",
            image: "Städte/Bangkok.jpg",
            answers: ["Bangkok", "Hanoi", "Jakarta", "Manila"],
            correct: 0
        },
        {
            question: "Welche Stadt ist das?",
            image: "Städte/Istanbul.jpg",
            answers: ["Kairo", "Istanbul", "Teheran", "Beirut"],
            correct: 1
        },
        {
            question: "Welche Stadt ist das?",
            image: "Städte/Lissabon.jpg",
            answers: ["Porto", "Lissabon", "Sevilla", "Marseille"],
            correct: 1
        },
        {
            question: "Welche Stadt ist das?",
            image: "Städte/Prag.jpg",
            answers: ["Wien", "Prag", "Budapest", "Dresden"],
            correct: 1
        },
        {
            question: "Welche Stadt ist das?",
            image: "Städte/Kapstadt.jpg",
            answers: ["Johannesburg", "Nairobi", "Kapstadt", "Dakar"],
            correct: 2
        },
        {
            question: "Welche Stadt ist das?",
            image: "Städte/Singapur.jpg",
            answers: ["Hongkong", "Kuala Lumpur", "Singapur", "Shanghai"],
            correct: 2
        },
        {
            question: "Welche Stadt ist das?",
            image: "Städte/Budapest.jpg",
            answers: ["Wien", "Warschau", "Budapest", "Bukarest"],
            correct: 2
        }
    ],

    celebrities: [
        {
            question: "Wer ist diese Person? (Hinweis: Pop-Musik)",
            image: "Promis/Taylor Swift.jpg",
            answers: ["Beyoncé", "Adele", "Taylor Swift", "Rihanna"],
            correct: 2
        },
        {
            question: "Wer ist diese Person? (Hinweis: US-Politik)",
            image: "Promis/Obama.jpg",
            answers: ["Joe Biden", "Barack Obama", "Bill Clinton", "George Bush"],
            correct: 1
        },
        {
            question: "Wer ist diese Person? (Hinweis: Deutsche Politik)",
            image: "Promis/Steinmeier.jpg",
            answers: ["Olaf Scholz", "Frank-Walter Steinmeier", "Christian Lindner", "Friedrich Merz"],
            correct: 1
        },
        {
            question: "Wer ist diese Person? (Hinweis: King of Pop)",
            image: "Promis/Michael Jackson.jpg",
            answers: ["Prince", "Michael Jackson", "Stevie Wonder", "Lionel Richie"],
            correct: 1
        },
        {
            question: "Wer ist diese Person? (Hinweis: Klassische Musik)",
            image: "Promis/Mozart.jpg",
            answers: ["Beethoven", "Bach", "Mozart", "Haydn"],
            correct: 2
        },
        {
            question: "Wer ist diese Person? (Hinweis: Bürgerrechtler)",
            image: "Promis/Martin Luther King.jpg",
            answers: ["Nelson Mandela", "Malcolm X", "Martin Luther King", "Muhammad Ali"],
            correct: 2
        },
        {
            question: "Wer ist diese Person? (Hinweis: Humanitäre Hilfe)",
            image: "Promis/Mutter Theresa.jpg",
            answers: ["Queen Victoria", "Mutter Teresa", "Rosa Parks", "Florence Nightingale"],
            correct: 1
        },
        {
            question: "Wer ist diese Person? (Hinweis: TV-Entertainer)",
            image: "Promis/Joko.jpg",
            answers: ["Elton John", "Joko Winterscheidt", "Jan Böhmermann", "Klaas Heufer-Umlauf"],
            correct: 1
        },
        {
            question: "Wer ist diese Person? (Hinweis: Wrestling & Hollywood)",
            image: "Promis/Dwayne Johnson.jpg",
            answers: ["Vin Diesel", "John Cena", "Dwayne Johnson", "Jason Statham"],
            correct: 2
        },
        {
            question: "Wer ist diese Person? (Hinweis: Deadpool-Darsteller)",
            image: "Promis/Ryan Reynolds.jpg",
            answers: ["Chris Pratt", "Ryan Reynolds", "Ryan Gosling", "Chris Evans"],
            correct: 1
        },
        {
            question: "Wer ist diese Person? (Hinweis: US-Rap-Legende)",
            image: "Promis/Snoop Dogg.jpg",
            answers: ["50 Cent", "Dr. Dre", "Snoop Dogg", "Ice Cube"],
            correct: 2
        },
        {
            question: "Wer ist diese Person? (Hinweis: Oscar-Ohrfeige)",
            image: "Promis/Will Smith.jpg",
            answers: ["Denzel Washington", "Will Smith", "Jamie Foxx", "Samuel L. Jackson"],
            correct: 1
        },
        {
            question: "Wer ist diese Person? (Hinweis: Matrix & John Wick)",
            image: "Promis/Keanu Reeves.jpg",
            answers: ["Keanu Reeves", "Tom Cruise", "Brad Pitt", "Johnny Depp"],
            correct: 0
        },
        {
            question: "Wer ist diese Person? (Hinweis: Euphoria & Spider-Man)",
            image: "Promis/Zendaya.jpg",
            answers: ["Zendaya", "Halle Bailey", "Florence Pugh", "Sydney Sweeney"],
            correct: 0
        },
        {
            question: "Wer ist diese Person? (Hinweis: Fußball-Superstar)",
            image: "Promis/Cristiano Ronaldo.jpg",
            answers: ["Lionel Messi", "Neymar", "Cristiano Ronaldo", "Kylian Mbappé"],
            correct: 2
        },
        {
            question: "Wer ist diese Person? (Hinweis: Bad Guy-Sängerin)",
            image: "Promis/Billie Eilish.jpg",
            answers: ["Olivia Rodrigo", "Dua Lipa", "Billie Eilish", "Ariana Grande"],
            correct: 2
        },
        {
            question: "Wer ist diese Person? (Hinweis: Singer-Songwriter mit Gitarre)",
            image: "Promis/Ed Sheeran.jpg",
            answers: ["Ed Sheeran", "Harry Styles", "Sam Smith", "Lewis Capaldi"],
            correct: 0
        },
        {
            question: "Wer ist diese Person? (Hinweis: Reality-TV-Imperium)",
            image: "Promis/Kim Kardashian.jpg",
            answers: ["Paris Hilton", "Kim Kardashian", "Kylie Jenner", "Khloé Kardashian"],
            correct: 1
        },
        {
            question: "Wer ist diese Person? (Hinweis: Reality-TV-Blondine)",
            image: "Promis/Daniela Katzenberger.jpg",
            answers: ["Daniela Katzenberger", "Sophia Thomalla", "Sylvie Meis", "Carmen Geiss"],
            correct: 0
        },
        {
            question: "Wer ist diese Person? (Hinweis: DSDS & Schlager)",
            image: "Promis/Pietro Lombardi.jpg",
            answers: ["Alexander Klaws", "Pietro Lombardi", "Luca Hänni", "Mehrzad Marashi"],
            correct: 1
        },
        {
            question: "Wer ist diese Person? (Hinweis: DSDS-Jury-Chef)",
            image: "Promis/Dieter Bohlen.jpg",
            answers: ["Dieter Bohlen", "Thomas Gottschalk", "Günther Jauch", "Stefan Raab"],
            correct: 0
        },
        {
            question: "Wer ist diese Person? (Hinweis: Dschungelcamp-Gewinnerin)",
            image: "Promis/Evelyn Burdecki.jpg",
            answers: ["Jenny Frankhauser", "Evelyn Burdecki", "Georgina Fleur", "Gina-Lisa Lohfink"],
            correct: 1
        },
        {
            question: "Wer ist diese Person? (Hinweis: 'Da werden Sie geholfen!')",
            image: "Promis/Verona Pooth.jpg",
            answers: ["Verona Pooth", "Sonja Kraus", "Barbara Schöneberger", "Frauke Ludowig"],
            correct: 0
        },
        {
            question: "Wer ist diese Person? (Hinweis: Rap & YouTube)",
            image: "Promis/Shirin David.jpg",
            answers: ["Katja Krasavice", "Shirin David", "Juju", "Loredana"],
            correct: 1
        },
        {
            question: "Wer ist diese Person? (Hinweis: Influencerin & Spielerfrau)",
            image: "Promis/Cathy Hummels.jpg",
            answers: ["Ann-Kathrin Götze", "Jessica Schwarz", "Cathy Hummels", "Lena Gercke"],
            correct: 2
        },
        {
            question: "Wer ist diese Person? (Hinweis: Schlager & Florida)",
            image: "Promis/Michael Wendler.jpg",
            answers: ["Jürgen Drews", "Michael Wendler", "Costa Cordalis", "DJ Ötzi"],
            correct: 1
        },
        {
            question: "Wer ist diese Person? (Hinweis: Germany's Next Topmodel)",
            image: "Promis/Heidi Klum.jpg",
            answers: ["Claudia Schiffer", "Heidi Klum", "Naomi Campbell", "Lena Gercke"],
            correct: 1
        },
        {
            question: "Wer ist diese Person? (Hinweis: TV Total & Schlag den Raab)",
            image: "Promis/Stefan Raab.jpg",
            answers: ["Joko Winterscheidt", "Oliver Pocher", "Stefan Raab", "Bastian Pastewka"],
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
            correct: 0
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
        // === "Wer stiehlt mir die Show"-Style Fragen ===
        {
            question: "Wie viele Liter Blut hat ein erwachsener Mensch?",
            answers: ["3–4", "5–6", "7–8", "9–10"],
            correct: 1
        },
        {
            question: "Welches Land hat die Form eines Stiefels?",
            answers: ["Spanien", "Griechenland", "Italien", "Portugal"],
            correct: 2
        },
        {
            question: "Was bedeutet 'LOL' ausgeschrieben?",
            answers: ["Laughing Out Loud", "Lots Of Love", "Living On Luck", "Licking Old Lemons"],
            correct: 0
        },
        {
            question: "Wie viele Herzen hat ein Oktopus?",
            answers: ["1", "2", "3", "4"],
            correct: 2
        },
        {
            question: "Welche Frucht hat ihre Samen außen?",
            answers: ["Himbeere", "Kiwi", "Erdbeere", "Feige"],
            correct: 2
        },
        {
            question: "Was war zuerst da – das Feuerzeug oder das Streichholz?",
            answers: ["Streichholz", "Feuerzeug", "Beide gleichzeitig", "Keins von beiden"],
            correct: 1
        },
        {
            question: "In welcher Stadt steht kein Eiffelturm?",
            answers: ["Paris", "Las Vegas", "Tokio", "London"],
            correct: 3
        },
        {
            question: "Welches dieser Tiere kann nicht rückwärts laufen?",
            answers: ["Katze", "Känguru", "Hund", "Pferd"],
            correct: 1
        },
        {
            question: "Wie viele Tasten hat ein Klavier?",
            answers: ["76", "84", "88", "92"],
            correct: 2
        },
        {
            question: "Welches dieser Gewässer ist eigentlich ein See?",
            answers: ["Totes Meer", "Rotes Meer", "Schwarzes Meer", "Mittelmeer"],
            correct: 0
        },
        {
            question: "Aus welchem Land kommt die Pizza Margherita?",
            answers: ["Griechenland", "Frankreich", "Spanien", "Italien"],
            correct: 3
        },
        {
            question: "Wie heißt der Vogel auf dem Twitter/X-Logo?",
            answers: ["Tweety", "Larry", "Jack", "Blue"],
            correct: 1
        },
        {
            question: "Welche Farbe hat der 'Gefällt mir'-Daumen bei Facebook?",
            answers: ["Rot", "Grün", "Blau", "Gelb"],
            correct: 2
        },
        {
            question: "Wofür steht die Abkürzung 'WLAN'?",
            answers: ["Wireless Local Area Network", "Wide Line Access Node", "Web Local Air Net", "Wireless Link And Navigate"],
            correct: 0
        },
        {
            question: "Wie viele Streifen hat die US-Flagge?",
            answers: ["11", "13", "15", "50"],
            correct: 1
        },
        {
            question: "Welches dieser Wörter steht NICHT im Duden?",
            answers: ["Ohrwurm", "Fingerspitzengefühl", "Blitzkrieg", "Schnapsidee"],
            correct: 2
        },
        {
            question: "Wofür steht in der Schlafforschung die Abkürzung 'REM'?",
            answers: ["Rapid Eye Movement", "Rest Energy Mode", "Relax Every Muscle", "Random Eye Motion"],
            correct: 0
        },
        {
            question: "Welches Gewürz kennt man auch als 'Gelben Ingwer'?",
            answers: ["Safran", "Kurkuma", "Curry", "Kardamom"],
            correct: 1
        },
        {
            question: "Wofür steht 'TAN' beim Online-Banking?",
            answers: ["Transfer Account Number", "Transaktions-Authentifizierungsnummer", "Total Access Number", "Temporary Auth Note"],
            correct: 1
        }
    ]
};
