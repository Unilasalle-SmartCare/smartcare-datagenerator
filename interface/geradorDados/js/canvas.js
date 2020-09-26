dados = []
img = null
Array.prototype.unique = function() {
    return this.filter(function (value, index, self) {
      return self.indexOf(value) === index;
    });
  };
function setup() {
    
    c = createCanvas(602, 369);
    c.parent("canvaswrapper") 
    c.doubleClicked(doubleClick)
    inputFundo = createFileInput(handleImage);
    inputFundo.id("fileInputImg")
    inputFundo.addClass("inputfile")
    inputFundo.parent("fileWrapper");
    inputJson = createFileInput(handleJSON);
    inputJson.id("fileInputJson")
    inputJson.addClass("inputfile")
    inputJson.parent("jsonWrapper");

    img = loadImage("img/fundo.jpg");
  }
  function handleImage(file) {
    if (file.type === 'image') {
      img = loadImage(file.data);
    } else {
      img = null;
    }
  }
  function handleJSON(file){
      try {
        if (file.type === 'application') {
            json = JSON.parse(file.data);
            dados = json;
            datas = dados.filter((value, index, self) => {
                return self.findIndex(v => v.date === value.date) === index;
            })
            appVue.datas= [];
            for (i in datas){
                appVue.datas.push(datas[i].date)
            }
            appVue.datas.sort()
            for(i in dados){
                appVue.qtdRegistros++
                if(dados[i].stress){
                    appVue.qtdStress++
                } else {
                    appVue.qtdNormal++ 
                }
            }
            appVue.mediaPontos = (appVue.qtdRegistros / dados.map(x => x.date).unique().length).toFixed(2)
            let pontos = _.countBy(dados, 'date');
            appVue.minPontos = _.minBy(_.entries(pontos), 1)[1]
            appVue.maxPontos = _.maxBy(_.entries(pontos), 1)[1]

        }
      } catch (error) {
          console.log(error)
      }
  }

function drawCaminho(){
    var contador=0;
    try {
        for(let i = 0; i< dados.length; i++){
            element = dados[i]
            if(dados[i].date == appVue.date){
                dados[i].stress = appVue.estressado;
                chaves = dados.map(el => el.date)
                if(contador == 0){
                    fill(color(0, 255, 0))
                } else if (i >= chaves.lastIndexOf(dados[i].date)){
                    fill(color(255, 0, 0))
                } else {
                    fill(color(255, 204, 0));
                }
            circle(element.x, element.y, 10, 10) 
    
            if(i+1 < dados.length && dados[i].date == dados[i+1].date){
                line(element.x, element.y, dados[i+1].x, dados[i+1].y);
                fill(color(0, 0, 0));
            }
            contador+=1
            } else{
            contador=0
            }
        } 
    } catch (error) {
        console.log(error)
    }

}
  
function draw() {
    background(img);
    fill(color(255, 204, 0, .7));
    ellipse(mouseX, mouseY, 10, 10);
    drawCaminho()
}

function adicionaPonto(data, x, y, stress){
    dados.push({
        date: data,
        x: x,
        y: y,
        stress: stress || false
    })
  dados =  _.sortBy(dados, 'date');
  appVue.qtdRegistros++
  appVue.mediaPontos = (appVue.qtdRegistros / dados.map(x => x.date).unique().length).toFixed(2)
  let pontos = _.countBy(dados, 'date');
  appVue.minPontos = _.minBy(_.entries(pontos), 1)[1]
  appVue.maxPontos = _.maxBy(_.entries(pontos), 1)[1]

  appVue.qtdStress = 0;
  appVue.qtdNormal = 0;
  appVue.estatisticaAtual.qtdStress = 0;
  appVue.estatisticaAtual.qtdNormal = 0;
  appVue.estatisticaAtual.qtdNormal = 0;


  for(i in dados){
    if(!isNaN(parseInt(i))){
    if(dados[i].stress){
        appVue.qtdStress++
        if(dados[i].date == appVue.data){
            appVue.estatisticaAtual.qtdStress++
        }
    } else {
        
        appVue.qtdNormal++ 
        if(dados[i].date == appVue.data){
           appVue.estatisticaAtual.qtdNormal++ 
        }
    }
    }
  }

  var estatisticaAtualPontos = _.filter(dados, function(o) {
    if (o.date === appVue.data) return o;
});
  appVue.estatisticaAtual.qtdRegistros = estatisticaAtualPontos.length || 0;
}

function doubleClick() {
    let stress = appVue.estressado
    if(appVue.date && mouseX && mouseY && typeof stress === "boolean") {
        isDataNova = !dados.some(el => el.date == appVue.date)
        if(isDataNova){
            appVue.datas.push(appVue.date)
            appVue.datas.sort()
        }
        adicionaPonto(appVue.date, mouseX, mouseY, stress)
    } else{
        console.log(appVue.date)
        console.log(mouseX)
        console.log(mouseY)
        console.log(typeof stress === "boolean")
    }
    return false;
}

function keyPressed() {
    switch(keyCode){
        case BACKSPACE:
            swal({
                title: "Tem certeza?",
                text: "Uma vez deletado, você não pode recuperar os dados de atividade",
                icon: "warning",
                buttons: true,
                dangerMode: true,
              })
              .then((deletar) => {
                if (deletar) {
                  swal("Os dados de atividade do idoso foram deletados!", {
                    icon: "success",
                  });
                  dados = [];
                } else {
                    return;
                }
              });
            break;
    }
    return false;
}

function salvarDados(){
    dados = _.sortBy(dados, 'date');
    json = JSON.stringify(dados);
    saveJSON(JSON.stringify(dados), 'dados.json');
}

$(document).on('keydown', function(e){
    if(e.ctrlKey && e.which === 83){
        swal({
            title: "Deseja salvar?",
            text: "As atividades salvas podem ser carregadas posteriormente com o arquivo JSON gerado!",
            icon: "info",
            buttons: true,
            dangerMode: false,
          })
          .then((salvar) => {
            if (salvar) {
              salvarDados()
              swal("Pronto! O arquivo foi salvo com sucesso", {
                icon: "success",
              });
            } else {
                return;
            }
          });
        e.preventDefault();
        return false;
    }
});