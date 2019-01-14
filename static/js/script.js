

var app = new Vue({
    el: '#game',
    data: {
        macilaci: 'Maci nem laci!',
        stock1: [{
            id: 0,
            name: 'hero1',
            src: 'static/media/balazs_effect.mp4',
            hp: 3,
            attack: 2,
            mana: 1
        },
        {
            id: 1,
            name: 'hero2',
            src: 'static/media/balazs_effect.mp4',
            hp: 2,
            attack: 4,
            mana: 2
        },
        {
            id: 2,
            name: 'hero3',
            src: 'static/media/balazs_effect.mp4',
            hp: 4,
            attack: 1,
            mana: 2
        },
        {
            id: 3,
            name: 'hero4',
            src: 'static/media/balazs_effect.mp4',
            hp: 2,
            attack: 2,
            mana: 1
        },
        {
            id: 4,
            name: 'hero5',
            src: 'static/media/balazs_effect.mp4',
            hp: 3,
            attack: 5,
            mana: 3
        }
        ],

        playedcard1: {
            firstrow: '',
            secondrow: '',
            thirdrow: ''
        },
        selectedCard: ''
    },
    methods: {
        reverseMacilaci: function () {
            this.macilaci = this.macilaci.split('').reverse().join('')
        },
        selectCard: function (id) {
            this.selectedCard = this.stock1.find(heroe => heroe.id === id);
            this.stock1.splice(id,1)
        },
        moveCard: function (key) {
            this.playedcard1[key] = this.selectedCard;
            console.log(this.selectedCard);
            this.selectedCard = ''
        }
    }
});





