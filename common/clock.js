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

import * as util from "../common/utils";

export function Zeit(evt, Zeitformat, document)
{
  let hour1 = document.getElementById("hourdigit1");
  let hour2 = document.getElementById("hourdigit2");
  let minute1 = document.getElementById("minutedigit1");
  let minute2 = document.getElementById("minutedigit2");
  let punkte = document.getElementById("dots");
  let USTag = document.getElementById("ustag");

  let digits = 
  {
    "1": "Images/Digits/1.png",
    "2": "Images/Digits/2.png",
    "3": "Images/Digits/3.png",
    "4": "Images/Digits/4.png",
    "5": "Images/Digits/5.png",
    "6": "Images/Digits/6.png",
    "7": "Images/Digits/7.png",
    "8": "Images/Digits/8.png",
    "9": "Images/Digits/9.png",
    "0": "Images/Digits/0.png",
    "leer": "Images/Digits/leer.png",
    "an": "Images/Digits/punktean.png",
    "aus": "Images/Digits/punkteaus.png"
  }

  //Ermitteln der Stunden
    let today = evt.date;
    let hours = today.getHours();
    USTag.text ="" 
    console.log(Zeitformat)
    if (Zeitformat === "12h") 
    {
        console.log("12hFormat")  
      // 12h format
        if (hours < 12)
        {
          USTag.text ="AM"
        }
        else
        {
          USTag.text ="PM"  
        }
        hours = hours % 12 || 12;
        
    } 
    hours = util.zeroPad(hours);
    let hourstring = hours.toString();
  
    //Ermitteln der Minuten
    let mins = util.zeroPad(today.getMinutes());
    let minutestring = mins.toString()
 
    //Update Ziffern
    hour1.href = digits[hourstring[0]];
    hour2.href = digits[hourstring[1]];
    minute1.href = digits[minutestring[0]];
    minute2.href = digits[minutestring[1]];
  
    //Update Punkte
    let seconds = today.getSeconds();
    let punktestatus = seconds % 2;
    if (punktestatus == 1)
      {
        punkte.href = digits["an"]  
      }
    else
      {
        punkte.href = digits["aus"] 
      }  
}
