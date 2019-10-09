<img align="left" src="sllogo.png" style="margin-right:30px;">

# Powershell-Demo für die SelectLine API
Der hier veröffentlichte Code zeigt die Nutzung der **SelectLine API**. Die unten aufgeführten Funktionen werden aktuell von der Powershell-Demo unterstützt. Die Url der "SelectLine API", welche von dieser Funktion  genutzt wird, ist ebenso vermerkt. Für alle Funktionen bietet die "SelectLine API" eine Hilfe. Siehe <http://demo.slmobile.de/demoApi/help>

#### Login
Mit Benutzername und Passwort wird sich bei er "SelectLine API" angemeldet.
<http://demo.slmobile.de/demoApi/login>

#### Kundenliste abrufen
Es wird die Liste der Kunden abgerufen.
<http://demo.slmobile.de/demoApi/customers>

#### Api-Macro aufrufen
Es wird das Api-Macro **SelectArticleByExplicitNumberAndGroup** aufgerufen.
Als Body-Parameter werden die Artikelnummer und Artikelgruppe übergeben.
<http://demo.slmobile.de/demoApi/Macros/SelectArticleByExplicitNumberAndGroup>


## Technische Grundlagen des Projektes
Umsetzung als Powershell-Script.

Die Anmeldedaten sind in jedem Script separat hinterlegt. Hier kann man diese leicht umstellen auf eine Url einer selbst gehosteten "SelectLine API".