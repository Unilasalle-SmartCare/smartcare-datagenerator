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
        estatisticaHora: {
            qtdStress: 0,
            qtdHoras: 0,
            qtdNormal: 0,
        },
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

                appVue.estatisticaHora.qtdStress = _.filter(_.uniqBy(dados, 'date'), function(o) {
                    if (o.stress === true) return o;
                }).length;
                appVue.estatisticaHora.qtdNormal = _.filter(_.uniqBy(dados, 'date'), function(o) {
                    if (o.stress === false) return o;
                }).length;
                appVue.estatisticaHora.qtdHoras = _.uniqBy(dados, 'date').length;
            }
        },
        setStress(){
            debugger
            if(dados){
                for(i=0; i<dados.length; i++){
                    if(dados[i].date === appVue.data){
                        dados[i].stress = appVue.estressado;
                    }
                }
            }
        },
        datasOrdenadas(){
            if(this.datas.length){
                var index = this.datas.indexOf(this.data);
                var d = this.datas.slice();
                if (index > -1) {
                    d.splice(index, 1);
                    return d.sort()
                } else{
                    return this.datas
                }
            } else {
                return []
            }
        },
        save(){
            swal({
                title: "Deseja salvar?",
                text: "As atividades salvas podem ser carregadas posteriormente com o arquivo JSON gerado!",
                icon: "info",
                buttons: true,
                dangerMode: false,
              })
              .then((salvar) => {
                if (salvar) {
                    if(dados){
                        dados = _.sortBy(dados, 'date');
                        json = JSON.stringify(dados);
                        saveJSON(JSON.stringify(dados), 'dados.json');
                    }
                  swal("Pronto! O arquivo foi salvo com sucesso", {
                    icon: "success",
                  });
                } else {
                    return;
                }
              });
            e.preventDefault();
            return false;
        },
        uploadFundo(){
            $('#fileInputImg').trigger('click');
        },
        deletarDados(){
            swal({
                title: "Tem certeza?",
                text: "Uma vez deletado, você não pode recuperar os dados de atividade",
                icon: "warning",
                buttons: {
                    cancel: "Cancelar",
                    deletarHora: {
                        text: "Deletar Hora",
                        value: "deletahora"
                    },
                    deletarTudo: {
                        text: "Deletar Tudo",
                        value: "deletatudo"
                    }
                },
                dangerMode: true,
              })
              .then((value) => {
                  switch(value){
                    case "deletahora":
                        swal(`Os dados de atividade do idoso de ${appVue.data} foram deletados!`, {
                            icon: "success",
                        });
                        _.remove(dados, {date: appVue.data});
                        appVue.qtdRegistros = 0
                        appVue.qtdStress = 0
                        appVue.qtdNormal = 0
                        appVue.datas.sort()
                        for(i in dados){
                            if(!isNaN(parseInt(i))){
                            appVue.qtdRegistros++
                            if(dados[i].stress){
                                appVue.qtdStress++
                            } else {
                                appVue.qtdNormal++ 
                            }
                            }
                        }
                        appVue.mediaPontos = (appVue.qtdRegistros / dados.map(x => x.date).unique().length).toFixed(2)
                        if(!isFinite(appVue.mediaPontos)){
                            appVue.mediaPontos = 0
                        }
                        let pontos = _.countBy(dados, 'date');
                        let min = _.minBy(_.entries(pontos), 1)
                        let max = _.maxBy(_.entries(pontos), 1)
                        if(min.length){
                            appVue.minPontos = min[1]
                        }
                        if(max.length){
                            appVue.maxPontos = max[1]
                        }
            
                        appVue.estatisticaHora.qtdStress = _.filter(_.uniqBy(dados, 'date'), function(o) {
                            if (o.stress === true) return o;
                        }).length;
                        appVue.estatisticaHora.qtdNormal = _.filter(_.uniqBy(dados, 'date'), function(o) {
                            if (o.stress === false) return o;
                        }).length;
                        appVue.estatisticaHora.qtdHoras = _.uniqBy(dados, 'date').length;
                        this.onTrocaData()

                        this.datas = this.datas.filter(function(e) { return e !== appVue.data })

                        break;
                    case "deletatudo":
                        swal("Os dados de atividade do idoso foram deletados!", {
                            icon: "success",
                          });
                          dados = [];
                          appVue.qtdRegistros = 0;
                          appVue.qtdStress = 0;
                          appVue.qtdNormal = 0;
                          appVue.estatisticaAtual.qtdStress = 0;
                          appVue.estatisticaAtual.qtdNormal = 0;
                          appVue.estatisticaAtual.qtdRegistros = 0;
                        break;
                  }

              });
        },
        uploadJson(){
            $('#fileInputJson').trigger('click');
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