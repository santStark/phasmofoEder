var configGame = {
    ev1: { x: 0, y: 0, find: false, item: '' },
    ev2: { x: 0, y: 0, find: false, item: '' },
    ev3: { x: 0, y: 0, find: false, item: '' },
    itemUse: '',
    item1: { x: 0, y: 0, find: false, item: '' },
    item2: { x: 0, y: 0, find: false, item: '' },
    item3: { x: 0, y: 0, find: false, item: '' },
    sanidade: 100,
    resistencia:0,
    timeJogo:0,
    music:true,
    buttonAction:undefined,
    joystick:true,
    soundMenu:undefined,
    soundJogo:undefined,
    itens: ['corrente', 'fosforo', 'fio de cabelo', 'escova de dente', 'sal', 'agua'],
    obj: ['livro', 'camera', 'emf', 'lanterna uv', 'radio', 'termometro'],
    lupa: [{ x: 24, y: 23 }, { x: 48, y: 28 }, { x: 18, y: 11 }, { x: 6, y: 18 }, { x: 8, y: 28 }, { x: 34, y: 9 }, { x: 13, y: 14 }, { x: 9, y: 7 }, { x: 36, y: 12 }, { x: 53, y: 13 }],
    find: [{ x: 27, y: 23 }, { x: 9, y: 25 }, { x: 6, y: 25 }, { x: 6, y: 26 }, { x: 9, y: 18 }, { x: 6, y: 21 }, { x: 6, y: 22 }, { x: 10, y: 22 }, { x: 23, y: 11 }, { x: 23, y: 12 }, { x: 6, y: 5 }, { x: 11, y: 5 }, { x: 11, y: 6 }, { x: 10, y: 11 }, { x: 28, y: 5 }, { x: 29, y: 5 }, { x: 30, y: 5 }, { x: 31, y: 5 }, { x: 36, y: 10 }, { x: 41, y: 13 }, { x: 41, y: 10 }, { x: 48, y: 11 }, { x: 47, y: 11 }, { x: 47, y: 10 }, { x: 48, y: 10 }, { x: 43, y: 10 }, { x: 45, y: 22 }, { x: 45, y: 27 }, { x: 45, y: 28 }, { x: 52, y: 28 }, { x: 37, y: 23 }, { x: 31, y: 23 }, { x: 32, y: 23 }],
    escondido: false
}

function configObj() {
    let arrayEv = [];
    let arrayItem = [];
    let arrayEvItem = [];
    let arrayItemItem = [];

    let last = [];
    while (arrayEv.length < 3) {
        let num = Math.floor(Math.random() * 10);
        if (last.indexOf(num) < 0) {
            arrayEv.push(configGame.lupa[num])
            last.push(num);
        }

    }

    last = [];
    while (arrayItem.length < 3) {
        let num = Math.floor(Math.random() * 33);
        if (last.indexOf(num) < 0) {
            arrayItem.push(configGame.find[num])
            last.push(num);
        }

    }

    last = [];
    while (arrayEvItem.length < 3) {
        let num = Math.floor(Math.random() * 5);
        if (last.indexOf(num) < 0) {
            arrayEvItem.push(configGame.obj[num])
            last.push(num);
        }

    }

    last = [];
    while (arrayItemItem.length < 3) {
        let num = Math.floor(Math.random() * 6);
        if (last.indexOf(num) < 0) {
            arrayItemItem.push(configGame.itens[num])
            last.push(num);
        }

    }

    for (let i = 1; i < 4; i++) {
        configGame['ev' + i].x = arrayEv[i - 1].x;
        configGame['ev' + i].y = arrayEv[i - 1].y;
        configGame['ev' + i].item = arrayEvItem[i - 1];
        configGame['item' + i].x = arrayItem[i - 1].x;
        configGame['item' + i].y = arrayItem[i - 1].y;
        configGame['item' + i].item = arrayItemItem[i - 1];


    }

    configGame.itemUse = '';
    configGame.sanidade = 100;
    configGame.resistencia = 60;
    configGame.timeJogo = 0,
    configGame.buttonAction = undefined;
    console.log(configGame);

}

configObj();


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-container",
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 }
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [Menu,SceneA,SceneB,MenuOpt,Final,MenuCred]
};

var game = new Phaser.Game(config);