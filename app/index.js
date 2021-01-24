// Copyright (C) 2021  Marco Schaefer-Herte

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import { clock } from "clock";
import { battery } from "power";
import { HeartRateSensor } from "heart-rate";
import { me as appbit } from "appbit";
import { BodyPresenceSensor } from "body-presence";
import { display } from "display";
import { preferences } from "user-settings";
import { today } from "user-activity";
import { goals } from "user-activity";
import { user } from "user-profile";
import { vibration } from "haptics";
import { memory as jsmemory} from "system";

import * as Uhr from "../common/clock";
import * as Batterie from "../common/battery";
import * as Herzrate from "../common/heartrate";
import * as Codec from "../common/codec";
import * as util from "../common/utils";

import document from "document";

//Oben
const puls =  document.getElementById("puls"); //benötigt
const aktiv =  document.getElementById("aktiv"); //benötigt
const schritte =  document.getElementById("schritte"); //benötigt
const etagen =  document.getElementById("etagen"); //benötigt
const kalorien =  document.getElementById("kalorien"); //benötigt

const rechts = document.getElementById("rechts");//benötigt
const links = document.getElementById("links");//benötigt
const memory = document.getElementById("memory");//benötigt
const codeccounter = document.getElementById("codeccounter"); //benötigt

const liquid = document.getElementById("Liquid"); //benötigt
const psycho = document.getElementById("psycho");//benötigt

// Update the clock every second
clock.granularity = "seconds";

var Heute = new Date(); //benötigt
var amArm = true; //benötigt
var bpmzone = "undefined"; //benötigt
var Entfernung = "--"; //benötigt
var ZielEntfernung = "undefined"; //benötigt
var ZielSchritte = "undefined"; //benötigt
var ZielKalorien = "undefined"; //benötigt
var ZielEtagen = "undefined"; //benötigt
var ZielAktivität = "undefined"; //benötigt

//Linker Pfeil
links.onclick = function(e) 
{
  codeccounter.text=util.Portraitwechsel(parseInt(codeccounter.text), "vorheriges")
  Codec.codecface(codeccounter.text, document)
  liquid.text=0;
  Codec.codeclines(bpmzone, ZielAktivität, ZielKalorien, ZielSchritte, Entfernung, ZielEntfernung, ZielEtagen, Heute, amArm, battery, document);
}

//rechter Pfeil
rechts.onclick = function(e) 
{
  codeccounter.text=util.Portraitwechsel(parseInt(codeccounter.text), "nächstes")
  Codec.codecface(codeccounter.text, document)
  liquid.text=0;
  Codec.codeclines(bpmzone, ZielAktivität, ZielKalorien, ZielSchritte, Entfernung, ZielEntfernung, ZielEtagen, Heute, amArm, battery, document);
}

//MemoryFeld
memory.onclick = function(e) 
{
  if (codeccounter.text==4&&amArm == false)
  {
    liquid.text=1;
    Codec.codecface(10, document)
    Codec.codeclines(bpmzone, ZielAktivität, ZielKalorien, ZielSchritte, Entfernung, ZielEntfernung, ZielEtagen, Heute, amArm, battery, document);
  }
  if (codeccounter.text==3&&parseInt(puls.text)>90)
    {
      psycho.text=1;
    }
}

