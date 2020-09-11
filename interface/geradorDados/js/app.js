appVue = new Vue({
    el: '#appVue',
    data: {
        data: moment().format("DD/MM/YYYY HH:00"),
        datas: [],
        estressado: false,
        config: {
            format: 'DD/MM/YYYY HH:00'
        }
    },
    mounted(){
    },
    computed: {
        date(){
                let date = moment(this.data, "DD/MM/YYYY HH:00")
                if(date.isValid()){
                    return date.format("DD/MM/YYYY HH:00")
                } else{
                    return null
                }
        }
    }
  })