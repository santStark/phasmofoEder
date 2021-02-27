class SceneA extends Phaser.Scene {

    constructor() {
        super({ key: 'SceneA', active: false });
        this.spotlight = undefined;
        this.moveInimigo = false;
        this.spaceBar = undefined;
        this.funcMove = undefined;
        this.funcSusto = undefined;
        this.lastDir = undefined;
        this.player = undefined;
        this.inimigo = undefined;
        this.house = undefined;
        this.cursors = undefined;
    }


    preload() {

    }

    create() {
        /** Reinicia game */
        configObj();
        this.registry.destroy();
        this.events.off();

        /**create Map and physics */
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage("tiles", "tiles");
        const pisoL = map.createLayer("piso", tileset, 0, 0).setPipeline('Light2D');
        const blockFantasmaL = map.createLayer("blockFantasma", tileset, 0, 0).setPipeline('Light2D');
        const altoBlockL = map.createLayer("altoBlock", tileset, 0, 0).setPipeline('Light2D');
        const altoL = map.createLayer("alto", tileset, 0, 0).setPipeline('Light2D');
        const objL = map.createLayer("obj", tileset, 0, 0).setPipeline('Light2D');


        this.createPlayer();
        this.createInimigo();
        pisoL.setCollisionByProperty({ collider: true });
        blockFantasmaL.setCollisionByProperty({ blockFantasma: true });
        this.physics.add.collider(this.player, pisoL);
        this.physics.add.collider(this.player, objL);
        this.physics.add.collider(this.inimigo, blockFantasmaL, () => { this.moveInimigo = false; });
        this.physics.add.collider(this.inimigo, pisoL, () => { this.moveInimigo = false; });
        this.physics.add.overlap(this.player, this.inimigo, this.hitFantasma.bind(this));

        objL.setTileIndexCallback([12, 32, 63, 429, 430, 431, 432, 433, 434, 435, 11, 14, 15, 17, 18, 31, 33, 40, 51, 53, 57, 58, 59, 77, 78, 97, 98, 117, 118, 119, 120, 249, 250, 251, 254, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 281, 283, 287, 288, 293, 294, 295, 296, 298, 301, 303, 304, 305, 307, 308, 310, 312, 313, 314, 315, 316, 330, 332, 333, 334, 335, 336, 341, 342, 343, 344, 345, 346, 347, 348, 360, 380, 382, 383, 384, 386, 387, 388, 401, 402, 405, 417, 418, 419, 420, 425, 437, 438, 439, 440],
            this.overlapLayer.bind(this), this);


        /**Camera */
        const camera = this.cameras.main;
        camera.startFollow(this.player);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);


        /**Luz */
        this.lights.enable();
        this.lights.setAmbientColor(0x080808); // 0x808080 080808
        this.spotlight = this.lights.addLight(200, 150, 140).setIntensity(1); // 400, 300, 280     3

        /**Sound */
        configGame.soundJogo = this.sound.add("house", { loop: true });
        if (configGame.music) configGame.soundJogo.play();

        /**Controlers */
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.cursors = this.input.keyboard.createCursorKeys();
        if (configGame.joystick) {
            this.createJoystick();
            this.createButtonJoy();
        }


        /**Back */
        this.ourGame = this.scene.get('SceneB');
        this.ourGame.events.on('goToMenuPrincipal', function (item) {

            this.goToMenuPrincipal();

        }, this);

    }

    update() {

        if (!configGame.joystick) {

            if (this.cursors.left.isDown) {
                this.movePlayer({ x: -(100 + configGame.resistencia), y: 0, ani: 'left' });

            }
            else if (this.cursors.right.isDown) {
                this.movePlayer({ x: (100 + configGame.resistencia), y: 0, ani: 'right' });

            }
            else if (this.cursors.up.isDown) {
                this.movePlayer({ x: 0, y: -(100 + configGame.resistencia), ani: 'up' });

            }
            else if (this.cursors.down.isDown) {
                this.movePlayer({ x: 0, y: (100 + configGame.resistencia), ani: 'down' });

            } else {
                this.player.setVelocityY(0);
                this.player.setVelocityX(0);
                this.player.anims.play('turn', true);
            }
        }

        if (configGame.joystick) {

            if (this.cursorKeysJoy.left.isDown) {
                this.movePlayer({ x: -(100 + configGame.resistencia), y: 0, ani: 'left' });

            }
            else if (this.cursorKeysJoy.right.isDown) {
                this.movePlayer({ x: (100 + configGame.resistencia), y: 0, ani: 'right' });

            }
            else if (this.cursorKeysJoy.up.isDown) {
                this.movePlayer({ x: 0, y: -(100 + configGame.resistencia), ani: 'up' });

            }
            else if (this.cursorKeysJoy.down.isDown) {
                this.movePlayer({ x: 0, y: (100 + configGame.resistencia), ani: 'down' });

            } else {
                this.player.setVelocityY(0);
                this.player.setVelocityX(0);
                this.player.anims.play('turn', true);
            }
        }

        this.movimentaInimigo();

        this.spotlight.x = this.player.x;
        this.spotlight.y = this.player.y;


    }

    /**Implementações */

    createJoystick() {


        this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
            x: 100,
            y: 500,
            radius: 60,
            base: this.add.circle(0, 0, 60, 0x888888),
            thumb: this.add.circle(0, 0, 35, 0xcccccc),
        })

        this.cursorKeysJoy = this.joyStick.createCursorKeys();


    }

    createButtonJoy() {
        setTimeout(() => {

            this.events.emit('createButtonJoy');

        }, 500);
    }

    goToMenuPrincipal() {
        
        if(configGame.soundJogo) configGame.soundJogo.stop();
        
        this.ourGame.active = false;
        this.ourGame.scene.start('Menu');
        
        this.active = false;
        this.scene.start('Menu');

        let menu = this.scene.get('Menu');
        menu.active = true;

    }

    goToFinalGame() {

        if(configGame.soundJogo) configGame.soundJogo.stop();

        this.ourGame.active = false;
        this.ourGame.scene.start('Final');

        this.active = false;
        this.scene.start('Final');

        let menu = this.scene.get('Final');
        menu.active = true;

    }

    hitFantasma() {

        if(configGame.escondido) return;
        if (configGame.sanidade > 0) {
            configGame.sanidade--;
            if (configGame.sanidade > 90) configGame.resistencia = 60
            if (configGame.sanidade < 75) configGame.resistencia = 50
            if (configGame.sanidade < 50) configGame.resistencia = 40
            if (configGame.sanidade < 30) configGame.resistencia = 30
            if (configGame.sanidade < 20) configGame.resistencia = 20

        } else {

            this.goToFinalGame();

        }

    }

    createInimigo() {

        this.inimigo = this.physics.add.sprite(1500, 1300, 'inimigo');
        this.inimigo.visible = false;

        this.createAnimacao({ key: 'upI', obj: 'inimigo', start: 0, end: 8, rate: 10, repeat: -1 });
        this.createAnimacao({ key: 'leftI', obj: 'inimigo', start: 9, end: 17, rate: 10, repeat: -1 });
        this.createAnimacao({ key: 'downI', obj: 'inimigo', start: 18, end: 26, rate: 10, repeat: -1 });
        this.createAnimacao({ key: 'rightI', obj: 'inimigo', start: 27, end: 35, rate: 10, repeat: -1 });

        this.anims.create({
            key: 'turnI',
            frames: [{ key: 'inimigo', frame: 18 }],
            frameRate: 20
        });
    }

    createPlayer() {

        this.player = this.physics.add.sprite(1500, 1500, 'player');

        this.createAnimacao({ key: 'up', obj: 'player', start: 0, end: 8, rate: 10, repeat: -1 });
        this.createAnimacao({ key: 'left', obj: 'player', start: 9, end: 17, rate: 10, repeat: -1 });
        this.createAnimacao({ key: 'down', obj: 'player', start: 18, end: 26, rate: 10, repeat: -1 });
        this.createAnimacao({ key: 'right', obj: 'player', start: 27, end: 35, rate: 10, repeat: -1 });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'player', frame: 18 }],
            frameRate: 20
        });

    }

    overlapLayer(sprite, tile) {
       
        let vl = Object.keys(tile.properties)[0];
        let vl2 = Object.keys(tile.properties)[1];
         if (vl === 'item') {

            this.verifyItem(tile);

        } else if (vl === 'esconder') {

            this.esconderPlayer();

        } else if (vl === 'lupa') {
        
            this.verifyLupa(tile);

        } else if (vl === 'find' || vl2 === 'find') {
            
            this.verifyFindItem(tile);

        }

        return false;

    }

    verifyItem(tile) {

        const vl = tile.properties.item;
        if (vl !== configGame.itemUse && (this.spaceBar.isDown || (configGame.buttonAction && configGame.buttonAction.isDown)) && vl !== 'agua') {

            configGame.itemUse = vl;
            this.events.emit('changeItem', vl);

        } else if (vl === 'agua' && configGame.sanidade < 100 && (this.spaceBar.isDown || (configGame.buttonAction && configGame.buttonAction.isDown))) {

            configGame.sanidade += 30;
            configGame.sanidade = configGame.sanidade > 100 ? 100 : configGame.sanidade;

        }

    }

    verifyFindItem(tile) {
        if(configGame.joystick && !configGame.buttonAction.isDown) return;
        if (!this.spaceBar.isDown && !configGame.joystick ) return;
        console.log('passou')
        const x = tile.x;
        const y = tile.y;
        if (!configGame.ev1.find || !configGame.ev2.find || !configGame.ev3.find) {

            this.events.emit('showInfo', 'Não tem nada pra você aqui agora!');
            return;

        }

        let find = false;

        for (let i = 1; i < 4; i++) {

            if (find) continue;
            if (configGame['item' + i].x === x && configGame['item' + i].y === y && !configGame['item' + i].find) {

                find = true;
                configGame['item' + i].find = true;
                const vl = configGame['item' + i].item;
                this.events.emit('showInfo', 'Item encontrado: ' + vl + '!!!')

            }

        }

        if (find) {

            let qtdEv = 0;
            let qtdIt = 0;
            if (configGame.ev1.find) qtdEv = qtdEv + 1;
            if (configGame.ev2.find) qtdEv = qtdEv + 1;
            if (configGame.ev3.find) qtdEv = qtdEv + 1;
            if (configGame.item1.find) qtdIt = qtdIt + 1;
            if (configGame.item2.find) qtdIt = qtdIt + 1;
            if (configGame.item3.find) qtdIt = qtdIt + 1;

            this.events.emit('changeObjt', qtdEv, qtdIt);

            if (qtdIt >= 3) this.goToFinalGame();

        } else {

            this.events.emit('showInfo', 'Nada encontrado!');

        }

    }

    esconderPlayer() {

        if (configGame.escondido) return;
        configGame.escondido = true;
        this.player.visible = false;
        this.spotlight.setIntensity(0.3);

    }

    verifyLupa(tile) {

        if(configGame.joystick && !configGame.buttonAction.isDown) return;
        if (!this.spaceBar.isDown && !configGame.joystick ) return;

        if (configGame.itemUse === '' || configGame.itemUse === 'agua') {
            this.events.emit('showInfo', 'Selecione um equipamento valido!');
            return;
        }

        const x = tile.x;
        const y = tile.y;
        let find = false;

        for (let i = 1; i < 4; i++) {

            if (find) continue;
            if (configGame['ev' + i].x === x && configGame['ev' + i].y === y && configGame['ev' + i].item === configGame['itemUse']) {

                find = true;
                configGame['ev' + i].find = true;
                this.events.emit('showInfo', 'Evidência encontrada!!!')

            }

        }

        if (find) {

            let qtdEv = 0;
            let qtdIt = 0;
            if (configGame.ev1.find) qtdEv = qtdEv + 1;
            if (configGame.ev2.find) qtdEv = qtdEv + 1;
            if (configGame.ev3.find) qtdEv = qtdEv + 1;
            if (configGame.item1.find) qtdIt = qtdIt + 1;
            if (configGame.item2.find) qtdIt = qtdIt + 1;
            if (configGame.item3.find) qtdIt = qtdIt + 1;

            this.events.emit('changeObjt', qtdEv, qtdIt);

        } else {

            this.events.emit('showInfo', 'Nada detectado!');

        }

    }

    createAnimacao(obj) {

        this.anims.create({
            key: obj.key,
            frames: this.anims.generateFrameNumbers(obj.obj, { start: obj.start, end: obj.end }),
            frameRate: obj.rate,
            repeat: obj.repeat
        });

    }

    movePlayer(obj) {

        this.player.visible = true;
        this.spotlight.setIntensity(1);
        configGame.escondido = false;
        this.player.setVelocityX(obj.x);
        this.player.setVelocityY(obj.y);
        this.player.anims.play(obj.ani, true);

    }

    movimentaInimigo() {

        if (this.movimentaInimigo4()) return;

        if (!this.moveInimigo) {

            this.movimentaInimigo2();
            clearInterval(this.funcMove);

            this.funcMove = setInterval(() => {

                if (!this.active) {
                    clearInterval(this.funcMove);
                    return;
                }
                this.movimentaInimigo2();
                clearTimeout(this.funcSusto);

                /*this.funcSusto = setTimeout(() => {
                    this.movimentaInimigo5(); 
                }, 5000);*/

            }, 2000);

            this.moveInimigo = true;
        }



    }

    movimentaInimigo2() {
        let array = ['up', 'down', 'left', 'right'];
        let num = Math.floor(Math.random() * 4);

        if (array[num] !== this.lastDir) {

            this.movimentaInimigo3(array[num]);
            this.lastDir = array[num];

        } else {

            this.movimentaInimigo2();

        }

    }

    movimentaInimigo3(dir) {

        if (dir === 'up') {

            this.inimigo.setVelocityX(0);
            this.inimigo.setVelocityY(-100);
            this.inimigo.anims.play('upI', true);

        } else if (dir === 'down') {

            this.inimigo.setVelocityX(0);
            this.inimigo.setVelocityY(100);
            this.inimigo.anims.play('downI', true);

        } else if (dir === 'left') {

            this.inimigo.setVelocityX(-100);
            this.inimigo.setVelocityY(0);
            this.inimigo.anims.play('leftI', true);

        } else if (dir === 'right') {

            this.inimigo.setVelocityX(100);
            this.inimigo.setVelocityY(0);
            this.inimigo.anims.play('rightI', true);

        }
    }

    movimentaInimigo4() {

        var posX = this.player.x - this.inimigo.x;
        var posY = this.player.y - this.inimigo.y;
        var bol = false;
        this.inimigo.visible = false;
        if (Math.abs(posX) < 100 && Math.abs(posY) < 100 && !configGame.escondido) {

            this.inimigo.visible = true;
            if (Math.abs(posX) > Math.abs(posY)) {

                if (this.player.x < this.inimigo.x) {

                    this.movimentaInimigo3('left');

                } else if (this.player.x > this.inimigo.x) {

                    this.movimentaInimigo3('right');
                }

            } else {

                if (this.player.y < this.inimigo.y) {

                    this.movimentaInimigo3('up');

                } else if (this.player.y > this.inimigo.y) {

                    this.movimentaInimigo3('down');

                }
            }
            bol = true;
            clearInterval(this.funcMove);

        }

        return bol;

    }


    movimentaInimigo5() {

        if (configGame.escondido) return;
        this.inimigo.x = this.player.x - 50;
        this.inimigo.y = this.player.y - 50;

    }

}


