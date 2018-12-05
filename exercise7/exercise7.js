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

// function makePizza(sauceType = 'red') {
//     return makeDough()
//         .then(() => makeSauce(sauceType))
//         .then((sauce) => grateCheese(sauce));
// }

// async function makePizza(sauceType = 'red') {
//     const dough = await makeDough();
//     const sauce = await makeSauce(sauceType);

//     const cheese = await grateCheese(sauce);

//     return {
//         dough,
//         sauce,
//         cheese,
//     };
// }

// async function makePizza(sauceType = 'red') {
//     let [ dough, sauce ] =
//     await Promise.all([ makeDough(), makeSauce(sauceType) ]);

//     let cheese = await grateCheese(sauce);

//     return {
//         dough,
//         sauce,
//         cheese,
//     };
// }

async function makePizza(sauceType = 'red') {
    let doughPromise  = makeDough();
    let saucePromise  = makeSauce(sauceType);
    let cheesePromise = saucePromise.then(sauce => {
        return grateCheese(sauce);
      });
    let [ dough, sauce, cheese ] =
    await Promise.all([ doughPromise, saucePromise, cheesePromise ]);

    return {
        dough,
        sauce,
        cheese,
    };
}
