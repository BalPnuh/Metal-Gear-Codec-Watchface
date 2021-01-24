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

export function updateBattery(battery, document, vibration)   
{
  let batterywarning = document.getElementById("batterywarning");
  let batteryinner = document.getElementById("batteryinner");
  let charginglevel = document.getElementById("charginglevel");
  let Codec = document.getElementById("codeccounter");
  let warning = false
  
  if (battery.chargeLevel > 20)
  {
    batterywarning.style.visibility = "hidden"; 
  }
  if (battery.chargeLevel == 20)
  {
    if (batterywarning.style.visibility == "hidden")
    {
      Codec.text = 9;
      vibration.start("nudge-max");
      warning = true
    }
  }
  if (battery.chargeLevel <=20)
  {
    batterywarning.style.visibility = "visible";     
  }
  //Anpassung der Ladeanzeige
  batteryinner.width = 12*battery.chargeLevel/100;
  batteryinner.x = 31-(12*battery.chargeLevel/100);

  charginglevel.text = battery.chargeLevel+'%'
  return warning
}

//Balkenanimation für Laden
export function batteryloading(battery, document)
{
      let balken = document.getElementById("balken");
      let loading = document.getElementById("loadingframe");
      let loadingframe = parseInt(loading.text);
      let Ladung = Math.round(battery.chargeLevel/11);
    
      if (loadingframe < 9)
      {
        loadingframe ++;
      }
      else
      {
        loadingframe = Ladung;
      }
      let frame = loadingframe.toString()
      loading.text = frame;
      balken.href= "Images/Balken/Balken" + frame + ".png"; 
}
