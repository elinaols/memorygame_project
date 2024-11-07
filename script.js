/*
Elina Olsson
Examinationsuppgift - projektet
*/

// Deklarerar en tom namnrymd
let namnrymd = {}

// Skapar en variabel bakgrundsbild till namnrymd som hämtar elementet, som omsluter alla element från html-dokumentet.
namnrymd.bakgrundsbild = document.querySelector('.wrapper')
// Ger en bakgrundsbild genom att ange sökvägen till bilden med hjälp av url. Kod hämtad från https://linuxhint.com/change-background-image-javascript/.
namnrymd.bakgrundsbild.style.backgroundImage = "url('bilder/savannah.jpg')"
// backgroundSize och värdet 'cover' hjälper till att fylla hela utrymmet för klassen wrapper i html-dokumentet.
namnrymd.bakgrundsbild.style.backgroundSize = 'cover'

// Skapar en lista för alla bilder som jag vill använda till mitt memoryspel, och skriver in sökvägen till dessa.
namnrymd.bildLista = [
    'bilder/elephant.jpg',
    'bilder/giraffe.jpg',
    'bilder/jellyfish.jpg',
    'bilder/parrot.jpg',
    'bilder/zebra.jpg',
    'bilder/whale.jpg'
]

// Variabel spelplan som hämtar id:t memoryLista från html-dokumentet.
let spelplan = document.getElementById('memoryLista')
// Variabel allaSpelkort som sparar ner barnen till spelplan.
let allaSpelkort = spelplan.childNodes

// Variabel namnrymd.nyBox som senare ska hjälpa till att skapa box.
namnrymd.nyBox
// Deklarerad variabel som senare ska skapa bild.
namnrymd.nyBild

// Arrow-funktion skapaBox som har en tom inparameter.
const skapaBox = () => {
    // Snurra som ska starta på 0 och öka med 1 för varje snurr så länge i är mindre än 12
    for (let i = 0; i < 12; i++) {
        // Skapar ett nytt div-element till html-dokumentet med createElement.
        namnrymd.nyBox = document.createElement('div')
        // Skapar en svart bakgrundsfärg med style och backgroundColor.
        namnrymd.nyBox.style.backgroundColor = 'black'
        // Skapar en bredd till div-elementet på 250px med width
        namnrymd.nyBox.style.width = '175px'
        // Skapar en höjd på 325px med height
        namnrymd.nyBox.style.height = '250px'
        // Lägger till alla nya boxar till spelplanen i html-dokumentet.
        spelplan.appendChild(namnrymd.nyBox)
    }
}

// Skapar 12 div-boxar genom att anropa funktionen skapaBox()
skapaBox()

// Arrow-funktion skapaBild som har en tom inparameter
const skapaBild = () => {
    // Skapar en tom array som ska generera nya platser till memory-bilderna.
    let slumpNummerLista = []
    // Snurra som ska köra så länge slumpNummerLista's längd inte är lika med allaSpelkort's längd.
    while (slumpNummerLista.length != allaSpelkort.length) {
        // Math.floor avrundar tal neråt och tillsammans med Math.random genereras ett slumpat tal till variabeln slumpadPos.
        let slumpadPos = Math.floor(Math.random() * allaSpelkort.length)
        /* 
        Kollar om slumpNummerLista redan har detta slumpade nummer, i så fall vill jag inte lägga in det till listan.
        Fått inspiration från denna sida: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes 
        */
        if (slumpNummerLista.includes(slumpadPos)) {
        // Continue gör att snurran går tillbaka och slumpar ut ett nytt tal.
        continue
        } 
        // Slumpat tal läggs till i listan 'slumpNummerLista' med push eftersom numret inte redan finns i listan.
        slumpNummerLista.push(slumpadPos)
    }
    // Snurra som startar på 0 och ökar med 1 för varje snurr tills slumpNummerListans längd nås.
    for (let i = 0; i < slumpNummerLista.length; i++) {
        // Skapa en variabel som sparar en slumpad position från slumpNummerLista.
        let slumpadPlats = slumpNummerLista[i]
        /*
        Skapar en ny bild till variabeln namnrymd.nyBild genom new Image och anger dess bredd och höjd inom paranteserna.
        Följande kod som skapar bild är hämtad från https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image 
        */
        namnrymd.nyBild = new Image(175, 250)
        /*
        Då slumpNummerLista har längd 12 och namnrymd.bildLista längd 6, delar jag slumpadPlats med 2 och avrundar det neråt med Math.floor för att 
        på så vis hämta och spara ner två stycken av samma bild från namnrymd.bildListan till namnrymd.nyBild.src, där src ger sökväg till bilden.
        */
        namnrymd.nyBild.src = namnrymd.bildLista[Math.floor(slumpadPlats / 2)]
        // Sätter bildernas synlighet till hidden.
        namnrymd.nyBild.style.visibility = 'hidden'
        // Går igenom alla tidigare skapta boxar för att lägga till, med appendChild(), en bild i vardera box.
        allaSpelkort[i].appendChild(namnrymd.nyBild)
    }
}

//Anropar skapaBild() för att skapa bilder och slumpa ut positioner till dem.
skapaBild()

// Skapa en variabel för att spara ner alla försök användaren gör.
let antalForsok = 0
// Skapar tom array som senare ska jämföra två klickade kort med varandra.
let vantKort = []
// Skapar variabel som senare ska räkna antal rätta par användaren får.
let antalRattaPar = 0