//Plus und KörperSensor
if (display.on == true)
{
  if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) 
  {
    let hrm = new HeartRateSensor();
    hrm.addEventListener("reading", () => 
    {
      Herzrate.herz(hrm, puls, document)
      if (appbit.permissions.granted("access_user_profile"))
      {
        bpmzone = user.heartRateZone(hrm.heartRate);
      }
      else
      {
        codeccounter.text = 8;
        bpmzone = "undefined"
      }
      setTimeout(function(){ console.log("PauseHRM") }, 1);
    });
    
    if (BodyPresenceSensor) 
    {
      let body = new BodyPresenceSensor();
      body.addEventListener("reading", () => 
      {
        console.log("body")
        if (!body.present) 
        {
          hrm.stop(); 
          amArm = false;
        } 
        else 
        {
          hrm.start();
          amArm = true;
        }
      });
      body.start();
            
      display.addEventListener("change", () => 
      {
        // Automatically stop the sensor when the screen is off to conserve battery
        display.on ? body.start(): body.stop();
        display.on ? hrm.start(): hrm.stop();
        if (display.on == true)
        {
          Heute = new Date();
          if (appbit.permissions.granted("access_activity"))
          {     
              schritte.text = today.adjusted.steps;
              kalorien.text = today.adjusted.calories;
              etagen.text = today.adjusted.elevationGain;
              aktiv.text = today.adjusted.activeZoneMinutes.total
              Entfernung = today.adjusted.distance;
              ZielEntfernung = goals.distance;
              ZielSchritte = goals.steps;
              ZielKalorien = goals.calories;
              ZielEtagen = goals.elevationGain;
              ZielAktivität = goals.activeZoneMinutes.total
            } 
            else
            {
              schritte.text = "--";
              kalorien.text = "--";
              etagen.text = "--";
              aktiv.text = "--";
              Entfernung = "--";
              ZielEntfernung = "undefined";
              ZielSchritte = "undefined";
              ZielKalorien = "undefined";
              ZielEtagen = "undefined";
              ZielAktivität = "undefined";
            }
          if (psycho.text==false)
          {
              Codec.codecface(codeccounter.text, document)
              Codec.codeclines(bpmzone, ZielAktivität, ZielKalorien, ZielSchritte, Entfernung, ZielEntfernung, ZielEtagen, Heute, amArm, battery, document);
              console.log("JS memory: " + jsmemory.js.used + "/" + jsmemory.js.total);
          }
          
        }//if (display.on == true)
      });
    }//(BodyPresenceSensor)
  }//if (HeartRateSensor && appbit.permissions.granted("access_heart_rate")) 
  else
  {
      codeccounter.text = 8;
      puls.text = "--"
      bpmzone = "undefined"
  }
  
  
  if (appbit.permissions.granted("access_activity"))
  {     
    schritte.text = today.adjusted.steps;
    kalorien.text = today.adjusted.calories;
    etagen.text = today.adjusted.elevationGain;
    aktiv.text = today.adjusted.activeZoneMinutes.total
    Entfernung = today.adjusted.distance;
    ZielEntfernung = goals.distance;
    ZielSchritte = goals.steps;
    ZielKalorien = goals.calories;
    ZielEtagen = goals.elevationGain;
    ZielAktivität = goals.activeZoneMinutes.total
  } 
  else
  {
    schritte.text = "--";
    kalorien.text = "--";
    etagen.text = "--";
    aktiv.text = "--";
    Entfernung = "--";
    ZielEntfernung = "undefined";
    ZielSchritte = "undefined";
    ZielKalorien = "undefined";
    ZielEtagen = "undefined";
    ZielAktivität = "undefined";
  }
  Codec.codeclines(bpmzone, ZielAktivität, ZielKalorien, ZielSchritte, Entfernung, ZielEntfernung, ZielEtagen, Heute, amArm, battery, document);
  Codec.codecface(codeccounter.text, document)
  
  //Beim Updaten der Uhr
  clock.ontick = (evt) => 
  {
    Uhr.Zeit(evt, preferences.clockDisplay, document);
    
    //Battery
    // Anzeigen des Ausrufezeichens wenn weniger als 30% 
    let warning = Batterie.updateBattery(battery, document, vibration)
    if (warning == true)
    {
      Codec.codecface(codeccounter.text, document)
      Codec.codeclines(bpmzone, ZielAktivität, ZielKalorien, ZielSchritte, Entfernung, ZielEntfernung, ZielEtagen, Heute, amArm, battery, document);
    }
    
    if (battery.charging == true)
    {
      Batterie.batteryloading(battery, document)
    } 

    if (psycho.text==true)
    {
      Codec.psychotext(document, psycho, vibration);
      if (document.getElementById("psychocounter").text == 16)
      {
          console.log("blub")
          codeccounter.text==3;
          Codec.codeclines(bpmzone, ZielAktivität, ZielKalorien, ZielSchritte, Entfernung, ZielEntfernung, ZielEtagen, Heute, amArm, battery, document);   
      }
    }     
  }//clock.ontick = (evt)
}//if (display.on == true)
