<template>
    <div>
      <b-input-group>
            <b-form-select  v-model="selected" :options="options" class="select" ></b-form-select>
            <b-button @click="getSearch()" text="Button" variant="success">Aplicar</b-button>
      </b-input-group>
      <b-input type="text" placeholder="Digite a Empresa aqui" v-model="query" v-on:keyup="autoComplete" class="form-control w-100"> </b-input>
      <div class="panel-footer" v-if="results.length">
        <b-list-group v-for="result in results" :key="result.ID_EMPRESA">
            <b-list-group-item>{{ result.NOME }}</b-list-group-item>
        </b-list-group>
      </div>
      
    </div>
</template>

<script>
import { EventBus } from '@/main';

    /* eslint-disable */
export default {
    data(){
        return {
            query: '',
            results: [],
            selected: null,
            listagem: [],
            options: [
                { value: "/empresas?page=", text: "Sem Filtro" },
                { value: "BYNAME", text: "Por nome" },
                { value: "b", text: "Nao sei" },
                { value: { C: "3PO" }, text: "This is an option with object value" },
                { value: "d", text: "This one is disabled", disabled: true }
            ]
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
        },
        async getSearch(page) {
            this.total = this.page + 1;
            const res = await this.$http.get("/searchEmp?page=" + this.page + "&total=" + this.total, { params: { search: this.query, selected: this.selected } });
            this.listagem = res.data.data;
            EventBus.$emit("getSearch", this.listagem);
        },
    },
  }
</script>

<style lang="scss" scoped>

</style>