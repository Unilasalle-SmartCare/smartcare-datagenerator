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
        mostraDatas: false,
        estatisticaAtual: { // Estatísticas da data atual
            qtdRegistros : 0,
            qtdStress: 0,
            qtdNormal: 0,
        }
    },
    methods: {
        onTrocaData(){
            if(dados){
                let a = dados.find(obj => obj.date === appVue.date)
                if(a){
                    appVue.estressado = a.stress
                }
                appVue.estatisticaAtual.qtdStress = 0;
                appVue.estatisticaAtual.qtdNormal = 0;

                var estatisticaAtualStress = _.filter(dados, function(o) {
                    if (o.date === appVue.data && o.stress == true) return o;
                });
                appVue.estatisticaAtual.qtdStress = estatisticaAtualStress.length || 0;

                var estatisticaAtualNormal = _.filter(dados, function(o) {
                    if (o.date === appVue.data && o.stress == false) return o;
                });
                appVue.estatisticaAtual.qtdNormal = estatisticaAtualNormal.length || 0;



                var estatisticaAtualPontos = _.filter(dados, function(o) {
                    if (o.date === appVue.data) return o;
                });
                appVue.estatisticaAtual.qtdRegistros = estatisticaAtualPontos.length || 0;
            }
        }
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