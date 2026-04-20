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
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  document.getElementById("datum").textContent = datumText;
}

uppdateraKlocka();
setInterval(uppdateraKlocka, 1000);
