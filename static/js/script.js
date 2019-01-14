var app = new Vue({
    el: '#game',
    data: {
        macilaci: 'Maci nem laci!'
    },
    methods: {
        reverseMacilaci: function () {
            this.macilaci = this.macilaci.split('').reverse().join('')
        }
    }
});


