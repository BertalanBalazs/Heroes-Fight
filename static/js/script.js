

let app = new Vue({
    el: '#game',
    data: {
        student: {
            stock:
                [{
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
                }],
            playedCard: {
                firstrow: '',
                secondrow: '',
                thirdrow: ''
            },
            selectedCard: ''
        },
        mentor: {
            stock:
                [{
                    id: 100,
                    name: 'hero1',
                    src: 'static/media/balazs_effect.mp4',
                    hp: 3,
                    attack: 2,
                    mana: 1
                },
                {
                    id: 101,
                    name: 'hero2',
                    src: 'static/media/balazs_effect.mp4',
                    hp: 2,
                    attack: 4,
                    mana: 2
                },
                {
                    id: 102,
                    name: 'hero3',
                    src: 'static/media/balazs_effect.mp4',
                    hp: 4,
                    attack: 1,
                    mana: 2
                },
                {
                    id: 103,
                    name: 'hero4',
                    src: 'static/media/balazs_effect.mp4',
                    hp: 2,
                    attack: 2,
                    mana: 1
                },
                {
                    id: 104,
                    name: 'hero5',
                    src: 'static/media/balazs_effect.mp4',
                    hp: 3,
                    attack: 5,
                    mana: 3
                }],
            playedCard: {
                firstrow: '',
                secondrow: '',
                thirdrow: ''
            },
            selectedCard: ''
        },
    },

    methods: {
        selectCard: function (id, player) {
            console.log(player, id);
            this[player].selectedCard = this[player].stock.find(heroe => heroe.id === id);
            let index = this[player].stock.findIndex(element => element.id === id); //gives back the index of the selected card
            this[player].stock.splice(index,1)
        },
        moveCard: function (id, player) {
            this[player].playedCard[id] = this[player].selectedCard;
            console.log(this[player].selectedCard);
            this[player].selectedCard = ''
        }
    }
});





