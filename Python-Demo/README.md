<img align="left" src="myvision_software_logo.png" style="margin-right:30px;">

# Python-Demo für die SelectLine API
Der hier veröffentlichte Code zeigt die Nutzung der **SelectLine API** mit der Programmiersprache Python.
Die Funktionen, welche von der Python-Demo unterstützt werden, sind am Ende des Codes als Funktionsaufrufe definiert.
Die Url der "SelectLine API", welche von dieser Funktion  genutzt wird, ist in den Funktionen selbst vermerkt.
Für alle Funktionen bietet die "SelectLine API" eine Hilfe. Siehe <https://demo.slmobile.de/demoApi/help>

## Technische Grundlagen des Projektes
Die Umsetzung und Tests erfolgten mit Python 3.8.x und der Bibliothek "Requests", die vorher mit Pip installiert werden muss.
Als virtuelle Umgebund sollte conda, pipenv oder ähnliches verwendet werden.
Die Ausführung des Codes ist für die cmd oder Linux-Shell vorgesehen.

## Anmeldedaten
Die Anmeldedaten sind in der Datei **SelectLineAPI_Demo.py** selbst am Anfang hinterlegt.
Hier kann man diese leicht umstellen auf eine Url einer selbst gehosteten "SelectLine API", sollte aber dafür sorgen,
dass entweder ein offizielles Zertifikat verwendet wird oder im Code die Zertifikat-Warnungen deaktiviert werden.

## Urheber und Lizenz
Die Beispiele werden von myvision Software, Harald Sichert, unter der "Apache Licence 2.0" bereitgestellt.
Weitere, individuelle Supportanfragen können unter support@myvision.de beantwortet werden (siehe https://www.myvision.de/leistungen/support)
