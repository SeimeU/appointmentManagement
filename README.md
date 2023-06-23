# Documentation

Überblick über die benötigte Software sowie die Installation der Anwendung um diese auf dem eigenen Laptop lauffähig zu bekommen. 
- Software
- Installation

## Software
Für das Ausführen der Applikation am lokalen Rechner sind verschiedene Technologien notwendig:
•	Java
Für das Starten der Java Applikation
•	Gradle
Für das Build der Applikation
•	NodeJS
Laufzeitumgebung für JavaScript, um den Code auszuführen
•	IntelliJ IDEA (oder andere Entwicklungsumgebung für Java)
Für die Entwicklung der Applikation bzw. für das Starten des Backends
•	Docker Desktop
Um die MariaDB Datenbank als Docker Container laufen zu lassen bzw. zu managen
•	Shell
Für das Aufsetzen des Docker Containers mit der Datei „docker-compose.yaml“ 
•	Browser
Für die Darstellung des Frontends der Applikation

Nützliche Technologien für das Ausführen bzw. den Betrieb der Applikation:
•	Postman
Zum Testen der Schnittstellen des Backends durch senden von http-Requests
•	Git
Zum Klonen des GitHub Repositorys der Applikation mit dem Befehl „git clone“
•	MySQL Workbench
Um SQL Querys auf der Datenbank auszuführen

## Installation
Für die Installation der Applikation muss zuerst das GitHub Repository am Rechner geklont werden, dabei kann der folgende Befehl verwendet werden.
git clone https://github.com/SeimeU/appointmentManagement.git
Um den Docker Container mit der Datenbank aufzusetzen kann das File „docker-compose.yaml“ verwendet werden, dazu im Ordner (in der diese Datei vorhanden ist) ein Terminal öffnen und den folgenden Befehl ausführen: docker-compose up – dadurch wird der Docker Container mit dem richtigen Port erstellt (kann im Docker Desktop geprüft werden – dabei muss darauf geachtet werden, dass der Port 3308 nicht bereits in Verwendung ist).
Für das Ausführen des Backends muss das Projekt geöffnet werden und mittels Gradle der Build ausgeführt werden, um die Dependencies zu laden, dann kann das Projekt gestartet werden (main-Methode in der AppointmentManagementApplication).
Um das Frontend zu starten, müssen zuerst alle Module mit dem Befehl npm install geladen werden und dann kann mit dem Befehl ng serve im Terminal (im src-Pfad) gestartet und im Browser geöffnet werden (der Pfad dazu wird im Terminal angezeigt).
Anmerkung: Für das fehlerfreie Ausführen des Frontends sind die Applikationen Standort- und Impfstoff- sowie Medikamentenverwaltung und Terminbuchung notwendig


