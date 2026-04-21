// få klockan att ticka
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