class SceneB extends Phaser.Scene {

    constructor() {
        super({ key: 'SceneB', active: false });
        this.pause = false;

    }

    create() {

        this.registry.destroy();
        this.events.off();

        /**HUD */
        this.infoItem = this.add.text(10, 70, 'Item:', { font: '15px Arial', fill: '#ffffff' });
        this.infoObj = this.add.text(200, 10, 'Objetivo: Encontre 3 evidências do fanstasma: 0/3 encontradas', { font: '15px Arial', fill: '#ffffff' });
        this.infoAction = this.add.text(200, 40, '', { font: '15px Arial', fill: '#FF0000' });
        this.infoMenuPaused = this.add.text(400, 300, '', { font: '15px Arial', fill: '#FF0000' });
        this.infoSanidade = this.add.text(10, 10, '', { font: '15px Arial', fill: '#00FA9A' });
        this.infoTime = this.add.text(10, 40, 'Time: 000', { font: '15px Arial', fill: '#00FA9A' });

        /**Menu */
        this.menuBck = this.add.image(400, 300, 'menuBck');
        this.menuBck.scale = 1.3;
        this.btnsOpt = this.physics.add.staticGroup();
        this.btnBack = this.btnsOpt.create(780, 20, 'btnsOpt', 5).setInteractive();
        this.btnBack.scale = 0.3;

        this.labelMenu = this.add.text(360, 155, 'Menu', { font: '30px Arial', fill: '#000000' });
        this.labelSan = this.add.text(200, 200, 'Sanidade:', { font: '18px Arial', fill: '#000000' });
        this.labelEqp = this.add.text(200, 250, 'Equipamento:', { font: '18px Arial', fill: '#000000' });
        this.labelEvi = this.add.text(200, 300, 'Evidências:', { font: '18px Arial', fill: '#000000' });
        this.labelItens = this.add.text(200, 350, 'Itens Ritual:', { font: '18px Arial', fill: '#000000' });
        this.labelMnP = this.add.text(330, 410, 'Menu Principal', { font: '18px Arial', fill: '#FF0000' }).setInteractive();

        this.visibleMenu(false);

        this.labelMnP.on('pointerdown', function (pointer) {

            this.goToMenuPrincipal();

        }, this);

        this.btnBack.on('pointerdown', function (pointer) {

            this.pauseGame();

        }, this);

        this.ourGame = this.scene.get('SceneA');

        this.ourGame.events.on('changeItem', function (item) {
            console.log(item)
            this.infoItem.setText('Item: ' + item);

        }, this);

        this.ourGame.events.on('createButtonJoy', function () {

            this.createButtonJoy();

        }, this);

        this.ourGame.events.on('showInfo', function (text) {

            this.infoAction.setText(text);
            this.infoAction.x = 400 - (this.infoAction.width / 2);
            setTimeout(() => { this.infoAction.setText(''); }, 2000)

        }, this);

        this.ourGame.events.on('changeObjt', function (qtdEv, qtdIt) {

            if (qtdEv === 3) {
                this.infoObj.setText('Objetivo: Encontre os 3 itens do ritual: ' + qtdIt + '/3 encontrados');
            } else {
                this.infoObj.setText('Objetivo: Encontre 3 evidencisa do fanstasma: ' + qtdEv + '/3 encontradas');
            }

        }, this);

        this.funTime = setInterval(() => {
            if (!this.active) {
                clearInterval(this.funTime);
                return;
            }

            if (!this.pause && configGame.timeJogo < 960) {
                configGame.timeJogo = configGame.timeJogo + 1;
                this.infoTime.setText('Time: ' + configGame.timeJogo.toString().padStart(3, '0'))
            }

        }, 1000);
    }

