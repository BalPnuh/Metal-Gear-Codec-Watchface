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

//Change Lines on Codec
export function codeclines(Pulszone, ZielAktivität, ZielKalorien, ZielSchritte, Entfernung, ZielEntfernung, ZielEtagen, Datum, amArm, Batterie, document)
{
  let Wochentage = 
  {
    "1": "Monday",
    "2": "Tuesday",
    "3": "Wednesday",
    "4": "Thursday",
    "5": "Friday",
    "6": "Saturday",
    "0": "Sunday"
  }

  let Monate = 
  {
    "1": "January",
    "2": "February",
    "3": "March",
    "4": "April",
    "5": "May",
    "6": "June",
    "7": "July",
    "8": "August",
    "9": "September",
    "10": "October",
    "11": "November",
    "12": "December"
  }

  let Rankings = 
  {
    "0": "Chicken",
    "1": "Rabbit",
    "2": "Ostrich",
    "3": "Spider",
    "4": "Koala",
    "5": "Scorpion",
    "6": "Tarantula",
    "7": "Pig",
    "8": "Sloth",
    "9": "Centipede",
    "10": "Capibara",
    "11": "Elephant",
    "12": "Flying Squirrel",
    "13": "Mammoth",
    "14": "Whale",
    "15": "Hawk",
    "16": "Giant Panda",
    "17": "Cat",
    "18": "Deer",
    "19": "Piranha",
    "20": "Zebra",
    "21": "Shark",
    "22": "Jaws",
    "23": "Eagle",
    "24": "Hippotamus",
    "25": "Orca",
    "26": "Pigeon",
    "27": "Hound",
    "28": "Falcon",
    "29": "Doberman",
    "30": "Fox",
    "31": "Big Boss"
  }

  let Codec1 = document.getElementById("codectext1");
  let Codec2 = document.getElementById("codectext2");
  let Codec3 = document.getElementById("codectext3");
  let Frequenz = document.getElementById("codeccounter").text;
  let Aktivität = document.getElementById("aktiv").text;
  let Schritte = document.getElementById("schritte").text;
  let Etagen = document.getElementById("etagen").text;
  let Kalorien =  document.getElementById("kalorien").text;
  let Liquid = document.getElementById("Liquid").text;
  
  switch (Frequenz) 
  {
    case "1":
      if (amArm == true)
      {
        Codec1.text = "Hello Snake, today is";
        Codec2.text = Wochentage[Datum.getDay()] + " the "+ Datum.getDate() +". of ";
        Codec3.text = Monate[Datum.getMonth()+1] + " " + Datum.getFullYear() + "."; 
      }
      else
      {
        Codec1.text = "Snake! What ";
        Codec2.text = "happend? SNAKE! ";
        Codec3.text = "Snnnaaaaaakkkkeee!";
      }
      setTimeout(function(){ console.log("Pause1") }, 1);
      break;
    case "2": // Mei/Ranking
      if (amArm == true)
      {
        if (Aktivität == "--")
        {
          Codec1.text = "The information";
          Codec2.text = "about your activities";
          Codec3.text = "is classified.";
        }
        else
        {
          var gesetzt = (ZielAktivität != "undefined")+(ZielEntfernung != "undefined")+(ZielEtagen != "undefined")+(ZielSchritte != "undefined")+(ZielKalorien != "undefined");
          if (gesetzt < 5)
          {
              Codec1.text = "You have not enough";
              Codec2.text = "daily goals defined";
              Codec3.text = "for a proper ranking.";
          }
          else
          {
            var Ranking = (Entfernung >= ZielEntfernung)*16+(Schritte >= ZielSchritte)*8+(Etagen >= ZielEtagen)*4+(Kalorien >= ZielKalorien)*2+(Aktivität >= ZielAktivität)*1;
            var erreicht = (Entfernung >= ZielEntfernung)+(Schritte >= ZielSchritte)+(Etagen >= ZielEtagen)+(Kalorien >= ZielKalorien)+(Aktivität >= ZielAktivität);
            Codec1.text = "Snake you got the";
            Codec2.text = Rankings[Ranking]; 
            Codec3.text = "Ranking (" + erreicht + "/5 goals).";
          }
        }
      }
      else
      {
        Codec1.text = "No, please no!";
        Codec2.text = "Snake!";
        Codec3.text = "SNAKE!";
      }
       setTimeout(function(){ console.log("Pause2") }, 1);
      break;
    case "3": //Meryl/Kalorien
      if (amArm == true)
      {
        if (Kalorien == "--")
        {
            Codec1.text = "Snake are you";
            Codec2.text = "hiding under a card-";
            Codec3.text = "board box again?";
        }
        else
        {
          if (ZielKalorien == "undefined")
          {
            Codec1.text = "Snake you have";
            Codec2.text = "to define the number";
            Codec3.text = "of daily rations.";  
          }
          else
          {
            if (Kalorien >= ZielKalorien)
            {
              Codec1.text = "Snake, you burned";
              Codec2.text = "enough calories to";
              Codec3.text = "eat a new ration.";
            }
            else
            {
              Codec1.text = "You need to burn";
              Codec2.text = ZielKalorien-Kalorien + " more calories";
              Codec3.text = "for your next ration.";
            }
          }
        }
      }
      else
      {
        Codec1.text = "This can't be!";
        Codec2.text = "";
        Codec3.text = "";
      }
       setTimeout(function(){ console.log("Pause3") }, 1);
      break; 
    case "4": //Master/Schritte
      if (amArm == true)
      {
        if (Schritte == "--")
        {
          Codec1.text = "I taught you well,";
          Codec2.text = "Snake. I can't trace";
          Codec3.text = "your steps.";
        }
        else
        {
          if (ZielSchritte == "undefined")
          {
            Codec1.text = "Snake remind me:";
            Codec2.text = "how much steps per";
            Codec3.text = "day was your goal?";  
          }
          else
          {
            if (Schritte >= ZielSchritte)
            {
                Codec1.text = "Snake, you finally";
                Codec2.text = "reached the Metal";
                Codec3.text = "Gear Hanger!";
            }
            else
            {
                let erfüllt = ZielSchritte-Schritte;
                Codec1.text = "To reach Metal Gear";
                Codec2.text = "you need " + erfüllt;
                Codec3.text = "more steps. Hurry.";
            }
          }
        }
      }
      else
      {
        if (Liquid == true)
        {
          console.log(Liquid)
          Codec1.text = "HAHAHAHA SNAKE!";
          Codec2.text = "I knew that I am the";
          Codec3.text = "better one of us both!";  
        }
        else
        {
          console.log("bla")
          Codec1.text = "Snake? Damn!";
          Codec2.text = "I thought I trained";
          Codec3.text = "you better!"; 
        }
      }
       setTimeout(function(){ console.log("Pause4") }, 1);
      break;
   case "5": //Nastascha/Entfernung
      if (amArm == true)
      {
        if (Entfernung == "--")
        {
          Codec1.text = "It seems that some-";
          Codec2.text = "thing is blocking my";
          Codec3.text = "readings of you.";
        }
        else
        {
          if (ZielEntfernung == "undefined")
          {
            Codec1.text = "Snake, how far do";
            Codec2.text = "you think you can";
            Codec3.text = "go on one day?";  
          }
          else
          {
            if (Entfernung >= ZielEntfernung)
              {
                Codec1.text = "Snake, you must";
                Codec2.text = "have reached the";
                Codec3.text = "nuclear weapons.";
              }
            else
              {
                let erfüllt = Math.round((ZielEntfernung - Entfernung)/100)/10;
                Codec1.text = "To reach the nukes";
                Codec2.text = "you need to move " + erfüllt;
                Codec3.text = "more km.";
              }
          }
        }
      }
      else
      {
          Codec1.text = "Snake? SNAKE?";
          Codec2.text = "What the hell!?";
          Codec3.text = "SNAKE!";    
      }
       setTimeout(function(){ console.log("Pause5") }, 1);
      break;
    case "6": //Fox/Etagen
      if (amArm == true)
      {
        if (Etagen == "--")
        {
          Codec1.text = "Be careful, they"
          Codec2.text = "blocked transmission"
          Codec3.text = "in the next area."
        }
        else
        {
          if (ZielEtagen == "undefined")
          {
            Codec1.text = "The stair seems end-";
            Codec2.text = "less, if you don't set";
            Codec3.text = "yourself a goal.";  
          }
          else
          {
            if (Etagen >= ZielEtagen)
            {
              Codec1.text = "You reached the top"
              Codec2.text = "of Com. Tower A. "
              Codec3.text = "Be careful of traps."
            }
            else
            {
              let erfüllt = ZielEtagen - Etagen;
              Codec1.text = "Snake, " + erfüllt + " more floors"
              Codec2.text = "until the top of" 
              Codec3.text = "Com. Tower A."
            }
          }
        }
      }
      else
      {
          Codec1.text = "Snake? Have I've";
          Codec2.text = "been too late to";
          Codec3.text = "interfere?";    
      }
       setTimeout(function(){ console.log("Pause6") }, 1);
      break;
    case "7": //Sniper/Activity
      if (amArm == true)
      {
        if (Aktivität == "--")
        {
          Codec1.text = "Snake you are good.";
          Codec2.text = "I can't find you.";
          Codec3.text = "But I will!";
        }
        else
        {
          if (ZielAktivität == "undefined")
          {
            Codec1.text = "How long do you";
            Codec2.text = "think you can avoid";
            Codec3.text = "my bullets, Snake?";  
          }
          else
          {
            if (Aktivität >= ZielAktivität)
            {
              Codec1.text = "I just couldn't hit you";
              Codec2.text = "Snake. You've been";
              Codec3.text = "too active.";
            }
            else
            {
              let erfüllt = ZielAktivität - Aktivität;
              Codec1.text = "Snake can you sense";
              Codec2.text = "me?You have to avoid";
              Codec3.text = "me for "+erfüllt+" more min.";
            }
          }
        }
      }
      else
      {
          Codec1.text = "I told you my";
          Codec2.text = "bullet will pierce";
          Codec3.text = "your heart!";    
      }
       setTimeout(function(){ console.log("Pause7") }, 1);
      break; 
    case "8": //Naomi/Heartrate
      if (amArm == true)
      {
        if (Pulszone =="undefined")
        {
          Codec1.text = "Snake, we can't read";
          Codec2.text = "your bpms. Are your";
          Codec3.text = "nanomachines OK?" ;
        }
        else
        {
          switch (Pulszone)
          {
            case "out-of-range":
              Codec1.text = "Snake, your bpm";
              Codec2.text = "is low. Are you";
              Codec3.text = "currently resting?"; 
              break;
            case "fat-burn":
              Codec1.text = "The nanomachines";
              Codec2.text = "are measuring an";
              Codec3.text = "increased pbm." ;
              break;
            case "cardio":
              Codec1.text = "Snake, do you need";
              Codec2.text = "some Diazepam to ";
              Codec3.text = "lower your bpm?" ;
              break;
            case "peak":
              Codec1.text = "Snake your bpm is"
              Codec2.text = "very high! Please "
              Codec3.text = "Be careful." 
              break;
            case "below-custom":
              Codec1.text = "Snake, your pbm";
              Codec2.text = "is below the";
              Codec3.text = "optimal range." ;
              break;
            case "custom":
              Codec1.text = "You are keeping";
              Codec2.text = "your heartrate in the";
              Codec3.text = "optimal range Snake." ;
              break;
            case "above-custom":
              Codec1.text = "The nanomachines";
              Codec2.text = "are warning that";
              Codec3.text = "your bpm is to high."; 
              break;
          }
        }
      }
      else
      {
        Codec1.text = "Snake, answer me.";
        Codec2.text = "Snake! ";
        Codec3.text = "SNAKE";
      } 
       setTimeout(function(){ console.log("Pause8") }, 1);
      break;
    case "9": //Hal/Battery
      if (amArm == true)
      {
        if (Batterie.chargeLevel <= 20)
        {
          Codec1.text = "You'll have to eat a";
          Codec2.text = "luminescent mush-";
          Codec3.text = "room for recharging.";
        }
        else
        {
          Codec1.text = "Snake your batteries";
          Codec2.text = "are full enough to";
          Codec3.text = "use all your tools.";
        }
      }
      else
      {
        if (Batterie.charging == true)
        {
          Codec1.text = "Your batteries are";
          Codec2.text = "recharging. Just ";
          Codec3.text = 100-Batterie.chargeLevel +" more percent.";    
        }
        else
        {
          Codec1.text = "Snake,what's wrong?";
          Codec2.text = "Answer me, please!";
          Codec3.text = "Snake? SNAKE!";
        }
      }  
      setTimeout(function(){ console.log("Pause9") }, 1);
      break; 
  }
}

