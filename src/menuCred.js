class MenuCred extends Phaser.Scene {

    constructor() {
        super({ key: 'MenuCred', active: false });
    }

    preload() {
    }

    create() {
        this.back = this.add.image(400, 300, 'back');
        this.btnsOpt = this.physics.add.staticGroup();
        
        this.btnBack = this.btnsOpt.create(780, 20, 'btnsOpt', 5).setInteractive();
        this.btnBack.scale = 0.3;
        
        this.btnBack.on('pointerdown', function (pointer) {

            this.goToMenu();
    
        }, this);

        this.add.text(350, 50, 'Créditos', { font: '30px Arial', fill: '#FFFFFF' });
        this.add.text(270, 300, 'Guilherme Santiago Silva', { font: '23px Arial', fill: '#FFFFFF' });
        this.add.text(290, 340, 'santiago.tra@gmail.com', { font: '20px Arial', fill: '#FFFFFF' });
        this.add.text(320, 380, '....SantGames....', { font: '20px Arial', fill: '#FFFFFF' });
        this.add.text(375, 420, '2021', { font: '20px Arial', fill: '#FFFFFF' });

    }

    update() {

    }

    goToMenu(){
        this.scene.start('Menu');
        let menu = this.scene.get('Menu');
        menu.active = true;

    }

    
}