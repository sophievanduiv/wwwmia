# README SHITAPP

This repo contains information about the ShitApp. The mainfunction is for the teachers to have a quick overview of what is all included 
in the hybrid mobile app, created by two ICT and Media Design students (Nina Hermens and Sophie van Duivenboden).

## Purpose
The main purpose of the ShitApp is to give the possibility to send notifications to a cleaning company when a toilet is dirty or smelly,
when there is not toiletpaper, when there is no soap, etc. The reason for this application is that, in the future, nobody has to
deal with disgusting toilets anymore.

## UI
The UI of the app is based on Phonon, a light weight, scalable and customizable HTML5 Hybrid Mobile App Framework. It works with
a page manager (only small parts of the page load when you click a link). In included several Javascript libraries as navigation.js, 
menus.js and preloaders.js and it contains a CSS with standard Phonon designs. It's easy to use and learn and very lightweighted.
It does not work with iOS, so the ShitApp is only an Android application.

## Plugins
**com.phonegap.plugins.barcodescanner** This plugin allows the app to read barcodes. The goal is that every toilet is getting his own barcode, which can be send to the cleaningcompany when needed so they know which toilet to clean.</br>
</br>
**org.apache.cordova.camera** This plugin allows the app to use the phone's camera. This function allows users to send an image that explains the reason why the toilet needs to be cleaned. </br>
</br>
**cordova.plugins.email** This plugin allows to send information via e-mail to the cleaning company.

## Back-end
The information filled in by the user in the app will ben send through e-mail to the cleaning company.


