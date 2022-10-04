// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input');

function howMuchCoffee () {
    console.log("Write how many cups of coffee you will need:");
    return input();
}

function calculateIngredients (cups) {
    return {
        water: 200 * cups,
        milk: 50 * cups,
        coffeeBeans: 15 * cups
    };
}

function printIngredients (ingredients) {
    console.log(`${ingredients.water} ml of water`);
    console.log(`${ingredients.milk} ml of milk`);
    console.log(`${ingredients.coffeeBeans} ml of coffee beans`);
}

function askHowMany (ingredient) {
    let unit;
    if (['water', 'milk'].includes(ingredient)) {
        unit = 'ml';
    } else {
        unit = 'grams';
    }
    console.log(`Write how many ${unit} of ${ingredient} the coffee machine has:`);
    return input();
}

function getInventory () {
    return {
      water: askHowMany('water'),
      milk: askHowMany('milk'),
      coffeeBeans: askHowMany('coffeeBeans')
    };
}

function checkCapability (inv, req, cups) {
    let max_output = [];
    max_output.push(inv.water / req.water);
    max_output.push(inv.milk / req.milk);
    max_output.push(inv.coffeeBeans / req.coffeeBeans);
    //console.log(inv, req, cups, max_output)

    let total = Math.floor(Math.min.apply(Math, max_output));
    if (total < cups) {
        console.log(`No, I can make only ${total} cups of coffee`);
        return;
    }
    if (total == cups) {
        console.log("Yes, I can make that amount of coffee");
        return;
    }
    if (total > cups) {
        console.log(`Yes, I can make that amount of coffee (and even ${total - cups} more than that)`);
        return;
    }
}

let inventory = getInventory();
let cups = howMuchCoffee();
let requirements = calculateIngredients(1);
checkCapability(inventory, requirements, cups);

/*
// output for stage 2
console.log(`For ${cups} cups of coffee you will need:`);
printIngredients(calculateIngredients(cups));
 */