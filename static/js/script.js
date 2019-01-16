

let app = new Vue({
    el: '#game',
    computed: {
        buttonText: function () {
            if (this.phase === 'student') return 'End student\'s turn';
            else if (this.phase === 'mentor') return 'End mentor\'s turn';
            else return 'Battle';
        },
        message: function () {
            if (this.phase === 'student') return 'Student please place your cards';
            else if (this.phase === 'mentor') return 'Mentor please place your cards';
            else if(this.battlePhase === 'firstrow') return 'Battle first round';
            else if(this.battlePhase === 'secondrow') return 'Battle second round';
            else if(this.battlePhase === 'thirdrow') return 'Battle third round';
        }
    },
    data: {
        battlePhase: null,
        phase: 'student',
        battle: {
            firstrow: {
                student: null,
                mentor: null
            },
            secondrow: {
                student: null,
                mentor: null
            },
            thirdrow: {
                student: null,
                mentor: null
            }
        },
        student: {
            manaPool: 1,
            leftoverMana: 1,
            texts: texts.student,
            heroSrc : 'static/media/student.png',
            hero: {
                id: 'heroStudent',
                name: 'Student',
                src: 'student',
                hp: 20,
                attack: 0,
            },
            stock: studentStock,
            playedCard: {
                firstrow: '',
                secondrow: '',
                thirdrow: ''
            },
            selectedCard: ''
        },
        mentor: {
            hero: {
                id: 'heroMentor',
                name: 'Mentor',
                src: 'mentor',
                hp: 20,
                attack: 0,
            },
            manaPool: 1,
            leftoverMana: 1,
            texts: texts.mentor,
            heroSrc : 'static/media/mentor.png',
            stock: mentorStock,
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
            this[player].selectedCard = this[player].stock.find(hero => hero.id === id);
            //gives back the index of the selected card
            let index = this[player].stock.findIndex(element => element.id === id);
            this[player].stock.splice(index,1)
        },
        moveCard: function (id, player) {
            if (this.phase !== player) return;
            this[player].playedCard[id] = this[player].selectedCard;
            this.battle[id][player] = this[player].selectedCard;
            this[player].selectedCard = ''
        },
        wait: async function() {
            return new Promise(function(resolve) {
            setTimeout(resolve, 4000);
          });
        },
        startBattle: async function () {
            for (let row of ['firstrow', 'secondrow', 'thirdrow']) {
                for (let player of ['student', 'mentor']) {
                    console.log(this.battle[row][player]);
                       if (this.battle[row][player] === null ) {
                          this.battle[row][player] = this[player].hero
                    }
                    this.battlePhase = row;
                    this.getText(player)
                }
                await this.wait()
            }
            this.phase='student'
        },
        getText: function (player) {
            const rand = Math.floor(Math.random() * this[player].texts.length);
            this.battle[this.battlePhase][player].text = this[player].texts[rand];
            this[player].texts.splice(rand, 1)
        },
        nextPhase: function () {
            if (this.phase === 'student') this.phase='mentor';
            else if (this.phase === 'mentor') {
                this.phase='battle';
                this.startBattle()
            }
            else this.phase='student';
        },
    }
});





