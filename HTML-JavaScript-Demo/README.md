<img align="left" src="sllogo.png" style="margin-right:30px;">

# DemoApp für die SelectLine API
Der hier veröffentlichte Code zeigt die Nutzung der **SelectLine API**. Die unten aufgeführten Funktionen werden aktuell von der DemoApp unterstützt. Die Url der "SelectLine API", welche von dieser Funktion  genutzt wird, ist ebenso vermerkt. Für alle Funktionen bietet die "SelectLine API" eine Hilfe. Siehe <https://demo.slmobile.de/demoApi/help>

<img align="right" src="demoapp.png" style="margin:20px">

#### API Informationen abrufen 
Von der API wird die Bezeichnung und Versionsnummer abgerufen.
<https://demo.slmobile.de/demoApi/>
#### Informationen zum angemeldeten Benutzer 
Der Name und weitere Informationen des angemeldeten Benutzers werden abgerufen.
<https://demo.slmobile.de/demoApi/Users/Current>
#### Login
Mit Benutzername und Passwort wird sich bei er "SelectLine API" angemeldet.
<https://demo.slmobile.de/demoApi/login>
#### Logout 
Der angemeldete Benutzer wird abgemeldet.
<https://demo.slmobile.de/demoApi/logout>
#### Kundenliste abrufen
Es wird die Liste der Kunden abgerufen und es kann nach Namen gefiltert werden. Es wird Paging unterstützt.
<https://demo.slmobile.de/demoApi/customers>
#### Lieferantenliste abrufen
Es wird die Liste der Lieferanten abgerufen und es kann nach Namen gefiltert werden. Es wird Paging unterstützt.
<https://demo.slmobile.de/demoApi/suppliers>
#### Interessentenliste abrufen 
Es wird die Liste der Interessenten abgerufen und es kann nach Namen gefiltert werden. Es wird Paging unterstützt.
<https://demo.slmobile.de/demoApi/prospects>

## Technische Grundlagen des Projektes
Das Projekt nutzt nur Html und Javascript. Das Javascript nutzt die Features aus ECMAScript 6 und läuft daher nur in neueren Browsern. Chrome, Edge und Firefox wurden gestestet.
Es wird jquery (<https://jquery.com>) von extern eingebunden.

In der Klasse "Api" in JavaScript Datei "appliction.js" ist die Url zur "SelectLine API" DemoUrl (<https://demo.slmobile.de/demoApi/>) hinterlegt. Hier kann man diese leicht umstellen auf eine Url einer selbst gehosteten "SelectLine API".

