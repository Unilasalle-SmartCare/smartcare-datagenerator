dados = []
img = null
Array.prototype.unique = function() {
    return this.filter(function(value, index, self) {
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
    try {
        if (file.type === 'image') {
            img = loadImage(file.data);
        } else {
            img = null;
        }
    } catch (error) {
        appVue.geraErro(`Houve um erro ao carregar a imagem (0x16) - ${error}`)
    }
}

function handleJSON(file) {
    try {
        if (file.type === 'application') {
            json = JSON.parse(file.data);
            dados = json;
            datas = dados.filter((value, index, self) => {
                return self.findIndex(v => v.date === value.date) === index;
            })
            appVue.datas = [];
            for (i in datas) {
                appVue.datas.push(datas[i].date)
            }
            appVue.datas.sort()
            for (i in dados) {
                appVue.qtdRegistros++
                if (dados[i].stress) {
                    appVue.qtdStress++
                } else {
                    appVue.qtdNormal++
                }
            }
            appVue.mediaPontos = (appVue.qtdRegistros / dados.map(x => x.date).unique().length).toFixed(2)
            let pontos = _.countBy(dados, 'date');
            appVue.minPontos = _.minBy(_.entries(pontos), 1)[1]
            appVue.maxPontos = _.maxBy(_.entries(pontos), 1)[1]

            appVue.estatisticaHora.qtdStress = _.filter(_.uniqBy(dados, 'date'), function(o) {
                if (o.stress === true) return o;
            }).length;
            appVue.estatisticaHora.qtdNormal = _.filter(_.uniqBy(dados, 'date'), function(o) {
                if (o.stress === false) return o;
            }).length;
            appVue.estatisticaHora.qtdHoras = _.uniqBy(dados, 'date').length;
        }
    } catch (error) {
        appVue.geraErro(`Houve um erro ao carregar os dados (0x69) - ${error}`)
    }
}

function drawCaminho() {
    var contador = 0;
    try {
        for (let i = 0; i < dados.length; i++) {
            element = dados[i]
            if (dados[i].date == appVue.date) {
                dados[i].stress = appVue.estressado;
                chaves = dados.map(el => el.date)



                if (i + 1 < dados.length && dados[i].date == dados[i + 1].date) {
                    fill(color(38, 50, 56));
                    strokeWeight(2);
                    line(element.x, element.y, dados[i + 1].x, dados[i + 1].y);

                }
                if (contador == 0) {
                    strokeWeight(1.5);
                    stroke(27, 94, 32);
                    fill(color(205, 220, 57))
                } else if (i >= chaves.lastIndexOf(dados[i].date)) {
                    strokeWeight(1.5);
                    stroke(213, 0, 0);
                    fill(color(244, 67, 54))
                } else {
                    strokeWeight(1.5);
                    stroke(230, 81, 0);
                    fill(color(255, 238, 88));
                }
                circle(element.x, element.y, 12, 12)
                strokeWeight(1);

                if (appVue.estressado) {
                    strokeWeight(2);
                    stroke(244, 67, 54)
                } else {
                    strokeWeight(2);
                    stroke(0);
                }
                contador += 1
            } else {
                contador = 0
            }
        }
    } catch (error) {
        appVue.geraErro(`Houve um erro ao renderizar os caminhos (0x06) - ${error}`)
    }

}

function draw() {
    background(img);
    fill(color(255, 204, 0, .7));
    ellipse(mouseX, mouseY, 12, 12);
    drawCaminho()
}

function adicionaPonto(data, x, y, stress) {
    try {
        dados.push({
            date: data,
            x: x,
            y: y,
            stress: stress || false
        })
        dados = _.sortBy(dados, 'date');
        appVue.qtdRegistros++
        appVue.mediaPontos = (appVue.qtdRegistros / dados.map(x => x.date).unique().length).toFixed(2)
        let pontos = _.countBy(dados, 'date');
        appVue.minPontos = _.minBy(_.entries(pontos), 1)[1]
        appVue.maxPontos = _.maxBy(_.entries(pontos), 1)[1]

        appVue.qtdStress = 0;
        appVue.qtdNormal = 0;
        appVue.estatisticaAtual.qtdStress = 0;
        appVue.estatisticaAtual.qtdNormal = 0;
        appVue.estatisticaAtual.qtdRegistros = 0;


        for (i in dados) {
            if (!isNaN(parseInt(i))) {
                if (dados[i].stress) {
                    appVue.qtdStress++
                    if (dados[i].date == appVue.data) {
                        appVue.estatisticaAtual.qtdStress++
                    }
                } else {

                    appVue.qtdNormal++
                    if (dados[i].date == appVue.data) {
                        appVue.estatisticaAtual.qtdNormal++
                    }
                }
            }
        }

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
    } catch (error) {
        appVue.geraErro(`Houve um erro ao adicionar um ponto (0x9e) - ${error}`)
    }
}

function doubleClick() {
    let stress = appVue.estressado
    if (appVue.date && mouseX && mouseY && typeof stress === "boolean") {
        isDataNova = !dados.some(el => el.date == appVue.date)
        if (isDataNova) {
            appVue.datas.push(appVue.date)
            appVue.datas.sort()
        }
        adicionaPonto(appVue.date, mouseX, mouseY, stress)
    } else {
        console.log(appVue.date)
        console.log(mouseX)
        console.log(mouseY)
        console.log(typeof stress === "boolean")
    }
    return false;
}

$(document).on('keydown', function(e) {
    if (e.ctrlKey && e.which === 83) {
        appVue.save();
    }
});