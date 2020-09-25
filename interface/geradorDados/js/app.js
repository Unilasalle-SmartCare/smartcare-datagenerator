appVue = new Vue({
    el: '#appVue',
    data: {
        data: moment().format("DD/MM/YYYY HH:00"),
        datas: [],
        estressado: false,
        config: {
            format: 'DD/MM/YYYY HH:00'
        },
        qtdRegistros: 0,
        qtdStress: 0,
        qtdNormal: 0,
        mediaPontos: 0,
        minPontos: 0,
        maxPontos: 0,
        mostraDatas: false
    },
    computed: {
        date(){
                let date = moment(this.data, "DD/MM/YYYY HH:00");
                if(date.isValid()){
                    return date.format("DD/MM/YYYY HH:00")
                } else{
                    return null
                }
        },
    },
  })