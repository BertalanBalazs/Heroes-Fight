

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
            this[player].selectedCard = this[player].stock.find(heroe => heroe.id === id);
            let index = this[player].stock.findIndex(element => element.id === id); //gives back the index of the selected card
            this[player].stock.splice(index,1)
        },
        moveCard: function (id, player) {
            if (this.phase !== player) return;
            this[player].playedCard[id] = this[player].selectedCard;
            this.battle[id][player] = this[player].selectedCard
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
                    console.log(this.battle[row][player])
                       if (this.battle[row][player] === null ) {
                           console.log('maci')
                          this.battle[row][player] = this[player].hero
                    }
                    this.battlePhase = row
                    this.getText(player)
                }
                await this.wait()
            }
        },
        getText: function (player) {
            const rand = Math.floor(Math.random() * this[player].texts.length)
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
        waitTime: function (ms) {
            const start = new Date().getTime()
            let end = start
            while (end < start + ms) {
                end = new Date().getTime()
            }
        }
    }
});





