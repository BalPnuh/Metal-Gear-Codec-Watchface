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

// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

//durchschalten Gesichter
export function Portraitwechsel (aktuell, richtung)
{
  if (richtung == "nächstes")
  {
      aktuell ++
  }
  else
    {
      aktuell --
    }
  if (aktuell == 0)
    {
      aktuell = 9
    }
  if (aktuell == 10)
    {
      aktuell = 1
    }
  return aktuell
}
