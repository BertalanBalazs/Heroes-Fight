

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
        winner: '',
        turn: 1,
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
                battleSound: 'static/media/soundeffects/punch_08.mp3',
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
            manaPool: 0,
            leftoverMana: 1,
            texts: texts.mentor,
            heroSrc : 'static/media/mentor.png',
            hero: {
                id: 'heroMentor',
                name: 'Mentor',
                src: 'mentor',
                battleSound: 'static/media/soundeffects/punch_08.mp3',
                hp: 20,
                attack: 0,
            },
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
            let selectedHero = this[player].stock.find(hero => hero.id === id);
            if (selectedHero.mana<=this[player].leftoverMana) {
                this[player].selectedCard = selectedHero;
                //gives back the index of the selected card
                let index = this[player].stock.findIndex(element => element.id === id);
                this[player].stock.splice(index, 1)
            }
        },
        moveCard: function (row, player) {
            if (this.phase !== player) return;
            else if (this[player].playedCard[row] === '' && this[player].leftoverMana>=this[player].selectedCard.mana) {

                this[player].leftoverMana -= this[player].selectedCard.mana;
                this[player].playedCard[row] = this[player].selectedCard;
                this.battle[row][player] = this[player].selectedCard;
                this[player].selectedCard = ''
            } else console.log('Wrong place');
        },
        wait: async function(ms=4000) {
            return new Promise(function(resolve) {
            setTimeout(resolve, ms);
          });
        },
        startBattle: async function () {
            for (let row of ['firstrow', 'secondrow', 'thirdrow']) {
                for (let player of ['student', 'mentor']) {
                       if (this.battle[row][player] === null ) {
                          this.battle[row][player] = this[player].hero
                    }
                    this.battlePhase = row;
                    this.getText(player);
                    var audio = new Audio(this.battle[row][player].battleSound);
                    audio.play();
                    console.log(this.battle[row][player].battleSound)
                }
                await this.wait(3000)
                this.fight(row)
                await this.wait(3000)
            }
            this.endTurn()
        },
        getText: function (player) {
            if (this[player].texts.length <= 0) {
                this[player].texts = texts[player]
            }
            const rand = Math.floor(Math.random() * this[player].texts.length);
            this.battle[this.battlePhase][player].text = this[player].texts[rand];
            this[player].texts.splice(rand, 1)
        },
        endTurn: function() {
            console.log(this.phase)
            this.turn++
            if (this.turn % 2 === 0) this.phase = 'mentor'
            else this.phase = 'student'
            console.log(this.phase)
            this.mentor.leftoverMana = this.mentor.leftoverMana + this.turn
            this.student.leftoverMana = this.student.leftoverMana + this.turn

        },
        fight: function(row) {
            this.battle[row].student.hp = this.battle[row].student.hp - this.battle[row].mentor.attack
            this.battle[row].mentor.hp = this.battle[row].mentor.hp - this.battle[row].student.attack
            if (this.mentor.hero.hp <= 0) {
                this.endGame('student')
                return
            }
            if (this.student.hero.hp <= 0) {
                this.endGame('mentor')
                return
            }
            if (this.battle[row].student.hp <= 0){
                this.battle[row].student = null
                this.student.playedCard[row] = ''
            }
            if (this.battle[row].mentor.hp <= 0){
               this.battle[row].mentor = null
                this.mentor.playedCard[row] = ''
            }
        },
        endGame: function(winner) {
            this.winner = winner
            $('#myModal').modal('show')
        },
        nextPhase: function () {
            if (this.phase === 'mentor' && this.turn % 2 === 0) {
                this.phase='student'

            } else if (this.phase === 'student' && this.turn % 2 !== 0) {
                this.phase='mentor';
            }
            else {
                this.phase='battle';
                this.startBattle()
            }
        }
    }
});