export function codecface(Frequenz, document)
{
   let Bilder = 
  {
    "1": "Images/Gesichter/roy.jpg",
    "2": "Images/Gesichter/mei.jpg",
    "3": "Images/Gesichter/meryl.jpg",
    "4": "Images/Gesichter/master.jpg",
    "5": "Images/Gesichter/nastascha.jpg",
    "6": "Images/Gesichter/fox.jpg",
    "7": "Images/Gesichter/sniper.jpg",
    "8": "Images/Gesichter/naomi.jpg",
    "9": "Images/Gesichter/hal.jpg",
    "10": "Images/Gesichter/liquid.jpg"
  }
  
  let Gesicht = document.getElementById("codec1");
  Gesicht.href = Bilder[Frequenz]
}

export function psychotext(document, psycho, vibration)
{
  let Codec1 = document.getElementById("codectext1");
  let Codec2 = document.getElementById("codectext2");
  let Codec3 = document.getElementById("codectext3");
  let Mantis = document.getElementById("Mantis");
  let Hideo = document.getElementById("Hideo");
  let psychocounter = document.getElementById("psychocounter"); 

  psychocounter.text = parseInt(psychocounter.text) + 1;
  switch (psychocounter.text) 
      {
        case "1":
          Codec1.text = "Snake..."
          Codec2.text = "do you..."
          Codec3.text = "like me?"
          vibration.start("nudge-max");
          break;
        case "3":
          Codec1.text = "Do you like me?"
          Codec2.text = "Hold me, Snake."
          Codec3.text = ""
          vibration.start("nudge-max");
          break; 
        case "5":
          Codec1.text = "Hurry... hurry!"
          Codec2.text = "Make love to me!!"
          Codec3.text = "Snake, I want you!!"
          vibration.start("nudge-max");
          break; 
        case "8":
          Mantis.style.visibility = "visible"; 
          Codec1.text = ""
          Codec2.text = ""
          Codec3.text = ""
          break;
        case "9":
          Codec1.text = "I will show you my"
          Codec2.text = "psychokinetic"
          Codec3.text = "power."
          vibration.start("ring");
          break;
        case "10":
          Codec1.text = "I will show you my"
          Codec2.text = "psychokinetic"
          Codec3.text = "power."
          vibration.start("ring");
          break;
        case "15":
          Mantis.style.visibility = "hidden";
          Hideo.style.visibility = "visible";
          Codec1.style.visibility = "hidden";
          Codec2.style.visibility = "hidden";
          Codec3.style.visibility = "hidden";
          vibration.start("nudge-max");
          break;
        case "17":
          Hideo.style.visibility = "hidden";  
          Codec1.style.visibility = "visible";
          Codec2.style.visibility = "visible";
          Codec3.style.visibility = "visible";
          psychocounter.text = 0;
          psycho.text = 0;
          break;
      }
   setTimeout(function(){ }, 500);
}
