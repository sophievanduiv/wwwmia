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
**com.phonegap.plugins.barcodescanner** This plugin allows the app to read barcodes. The goal is that every toilet is getting his
own barcode, which can be send to the cleaningcompany when needed so they know which toilet to clean.
**org.apache.cordova.camera** This plugin allows the app to use the phone's camera. This function allows users to send an image that
explains the reason why the toilet needs to be cleaned. 
OPTION **cordova.plugins.email** This plugin allows to send information via e-mail. It will only be used if Helpshift doens't work properly.

## External services
**https://www.helpshift.com/** The text and images that are being saved while using the ShitApp are send to an external service called Helpshift. Helpshift is a 
platform that uses it's own database to store external information. 

## Back-end
The ShitApp sends a set of information, this information has to be stored in the Helpshift database. The information includes 
plain text and images. The cleaning company has access to this platform and their database via the Helpshift app. Via various
notifications they're being updated with the latest new about the toilets. This is very little timeconsuming and works very easily, so 
it's best of both worlds.


