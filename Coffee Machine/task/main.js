// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input');

function howMuchCoffee () {
    console.log("Write how many cups of coffee you will need:");
    return input();
}

function calculateIngredients (cups) {
    let ingredients = {
        water: 200 * cups,
        milk: 50 * cups,
        coffeeBeans: 15 * cups
    };
    return ingredients;
}

function printIngredients (ingredients) {
    console.log(`${ingredients.water} ml of water`);
    console.log(`${ingredients.milk} ml of milk`);
    console.log(`${ingredients.coffeeBeans} ml of coffee beans`);
}

let cups = howMuchCoffee();
console.log(`For ${cups} cups of coffee you will need:`);
printIngredients(calculateIngredients(cups));
