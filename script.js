// Deklarerar en tom variabel
let namespace = {};

// Skapar en variabel backgroundImage till namespace som hämtar elementet, som omsluter alla element från html-dokumentet.
namespace.backgroundImage = document.querySelector(".wrapper");
// Ger en backgroundImage genom att ange sökvägen till bilden med hjälp av url. 
namespace.backgroundImage.style.backgroundImage = "url('bilder/savannah.jpg')";
// backgroundSize och värdet 'cover' hjälper till att fylla hela utrymmet för klassen wrapper i html-dokumentet.
namespace.backgroundImage.style.backgroundSize = "cover";

// Skapar en lista för alla bilder som jag vill använda till mitt memoryspel, och skriver in sökvägen till dessa.
namespace.pictureList = [
    "bilder/elephant.jpg",
    "bilder/giraffe.jpg",
    "bilder/jellyfish.jpg",
    "bilder/parrot.jpg",
    "bilder/zebra.jpg",
    "bilder/whale.jpg",
];

// Variabel gameBoard som hämtar id:t memoryList från html-dokumentet.
let gameBoard = document.getElementById("memoryList");
// Variabel allCards som sparar ner barnen till gameBoard.
let allCards = gameBoard.childNodes;

// Variabel namespace.newBox som senare ska hjälpa till att skapa box.
namespace.newBox;
// Deklarerad variabel som senare ska skapa bild.
namespace.newPicture;

// Arrow-funktion createBox som har en tom inparameter.
const createBox = () => {
    // Snurra som ska starta på 0 och öka med 1 för varje snurr så länge i är mindre än 12
    for (let i = 0; i < 12; i++) {
        // Skapar ett nytt div-element till html-dokumentet med createElement.
        namespace.newBox = document.createElement("div");
        // Skapar en svart bakgrundsfärg med style och backgroundColor.
        namespace.newBox.style.backgroundColor = "black";
        // Skapar en bredd till div-elementet på 250px med width
        namespace.newBox.style.width = "175px"; 
        // Skapar en höjd på 325px med height
        namespace.newBox.style.height = "250px";
        // Lägger till alla nya boxar till gameBoarden i html-dokumentet.
        gameBoard.appendChild(namespace.newBox);
    }
};

// Skapar 12 div-boxar genom att anropa funktionen createBox()
createBox();

// Arrow-funktion createPicture som har en tom inparameter
const createPicture = () => {
    // Skapar en tom array som ska generera nya platser till memory-bilderna.
    let listOfRandomNumbers = [];
    // Snurra som ska köra så länge listOfRandomNumbers's längd inte är lika med allCards's längd.
    while (listOfRandomNumbers.length != allCards.length) {
        // Math.floor avrundar tal neråt och tillsammans med Math.random genereras ett slumpat tal till variabeln randomPosition.
        let randomPosition = Math.floor(Math.random() * allCards.length);
        //Kollar om listOfRandomNumbers redan har detta slumpade nummer, i så fall vill jag inte lägga in det till listan.
        if (listOfRandomNumbers.includes(randomPosition)) {
            // Continue gör att snurran går tillbaka och slumpar ut ett nytt tal.
            continue;
        }
        // Slumpat tal läggs till i listan 'listOfRandomNumbers' med push eftersom numret inte redan finns i listan.
        listOfRandomNumbers.push(randomPosition);
    }
    // Snurra som startar på 0 och ökar med 1 för varje snurr tills listOfRandomNumbersns längd nås.
    for (let i = 0; i < listOfRandomNumbers.length; i++) {
        // Skapa en variabel som sparar en slumpad position från listOfRandomNumbers.
        let randomSpot = listOfRandomNumbers[i];
        //Skapar en ny bild till variabeln namespace.newPicture genom new Image och anger dess bredd och höjd inom paranteserna.
        namespace.newPicture = new Image(175, 250);
        /*
        Då listOfRandomNumbers har längd 12 och namespace.pictureList längd 6, delar jag randomSpot med 2 och avrundar det neråt med Math.floor för att 
        på så vis hämta och spara ner två stycken av samma bild från namespace.pictureListn till namespace.newPicture.src, där src ger sökväg till bilden.
        */
        namespace.newPicture.src =
            namespace.pictureList[Math.floor(randomSpot / 2)];
        // Sätter bildernas synlighet till hidden.
        namespace.newPicture.style.visibility = "hidden";
        // Går igenom alla tidigare skapta boxar för att lägga till, med appendChild(), en bild i vardera box.
        allCards[i].appendChild(namespace.newPicture);
    }
};

//Anropar createPicture() för att skapa bilder och slumpa ut positioner till dem.
createPicture();

// Skapa en variabel för att spara ner alla försök användaren gör.
let attemptCount = 0;
// Skapar tom array som senare ska jämföra två klickade card med varandra.
let flippedCard = [];
// Skapar variabel som senare ska räkna antal rätta par användaren får.
let correctPairsCount = 0;

