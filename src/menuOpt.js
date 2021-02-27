class MenuOpt extends Phaser.Scene {

    constructor() {
        super({ key: 'MenuOpt', active: false });
    }

    preload() {
    }

    create() {
        this.back = this.add.image(400, 300, 'back');
        this.btnsOpt = this.physics.add.staticGroup();
        this.btnMusic = this.btnsOpt.create(300, 310, 'btnsOpt', (configGame.music ? 0 : 1)).setInteractive();
        this.btnJoy = this.btnsOpt.create(500, 310, 'btnsOpt', (configGame.joystick ? 2 : 3)).setInteractive();
        this.btnBack = this.btnsOpt.create(780, 20, 'btnsOpt', 5).setInteractive();
        this.btnBack.scale = 0.3;
        
        this.btnBack.on('pointerdown', function (pointer) {

            this.goToMenu();
    
        }, this);

        this.btnJoy.on('pointerdown', function (pointer) {

            this.changeJoystick();
    
        }, this);

        this.btnMusic.on('pointerdown', function (pointer) {

            this.changeSound();
    
        }, this);

    }

    update() {

    }

    goToMenu(){
        this.scene.start('Menu');
        let menu = this.scene.get('Menu');
        menu.active = true;

    }

    changeSound(){
        if(configGame.music){
            this.btnMusic.setFrame(1);
            configGame.music = false;
            configGame.soundMenu.stop();
        }else{
            this.btnMusic.setFrame(0);
            configGame.music = true;
            configGame.soundMenu.play();
        }
    }

    changeJoystick(){
        if(configGame.joystick){
            this.btnJoy.setFrame(3);
            configGame.joystick = false;
        }else{
            this.btnJoy.setFrame(2);
            configGame.joystick = true;
        }
    }

    
}