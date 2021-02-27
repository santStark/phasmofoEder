class Final extends Phaser.Scene {

    constructor() {
        super({ key: 'Final', active: false });
    }

    preload() {
       
    }

    create() {

        if(configGame.sanidade > 0) {

            this.imgBck = 'venceu';
            this.title = 'Parabéns!!!';
            this.msg = 'Você conseguiu exorcizar a casa!'; 
            this.x = 270;

        }else{

            this.imgBck = 'perdeu';
            this.title = 'Você Morreu!!!';
            this.msg = 'Você foi derrotado pelo fanstama da casa!';
            this.x = 345;

        }
        
        this.menuBck = this.add.image(400, 300, this.imgBck);

        this.labelTitle = this.add.text(330, 155, this.title, { font: '30px Arial', fill: '#000000' });
        this.labelMsg = this.add.text(230, 250, this.msg, { font: '18px Arial', fill: '#000000' });

        this.labelMnP = this.add.text(this.x, 410, 'Menu Principal', { font: '18px Arial', fill: '#FF0000' }).setInteractive();

        this.labelMnP.on('pointerdown', function (pointer) {

            this.goToMenu();
    
        }, this);
        
    }

    goToMenu(){
        this.scene.start('Menu');
        let menu = this.scene.get('Menu');
        menu.active = true;

    }

    update() {

    }

   
}