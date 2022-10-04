// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input');


let inventory = {
    water: 400,
    milk: 540,
    coffeeBeans: 120,
    money: 550,
    cups: 9
};

function printInventory (current) {
    console.log(`The coffee machine has:
${current.water} ml of water
${current.milk} ml of milk
${current.coffeeBeans} g of coffee beans
${current.cups} disposable cups
$${current.money} of money`);
    return current;
}

function getChoice () {
    console.log("Write action (buy, fill, take, remaining, exit):");
    return input();
}

function isEnough (current, required) {
    return current.water >= required.water && current.milk >= required.milk
        && current.coffeeBeans >= required.coffeeBeans && current.cups > 0;
}

function actionBuy (current) {
    var espresso = {
        water: 250,
        milk: 0,
        coffeeBeans: 16,
        money: 4
    };

    var latte = {
        water: 350,
        milk: 75,
        coffeeBeans: 20,
        money: 7
    };

    var cappuccino = {
        water: 200,
        milk: 100,
        coffeeBeans: 12,
        money: 6
    };

    console.log('What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu:');
    let answer = input();
    var coffee;
    switch (answer) {
        case '1':
            coffee = espresso;
            break;
        case '2':
            coffee = latte;
            break;
        case '3':
            coffee = cappuccino;
            break;
        case 'back':
            return current;
    }

    if (isEnough(current, coffee)){
        console.log('I have enough resources, making you a coffee!');
        current.water -= coffee.water;
        current.milk -= coffee.milk;
        current.coffeeBeans -= coffee.coffeeBeans;
        current.cups--;
        current.money += coffee.money;
    } else {
        var ingredient;
        if (current.water < coffee.water){
            ingredient = 'water';
        }
        if (current.milk < coffee.milk){
            ingredient = 'milk';
        }
        if (current.coffeeBeans < coffee.coffeeBeans){
            ingredient = 'coffee beans';
        }
        if (current.cups < 1){
            ingredient = 'cups';
        }
        console.log(`Sorry, not enough ${ingredient}!`)
    }

    return current;

}

function actionFill (current) {
    console.log('Write how many ml of water you want to add:');
    current.water += Number(input());
    console.log('Write how many ml of milk you want to add:');
    current.milk += Number(input());
    console.log('Write how many grams of coffee beans you want to add:');
    current.coffeeBeans += Number(input());
    console.log('Write how many disposable cups you want to add:');
    current.cups += Number(input());
    return current;
}

function actionTake (current) {
    console.log(`I gave you $${current.money}`);
    current.money = 0;
    return current;
}


let action;
let exit = false;
while (true) {
    console.log();
    let choice = getChoice();
    console.log();
    switch (choice) {
        case 'buy':
            action = actionBuy;
            break;
        case 'fill':
            action = actionFill;
            break;
        case 'take':
            action = actionTake;
            break;
        case 'remaining':
            action = printInventory;
            break;
        case 'exit':
            exit = true;
            break;
    }
    if (exit) {
        break;
    }
    inventory = action(inventory);
}