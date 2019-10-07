<img align="left" src="sllogo.png" style="margin-right:30px;">

# PHP-Demo für die SelectLine API
Der hier veröffentlichte Code zeigt die Nutzung der **SelectLine API**. Die unten aufgeführten Funktionen werden aktuell von der PHP-Demo unterstützt. Die Url der "SelectLine API", welche von dieser Funktion  genutzt wird, ist ebenso vermerkt. Für alle Funktionen bietet die "SelectLine API" eine Hilfe. Siehe <http://demo.slmobile.de/demoApi/help>

#### API Informationen abrufen 
Es werden die allgemeinen Informationen der API abgerufen.
<http://demo.slmobile.de/demoApi/>

#### Login [GET]
Mit Benutzername und Passwort wird sich bei er "SelectLine API" angemeldet.
<http://demo.slmobile.de/demoApi/login>

#### Kundenliste abrufen [GET]
Es wird die Liste der Kunden abgerufen.
<http://demo.slmobile.de/demoApi/customers>

#### Kunde (10001) abrufen [GET]
Abrufen von Informationen des Kunden 10001.
<http://demo.slmobile.de/demoApi/customers/10001>

## Technische Grundlagen des Projektes
Umsetzung als Powershell-Script.

Die Anmeldedaten sind in der Datei **index.php** hinterlegt. Hier kann man diese leicht umstellen auf eine Url einer selbst gehosteten "SelectLine API".