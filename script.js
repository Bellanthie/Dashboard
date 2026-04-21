// Klocka kod --> få klockan att ticka
function uppdateraKlocka() {
  var nu = new Date(); // nytt objekt| date= constructor klass(inbyggd)
  var timmar = String(nu.getHours()).padStart(2, "0"); // resultat sparas i 'nu'
  var minuter = String(nu.getMinutes()).padStart(2, "0"); // padstart = 09, !9
  var sekunder = String(nu.getSeconds()).padStart(2, "0"); // string ovandlar tal till text

  // tid visas 00:00:00 med respektive realtid
  // document.->HTML->element 'tid'--> p 'tid' index.html
  // .textContent = byter 'texten' = siffrorna ändras på skärmen
  document.getElementById("tid").textContent =
    timmar + ":" + minuter + ":" + sekunder;

  var datumText = nu.toLocaleDateString("sv-SE", {
    // nu.'toLocalDateString' = metod
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  document.getElementById("datum").textContent = datumText;
}

uppdateraKlocka(); // funktion|kör en gång vid start
// kör funktionen 'uppdateraKlocka var 1000:e millisekund, 4ever
setInterval(uppdateraKlocka, 1000); // setInterval = metod, uppdateraKlocka = funktion, 1000 = hur ofta den ska köras (i milisekunder)--> 1000 = 1 sek

// My Dashboard --> kunna ändra/skriva ny 'rubrik'.
// spara h1 'rubrik' i en variabel--> undvika 'get.elementbyid' hela tiden
var rubrikE1 = document.getElementById("rubrik");

var sparadRubrik = localStorage.getItem("rubrik"); //finns det något sparat?
// om ja..
if (sparadRubrik) {
  rubrikE1.textContent = sparadRubrik; // byt ut texten i h1:an mot det sparade värdet.
}

// clickas det i rubriken? vid click --> kör funktionen inuti
rubrikE1.addEventListener("click", function () {
  rubrikE1.contentEditable = "true"; // gör h1-elementet text-redigerbart direkt på sidan.
  rubrikE1.focus(); // flytta markören dit auto-> börja skriva
});

// clickar man utanför 'dashboard'-> 'avslutas' redigerings läget OCH 'sparar' det som redigerats
rubrikE1.addEventListener("blur", function () {
  rubrikE1.contentEditable = "false";
  localStorage.setItem("rubrik", rubrikE1.textContent);
});

// LÄNKARNA
var lankar = JSON.parse(localStorage.getItem("lankar") || "[]"); //finns något sparat ->använd sparade värdet | finns inget-> avänd [] tom lista
//json.parse-> möjliggör att listan i localstorage(texten) är tillgänglig/användbar i js att jobba med

// SPARALANKAR funktion gör tvärtom-ovan-->spara texten i Local Storage under namnet 'lankar'
// använder SPARALANKAR som funktion (kiss/dry)->spara länkarna på flera ställen i koden=add/remove länk
function sparaLankar() {
  localStorage.setItem("lankar", JSON.stringify(lankar));
}

// VISA LÄNKAR
function visaLankar() {
  var lista = document.getElementById("lank-lista");
  lista.innerHTML = "";

  if (lankar.length === 0) {
    lista.innerHTML = "<li>Inga sparade länkar ännu.</li>";
    return; // nödutgång ur funktionen->tom lista-> visa meddelande-kör inte resten av koden (annars fortsätter till foreach)
  }

  // lankar objekt-> för varje länk i listan kör koden
  lankar.forEach(function (lank, index) {
    var li = document.createElement("li"); // skapar nytt list element i minnet, ej websidan
    li.innerHTML =
      // skapa clickbar länk (target blakn) ->öppnas i ny flik (i minnet)
      '<a href="' +
      lank.url +
      '" target="_blank">' +
      lank.rubrik +
      "</a>" +
      // tabort knapp->lagra länkens pos-> ref-vilken länk tas bort (i minnet)
      '<button class="ta-bort" data-index="' +
      index +
      '">Ta bort</button>';
    lista.appendChild(li); // lägg till elementet i hyllan (på sidan)
  });
}
//LÄGG TILL NY LÄNK
document
  .getElementById("lagg-till-knapp")
  .addEventListener("click", function () {
    var rubrik = document.getElementById("lank-rubrik").value.trim();
    var url = document.getElementById("lank-url").value.trim();

    if (!rubrik || !url) {
      alert("Fyll i både rubrik ohc URL!");
      return;
    }
    if (!url.startsWith("https://") && !url.startsWith("http://")) {
      url = "https://" + url;
    }

    lankar.push({ rubrik: rubrik, url: url });
    sparaLankar();
    visaLankar();

    document.getElementById("lank-rubrik").value = "";
    document.getElementById("lank-url").value = "";
  });

// Ta bort en länk
document
  .getElementById("lank-lista")
  .addEventListener("click", function (event) {
    if (event.target.classList.contains("ta-bort")) {
      // om användaren klickade specifikt på ta bort knappen
      var index = event.target.getAttribute("data-index"); // ta bort datan/värdet från det indexet
      lankar.splice(index, 1); // ta bort 1 element i position=index ur arrayen
      sparaLankar(); //spara och visa den uppdaterade listan
      visaLankar(); // kör 1ggr-> sparade länkar visas direkt (annars står listan tom tills anv lägger till något)
    }
  });
