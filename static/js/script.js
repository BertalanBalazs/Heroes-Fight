

let app = new Vue({
    el: '#game',
    computed: {
        buttonText: function () {
            if (this.phase === 'student') return 'End student\'s turn';
            else if (this.phase === 'mentor') return 'End mentor\'s turn';
            else return 'Battle';
        }
    },
    data: {
        phase: 'student',
        battle: {
            key: '',
            student: {
                name: '',
                image: '',
                text: '',
                hp: 0,
                attack: 0
            },
            mentor: {
                name: '',
                image: '',
                text: '',
                hp: 0,
                attack: 0
            }
        },
        student: {
            texts: texts.student,
            heroSrc : 'static/media/student.png',
            stock:
                [{
                    id: 0,
                    name: 'hero1',
                    src: 'balazs',
                    hp: 3,
                    attack: 2,
                    mana: 1
                },
                {
                    id: 1,
                    name: 'hero2',
                    src: 'balazs',
                    hp: 2,
                    attack: 4,
                    mana: 2
                },
                {
                    id: 2,
                    name: 'hero3',
                    src: 'balazs',
                    hp: 4,
                    attack: 1,
                    mana: 2
                },
                {
                    id: 3,
                    name: 'hero4',
                    src: 'balazs',
                    hp: 2,
                    attack: 2,
                    mana: 1
                },
                {
                    id: 4,
                    name: 'hero5',
                    src: 'balazs',
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
            texts: texts.mentor,
            heroSrc : 'static/media/mentor.png',
            stock:
                [{
                    id: 100,
                    name: 'hero1',
                    src: 'rudi',
                    hp: 3,
                    attack: 2,
                    mana: 1
                },
                {
                    id: 101,
                    name: 'hero2',
                    src: 'rudi',
                    hp: 2,
                    attack: 4,
                    mana: 2
                },
                {
                    id: 102,
                    name: 'hero3',
                    src: 'rudi',
                    hp: 4,
                    attack: 1,
                    mana: 2
                },
                {
                    id: 103,
                    name: 'hero4',
                    src: 'rudi',
                    hp: 2,
                    attack: 2,
                    mana: 1
                },
                {
                    id: 104,
                    name: 'hero5',
                    src: 'rudi',
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
            if (this.phase !== player) return;
            this[player].selectedCard = this[player].stock.find(heroe => heroe.id === id);
            let index = this[player].stock.findIndex(element => element.id === id); //gives back the index of the selected card
            this[player].stock.splice(index,1)
        },
        moveCard: function (id, player) {
            if (this.phase !== player) return;
            this[player].playedCard[id] = this[player].selectedCard;
            this[player].selectedCard = ''
        },
        startBattle: function () {
            for( const key of ['firstrow', 'secondrow', 'thirdrow']) {
                for( const player of ['student', 'mentor']) {
                    // text
                    const rand = Math.floor(Math.random() * this[player].texts.length);
                    this.battle[player].text = this[player].texts[rand];
                    /*this.battle[player].name = this[player].playedCard[key].name;*/
                    this[player].texts.splice(rand, 1);

                    // image
                    this.battle[player].image = this[player].playedCard[key].src;
                }
                this.battle.key = key;
                console.log(this.battle.student.name)
            }
        },
        nextPhase: function () {
            if (this.phase === 'student') this.phase='mentor';
            else if (this.phase === 'mentor') {
                this.phase='battle';
                this.startBattle()
            }
            else this.phase='student';
        },
        waitTime: function (ms) {
            const start = new Date().getTime()
            let end = start
            while (end < start + ms) {
                end = new Date().getTime()
            }
        }
    }
});





