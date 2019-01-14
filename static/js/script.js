

var app = new Vue({
    el: '#game',
    data: {
        macilaci: 'Maci nem laci!',
        stock1: ['heroe1', 'heroe2', 'heroe3'],
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
        selectCard: function (index) {
            this.selectedCard = this.stock1[index];
            this.stock1.splice(index,1)
        },
        moveCard: function (key) {
            this.playedcard1[key] = this.selectedCard;
            console.log(this.selectedCard);
            this.selectedCard = ''
        }
    }
});





