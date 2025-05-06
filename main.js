/*
 * Copyright 2025 Tushar Kumar Sahu
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


const userInput = document.getElementById("search-input");
const searchForm = document.getElementById("search-form");
const creatureName = document.getElementById("creature-name");
const creatureID = document.getElementById("creature-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const specialName = document.getElementById("special-name");
const specialDescription = document.getElementById("special-description");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

async function getCreature(){
    try {
        const creatureNameOrId = userInput.value.toLowerCase();
        const response = await fetch(`https://rpg-creature-api.freecodecamp.rocks/api/creature/${creatureNameOrId}`);
        const data = await response.json();


        //set creature info
        creatureName.textContent = data.name.toUpperCase();
        creatureID.textContent = `#${data.id}`;
        weight.textContent = `Weight: ${data.weight}`;
        height.textContent = `Height: ${data.height}`;
        specialName.textContent = data.special.name;
        specialDescription.textContent = data.special.description;


        //set stats
        hp.textContent = data.stats[0].base_stat;
        attack.textContent = data.stats[1].base_stat;
        defense.textContent = data.stats[2].base_stat;
        specialAttack.textContent = data.stats[3].base_stat;
        specialDefense.textContent = data.stats[4].base_stat;
        speed.textContent = data.stats[5].base_stat;

        //set types

        types.innerHTML = data.types.map(obj => {
            return `<span class="type ${obj.name}"> ${obj.name} </span>`
        }).join("");

    } catch (error) {
        resetDisplay();
        alert("Creature not found");
        console.log(`Creature not found: ${error}`)
    }
}

function resetDisplay(){
    creatureName.textContent = "";
    creatureID.textContent = "";
    height.textContent = "";
    weight.textContent = "";
    types.innerHTML = "";
    specialName.textContent = "";
    specialDescription.textContent = "";
    hp.textContent = "";
    attack.textContent = "";
    defense.textContent = "";
    specialAttack.textContent = "";
    specialDefense.textContent = "";
    speed.textContent = "";
}

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    getCreature();
});