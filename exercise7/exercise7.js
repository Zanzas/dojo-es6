export default {
    makePizza,
}

function makeDough() {
    return new Promise(resolve => {
        setTimeout(() => {resolve('dough'); console.log('dough')}, 1000)
    });
}

function makeSauce(sauceType) {
    return new Promise(resolve => {
        setTimeout(() => {resolve(sauceType); console.log('sauce')}, 100)
    });
}

function grateCheese(sauceType) {
    return new Promise(resolve => {
        setTimeout(() => {resolve('cheese'); console.log('cheese ', sauceType)}, 100)
    });
}

function makePizza(sauceType = 'red') {
    return makeDough()
        .then(() => makeSauce(sauceType))
        .then((sauce) => grateCheese(sauce));
}