/*
Går igenom alla boxar, en för en, med forEach(), och sedan kör en addeventListener på varje valt card som användaren klickat på.
*/
allCards.forEach((card) => {
    card.addEventListener("click", () => {
        /* 
        Om längden på flippedCard är större än 1 kommer den gå in i if-satsen. 
        If-satsen kontrollerar hur många card användaren tryckt på, så vid tredje klicket som användaren
        gör kommer flippedCard.length vara 2 och då kommer första och andra cardet gömmas igen och flippedCard listan tömmas
        för att användaren ska kunna testa nästa par.
        */
        if (flippedCard.length > 1) {
            // Första indexet i flippedCard, alltså första klickade cardet, sparas till variabeln cardOne.
            let cardOne = flippedCard[0];
            // Andra indexet i flippedCard, det andra klickade cardet, sparas till variabeln cardTwo.
            let cardTwo = flippedCard[1];
            // cardOne- och cardTwo's barn, alltså bilderna, dols. Genom att de sätts till hidden.
            cardOne.firstChild.style.visibility = "hidden";
            cardTwo.firstChild.style.visibility = "hidden";
            // Tömmer listan flippedCard.
            flippedCard = [];
        }

        // Adderar varje klickat card till listan flippedCard.
        flippedCard.push(card);

        // Genom att ange första indexet till listan flippedCard kan första cardet erhållas och sparas ner till variabeln cardOne.
        let cardOne = flippedCard[0];
        // Gör cardOne's barn synligt genom att ange föräldraelementet, firstChild och sedan sätta stilen med style och visibility.
        cardOne.firstChild.style.visibility = "visible";

        /*
        Om listans längd är mindre än två körs if-satsen. Denna if-sats finns med för att undvika felmeddelande i konsollen, som kommer till
        efter att användaren klickat på ett card, då andra indexet inte finns med i listan blir den satt till undefined eftersom det bara är
        ett card användaren klickat på för tillfället.
        */
        if (flippedCard.length < 2) {
            // Går ur lyssnaren och börjar lyssna efter ett nytt klick
            return;
        }

        // Genom att ange andra indexet i listan flippedCard kan det andra cardet sparas ner till variabeln cardTwo.
        let cardTwo = flippedCard[1];

        // If-sats som kontrollerar om det är samma card som användaren klickat på.
        if (cardOne.firstChild == cardTwo.firstChild) {
            // Bilden inuti boxen göms med style och visibility.
            cardOne.firstChild.style.visibility = "hidden";
            // flippedCard listans töms.
            flippedCard = [];
            // Text som skrivs ut i en alertruta, så användaren får meddelande om att den klickat på samma card två gånger.
            alert("Prova igen, du klickade på samma card två gånger.");
            // Går ur lyssnaren och börjar lyssna efter nästa klick.
            return;
            // Om det inte är samma bild som klickats på visas andra bilden som man klickat på.
        } else {
            // Andra bilden visas, genom att ange boxens första barn, sätta stil och synlighet till den.
            cardTwo.firstChild.style.visibility = "visible";
        }

        /*
        If-satsen kontrollerar om sökvägen från första klickade cardets barn, alltså bilden, är lika med andra klickade
        cardets barns (andra bildens) sökväg.
        */
        if (cardOne.firstChild.src == cardTwo.firstChild.src) {
            // Om första och andra klickade cardet är ett par så ska backgroundImageen döljas, så bilden syns.
            cardOne.style.visibility = "hidden";
            cardTwo.style.visibility = "hidden";
            // Efter användaren hittat rätt bildpar läggs ett poäng till i correctPairsCount.
            correctPairsCount += 1;
            // Tömmer flippedCard listan, så användaren kan testa nästa par.
            flippedCard = [];
        }

        // Adderar 1 till attemptCount efter varje gång användaren klickat på två card.
        attemptCount += 1;

        // Kontrollerar om correctPairsCount är lika med längden på namespace.pictureList
        if (correctPairsCount == namespace.pictureList.length) {
            // Anropar funktion som ska congratulate användaren.
            congratulate();
            /*
            Laddar om webbläsarfönstret så man kan starta om spelet på nytt.
            */
            window.location.reload();
        }
    });
});

// Arrow-funktion congratulate som ska congratulate användaren när denne hittat alla bild-par.
const congratulate = () => {
    // En alertruta skriver ut texten och konkatenerar in attemptCount, som användaren gjort, till texten.
    alert(
        "Stort grattis!!! Du klarade det! Du klarade det på " +
            attemptCount +
            " försök. Kör igen och försök slå ditt rekord!"
    );
};

// Knapp för att börja om program där jag hämtar knappen från html-dokumentet med querySelector.
const startOver = document.querySelector("button");
// Knappen lyssnar efter ett klick med hjälp av addEventListener och 'click'.
startOver.addEventListener("click", () => {
    /*
    Laddar om fönstret så användaren kan starta om spelet på nytt.
    */
    window.location.reload();
});
