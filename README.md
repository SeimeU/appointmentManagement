# Documentation

## Agenda
Überblick über die Software und die Funktionern, welche diese erfüllt. 
- Funktionen, welche das System erfüllt
- Komponenten

Überblick über die benötigte Software sowie die Installation der Anwendung um diese auf dem eigenen Laptop lauffähig zu bekommen. 
- Software
- Installation

Verfügbare Schnittstellen
- REST Schnittstellen


## Funktionen 

### Appointment Management
Als Gemeindemitarbeiter (GEM) ist es meine Aufgabe, Termine, an den durch die Impfstoff/Medikament- und Standortverwaltung erfassten Standorten, zu erfassen. Dazu wird pro Termin der Standort + die Linie, die Dauer, das Datum + Uhrzeit, die zu verabreichende Substanz sowie der Status, ob ein Termin gebucht wurde, gespeichert.

- **Als GEM lege ich Terminserien bzw. einzelne Termine für Linien an meinen Standorten an.**


### Bürgermeister (BGM) 


- **Als BGM habe ich die aktuellen Zahlen visuell aufbereitet zur Verfügung. Wie viele Termine gibt es, wie viele davon sind gebucht.**
Diese User Story befasst sich damit, dass der Bezirkshauptmann/Bezirkshauptfrau (BH) 
- Zugriff auf die aktuellen Zahlen der Gesundheitssituation im Bezirk hat. 
- Die Zahlen werden visuell aufbereitet präsentiert und umfassen Informationen 
- wie die Anzahl der erkrankten Personen, Verdachtsfälle, Personen in Quarantäne sowie 
- die Anzahl und Herkunft der Cluster. Durch diese visuelle Darstellung erhält 
- der BH einen schnellen Überblick über die aktuelle Lage.


## Komponenten
Die Anwendung besteht aus einigen Komponenten, welche im Folgenden aufgelistet werden. 


## Software
Die nachfolgende Software wird benötigt, um das Projekt lokal auf dem eigenen Rechner aufzusetzen
und lauffähig zu machen. 

### Git
GIT ist ein verteiltes Versionskontrollsystem, das entwickelt wurde, 
um Änderungen in Dateien und Projekten zu verfolgen, zu verwalten und zu 
synchronisieren, insbesondere bei der Zusammenarbeit von Entwicklern an Softwareprojekten.

Link zur Installation:
https://git-scm.com/

### Node JS
Node.js ist eine serverseitige Laufzeitumgebung, die auf der 
JavaScript-Plattform aufbaut und es Entwicklern ermöglicht, 
JavaScript-Code außerhalb eines Webbrowsers auszuführen, 
um skalierbare und effiziente Netzwerkanwendungen zu erstellen.

Link zur Installation:
https://nodejs.org/en

### Java
Java ist eine objektorientierte Programmiersprache, die entwickelt 
wurde, um plattformunabhängige Anwendungen zu erstellen. Sie 
ermöglicht die Entwicklung von robusten und sicheren Softwarelösungen 
für eine Vielzahl von Anwendungsdomänen.

Link zur Installation:
https://www.java.com/de/download/manual.jsp

### IntelliJ
IntelliJ IDEA ist eine integrierte Entwicklungsumgebung (IDE) für 
Softwareentwicklung, die eine Vielzahl von Tools und Funktionen bietet, 
um Entwicklern bei der effizienten Erstellung, Bearbeitung und Debugging 
von Code in verschiedenen Programmiersprachen wie Java und Kotlin zu unterstützen.

Link zur Installation:
https://www.jetbrains.com/de-de/idea/

### Postman
Postman ermöglicht es APIs zu testen, zu dokumentieren und zu verwalten. Mit Postman 
können HTTP-Anfragen gesendet, Antworten überprüft und verschiedene 
API-Szenarien simuliert werden.

Link zur Installation:
https://www.postman.com/


### MariaDB
MariaDB ist ein relationales Datenbankverwaltungssystem (RDBMS), 
das auf der Open-Source-Version von MySQL basiert. Es bietet eine 
zuverlässige, leistungsstarke und skalierbare Datenbanklösung für 
die Speicherung und Verwaltung von Daten in verschiedenen Anwendungen und Umgebungen.

Link zur Installation:
https://mariadb.org/

### MySQL Workbench
MySQL Workbench ist eine grafische integrierte Entwicklungsumgebung (IDE) 
für die Verwaltung von MySQL-Datenbanken. Es bietet Tools zum Entwerfen 
von Datenbanken, zum Erstellen und Ausführen von SQL-Abfragen, zum 
Datenbankmonitoring und zur Verwaltung von Verbindungen, Tabellen und Benutzern.

Link zur Installation:
https://www.mysql.com/products/workbench/

### Docker Desktop
Docker ist eine Open-Source-Plattform, die es ermöglicht, Anwendungen und 
deren Abhängigkeiten in isolierten Containern zu verpacken und auszuführen. 
Dadurch wird eine konsistente Bereitstellung von Anwendungen über 
verschiedene Umgebungen hinweg erleichtert und die Skalierbarkeit und 
Portabilität von Anwendungen verbessert.

Link zur Installation:
https://www.docker.com/products/docker-desktop/

## Installation
Hier sind überblicksmäßig alle erforderlichen Schritte aufgelistet, welche notwendig 
sind um die Applikation lokal aufzusetzen. 

### Git clone
Zuerst muss das Git Repository ge-cloned werden: \
https://github.com/

git clone \
```git@github.com:.git```

### Angular Development server

Navigiere vom Projektverzeichnis in das frontend Verzeichnis. \
Starte `ng serve` in der Command Line für den dev server. \
Navigiere zu `http://localhost:4200/`. \
Die Anwendung lädt automatisch neu, wenn Änderungen im Angular Projekt durchgeführt werden.

### Datenbank
Einloggen in MariaDB mit dem zuvor festgelegten Username und Passwort. \
Anschließend die Datenbank erstellen, um diese anschließend im Backend verwenden zu können. \
``create database appointmentManagement;`` \
``use appointmentManagement;``

Stelle sicher, dass der Port 3308 lokal nicht verwendet wird, sonst kann der Docker Container
nicht gestartet werden. \
Führe anschließend den Befehl ``docker-compose up`` im Root Level des Projekverzeichnisses aus
um den docker Container für die MariaDB Datenbank zu starten.

### Backend
Öffne das Backend Projekt in IntelliJ und führe die Standard Konfiguration im Main File aus. 


## REST Schnittstellen
Hier sind alle verfügbaren REST Schnittstellen aufgeführt:
