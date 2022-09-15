<template>
    <div>
        <b-input type="text" placeholder="Digite a Empresa aqui" v-model="query" v-on:keyup="autoComplete" class="form-control">  
        </b-input>
        <div class="panel-footer" v-if="results.length">
            <ul class="list-group">
            <li class="list-group-item" v-for="result in results" :key="result.ID_EMPRESA">
            {{ result.NOME }}
            </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            query: '',
            results: []
        }
    },
    methods: {
        autoComplete(){
            this.results = [];
            if(this.query.length > 2){
                this.$http.get('/autoCompleteEmpresa',{params: {search: this.query}}).then(response => {
                this.results = response.data;
            });
        }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>