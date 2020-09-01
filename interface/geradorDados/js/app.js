appVue = new Vue({
    el: '#appVue',
    data: {
        data: "",
        datas: [],
        estressado: false,
    },
    mounted(){
    },
    computed: {
        date(){
            let date = moment(this.data)
            if(date.isValid()){
                return date.format("DD-MM-YYYY h:00")
            } else{
                return null
            }
        }
    }
  })