/*
Går igenom alla boxar, en för en, med forEach(), och sedan kör en addeventListener på varje valt kort som användaren klickat på.
Inspiration hämtad från https://www.freecodecamp.org/news/javascript-foreach-js-array-for-each-example/,
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach 
och från https://flaviocopes.com/how-to-add-event-listener-multiple-elements-javascript/ 
*/
allaSpelkort.forEach((kort) => {
    kort.addEventListener('click', () => {
        /* 
        Om längden på vantKort är större än 1 kommer den gå in i if-satsen. 
        If-satsen kontrollerar hur många kort användaren tryckt på, så vid tredje klicket som användaren
        gör kommer vantKort.length vara 2 och då kommer första och andra kortet gömmas igen och vantKort listan tömmas
        för att användaren ska kunna testa nästa par.
        */
        if (vantKort.length > 1) {
            // Första indexet i vantKort, alltså första klickade kortet, sparas till variabeln kortEtt.
            let kortEtt = vantKort[0]
            // Andra indexet i vantKort, det andra klickade kortet, sparas till variabeln kortTva.
            let kortTva = vantKort[1]
            // kortEtt- och kortTva's barn, alltså bilderna, dols. Genom att de sätts till hidden.
            kortEtt.firstChild.style.visibility = 'hidden'
            kortTva.firstChild.style.visibility = 'hidden'
            // Tömmer listan vantKort.
            vantKort = []
        }

        // Adderar varje klickat kort till listan vantKort.
        vantKort.push(kort)

        // Genom att ange första indexet till listan vantKort kan första kortet erhållas och sparas ner till variabeln kortEtt.
        let kortEtt = vantKort[0]
        // Gör kortEtt's barn synligt genom att ange föräldraelementet, firstChild och sedan sätta stilen med style och visibility.
        kortEtt.firstChild.style.visibility = 'visible'

        /*
        Om listans längd är mindre än två körs if-satsen. Denna if-sats finns med för att undvika felmeddelande i konsollen, som kommer till
        efter att användaren klickat på ett kort, då andra indexet inte finns med i listan blir den satt till undefined eftersom det bara är
        ett kort användaren klickat på för tillfället.
        */
        if (vantKort.length < 2) {
            // Går ur lyssnaren och börjar lyssna efter ett nytt klick
            return
        }

        // Genom att ange andra indexet i listan vantKort kan det andra kortet sparas ner till variabeln kortTva.
        let kortTva = vantKort[1]

        // If-sats som kontrollerar om det är samma kort som användaren klickat på.
        if (kortEtt.firstChild == kortTva.firstChild) {
            // Bilden inuti boxen göms med style och visibility.
            kortEtt.firstChild.style.visibility = 'hidden'
            // vantKort listans töms.
            vantKort = []
            // Text som skrivs ut i en alertruta, så användaren får meddelande om att den klickat på samma kort två gånger.
            alert('Prova igen, du klickade på samma kort två gånger.')
            // Går ur lyssnaren och börjar lyssna efter nästa klick.
            return
        // Om det inte är samma bild som klickats på visas andra bilden som man klickat på.
        } else {
            // Andra bilden visas, genom att ange boxens första barn, sätta stil och synlighet till den.
            kortTva.firstChild.style.visibility = 'visible'
        }

        /*
        If-satsen kontrollerar om sökvägen från första klickade kortets barn, alltså bilden, är lika med andra klickade
        kortets barns (andra bildens) sökväg.
        */
        if (kortEtt.firstChild.src == kortTva.firstChild.src) {
            // Om första och andra klickade kortet är ett par så ska bakgrundsbilden döljas, så bilden syns.
            kortEtt.style.visibility = 'hidden'
            kortTva.style.visibility = 'hidden'
            // Efter användaren hittat rätt bildpar läggs ett poäng till i antalRattaPar.            
            antalRattaPar += 1
            // Tömmer vantKort listan, så användaren kan testa nästa par.
            vantKort = []
        }

        // Adderar 1 till antalForsok efter varje gång användaren klickat på två kort.
        antalForsok += 1

        // Kontrollerar om antalRattaPar är lika med längden på namnrymd.bildLista
        if (antalRattaPar == namnrymd.bildLista.length) {
            // Anropar funktion som ska gratulera användaren.
            gratulera()
            /*
            Laddar om webbläsarfönstret så man kan starta om spelet på nytt.
            Hämtad från https://www.freecodecamp.org/news/refresh-the-page-in-javascript-js-reload-window-tutorial/.
            */
            window.location.reload()
        }
    })
})

// Arrow-funktion gratulera som ska gratulera användaren när denne hittat alla bild-par.
const gratulera = () => {
    // En alertruta skriver ut texten och konkatenerar in antalForsok, som användaren gjort, till texten.
    alert('Stort grattis!!! Du klarade det! Du klarade det på ' + antalForsok + ' försök. Kör igen och försök slå ditt rekord!')
}

// Knapp för att börja om program där jag hämtar knappen från html-dokumentet med querySelector.
const knappBorjaOm = document.querySelector('button')
// Knappen lyssnar efter ett klick med hjälp av addEventListener och 'click'.
knappBorjaOm.addEventListener('click', () => {
    /*
    Laddar om fönstret så användaren kan starta om spelet på nytt.
    Kod hämtad från https://www.freecodecamp.org/news/refresh-the-page-in-javascript-js-reload-window-tutorial/.
    */
    window.location.reload()
})