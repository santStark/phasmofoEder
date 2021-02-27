class Menu extends Phaser.Scene {

    constructor() {
        super({ key: 'Menu', active: true });
    }

    preload() {
        this.load.image('back', './assets/img/capa.png');
        this.load.image('menuBck', './assets/img/menuBck.png');
        this.load.image('perdeu', './assets/img/perdeu.png');
        this.load.image('venceu', './assets/img/venceu.png');
        this.load.spritesheet('btns', './assets/img/btns.png', { frameWidth: 300, frameHeight: 60 });
        this.load.spritesheet('btnsOpt', './assets/img/btnsOpt.png', { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet("tiles", "./assets/map/tilesets/tiles.png", { frameWidth: 48, frameHeight: 48 });
        this.load.tilemapTiledJSON("map", "./assets/map/map.json");
        this.load.spritesheet('player', './assets/sprite/player.png', { frameWidth: 46, frameHeight: 48 });
        this.load.spritesheet('inimigo', './assets/sprite/inimigo.png', { frameWidth: 46, frameHeight: 48 });
        this.load.audio("house", ["./assets/sound/house.mp3"]);
        this.load.audio("menu", ["./assets/sound/menu.mp3"]);


        this.load.plugin('rexvirtualjoystickplugin', './joystick.js', true);
    }

    create() {

        this.back = this.add.image(400, 300, 'back');
        this.btns = this.physics.add.staticGroup();
        this.activeMenu = 1;
        this.jogar = this.btns.create(400, 310, 'btns', 5).setInteractive();;
        this.opt = this.btns.create(390, 380, 'btns', 2).setInteractive();;
        this.cred = this.btns.create(390, 450, 'btns', 0).setInteractive();

        this.btnFull = this.add.text(700, 10, 'Fullscreen', { font: '20px Arial', fill: '#FFFFFF' }).setInteractive();;

        this.btnFull.on('pointerdown', function () {

            if (this.scale.isFullscreen) {
               
                this.scale.stopFullscreen();
            }
            else {
                
                this.scale.startFullscreen();
            }

        }, this);

        if(!configGame.soundMenu)
            configGame.soundMenu = this.sound.add("menu", { loop: true, volume: 1 });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.jogar.on('pointerdown', function (pointer) {

            this.activeMenu = 1;
            this.setImg();
            this.goToGame();
    
        }, this);

        this.opt.on('pointerdown', function (pointer) {

            this.activeMenu = 2;
            this.setImg();
            this.goToOpt();
    
        }, this);

        this.cred.on('pointerdown', function (pointer) {

            this.activeMenu = 3;
            this.setImg();
            this.goToCred();
    
        }, this);

        this.cursors.up.onDown = () => {

            if (this.activeMenu > 1) this.activeMenu--;
            this.setImg();
        }


        this.cursors.down.onDown = () => {

            if (this.activeMenu < 3) this.activeMenu++;
            this.setImg();
        }

        this.spaceBar.onDown = () => {

            if (this.activeMenu === 1) {
                this.goToGame();
            }else if (this.activeMenu === 2) {
                this.goToOpt();
            }

        }

        if(configGame.music){

            configGame.soundMenu.play();

        }
        
        

    }

    update() {

    }

    goToGame(){
        
        configGame.soundMenu.stop();
        let sceneA = this.scene.get('SceneA');
        let sceneB = this.scene.get('SceneB');
        sceneB.active = true;
        sceneA.active = true;
        this.scene.start('SceneA');
        this.scene.start('SceneB');

    }

    goToOpt(){MenuCred
        
        let menuOpt = this.scene.get('MenuOpt');
        menuOpt.active = true;
        this.scene.start('MenuOpt');

    }

    goToCred(){
        
        let menuCred = this.scene.get('MenuCred');
        menuCred.active = true;
        this.scene.start('MenuCred');

    }

    defaultImg() {

        this.jogar.setFrame(4);
        this.opt.setFrame(2);
        this.cred.setFrame(0);

    }

    setImg() {
        this.defaultImg();
        if (this.activeMenu === 1) {

            this.jogar.setFrame(5);

        } else if (this.activeMenu === 2) {

            this.opt.setFrame(3);

        } else {

            this.cred.setFrame(1);

        }

    }
}