    update() {
        this.infoSanidade.setText('Sanidade: ' + configGame.sanidade);
    }

    goToMenuPrincipal() {

        this.events.emit('goToMenuPrincipal');
    }

    visibleMenu(bol) {
        this.pause = bol;
        this.menuBck.visible = bol;
        this.labelMenu.visible = bol;
        this.labelSan.visible = bol;
        this.labelEqp.visible = bol;
        this.labelEvi.visible = bol;
        this.labelItens.visible = bol;
        this.labelMnP.visible = bol;

    }

    configLabel() {

        const arrayEv = [];
        const arrayIte = [];

        if (configGame.ev1.find) arrayEv.push(configGame.ev1.item);
        if (configGame.ev2.find) arrayEv.push(configGame.ev2.item);
        if (configGame.ev3.find) arrayEv.push(configGame.ev3.item);

        if (configGame.item1.find) arrayIte.push(configGame.item1.item);
        if (configGame.item2.find) arrayIte.push(configGame.item2.item);
        if (configGame.item3.find) arrayIte.push(configGame.item3.item);

        this.labelSan.setText('Sanidade: ' + configGame.sanidade);
        this.labelEqp.setText('Equipamento: ' + (configGame.itemUse ? configGame.itemUse : 'nenhum'));
        this.labelEvi.setText('Evidências: ' + (arrayEv.length > 0 ? arrayEv.join(', ') : 'nenhum'));
        this.labelItens.setText('Itens Ritual: ' + (arrayIte.length > 0 ? arrayIte.join(', ') : 'nenhum'));

    }

    pauseGame() {
        if (this.pause) {
            this.infoMenuPaused.setText('');
            configGame.soundJogo.play();
            game.scene.resume('SceneA');
            this.visibleMenu(false);

        } else {
            this.infoMenuPaused.setText('paused');
            configGame.soundJogo.stop();
            game.scene.pause('SceneA');
            this.configLabel();
            this.visibleMenu(true);

        }
    }

    createButtonJoy() {

        let btnAction = this.btnsOpt.create(705, 505, 'btnsOpt', 6).setInteractive();
        btnAction.isDown = false;
        configGame.buttonAction = btnAction;

        btnAction.on('pointerdown', function (pointer) {

            btnAction.isDown = true;

        }, this);

        btnAction.on('pointerup', function (pointer) {

            btnAction.isDown = false;

        }, this);

    }
}
