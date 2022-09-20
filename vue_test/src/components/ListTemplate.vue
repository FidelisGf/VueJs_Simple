
<template>
    <div>
        <b-row>
            <b-col cols="12">
                <table class="table mt-5 table-responsive-lg">
                     <thead>
                        <th v-for="col in columns" :key="col.name">{{ col.title }}</th>
                        <th>Editar</th>
                      </thead>
                      <tbody>
                        <tr v-for="(row, index) in listagem" :key="index"> 
                          <td v-for="col in columns" :key="col.name">
                            <slot :value="row[col.name]">{{row[col.name]}}</slot>
                          </td>
                          <td><router-link :to="{name: edit , params: {id: row.ID}}"><b-button variant="outline-success">Editar</b-button></router-link></td>
                        </tr>
                      </tbody>
                </table>
            </b-col>
        </b-row>
    </div>
</template>

<script>

export default {
    props:{
        listagem:{
            type:[Array,Object],
            required:true,
        },
        columns: Array,
        edit : String
       
    },
    data() {
        
        return {
          
        };
    },
}
</script>

<style>
    body { overflow-x: hidden; }
    .body-table{
        width: 100%;
    }
    .raise:hover,
    .raise:focus {
        box-shadow: 0 0.5em 0.5em -0.4em var(--hover);
        transform: translateY(-0.25em);
    }
    .btn{
        margin-left: 10px;
    }
    .select{
        width: 25%;
        font-size: 14px;
    }
    .input-btn{
        width: 10%;
    }
    .result_auto{
        padding: 0;
        margin: 0;
        border: 1px solid #eeeeee;
        height: 40px;
        font-size: 12px;
        min-height: 1em;
        max-height: 6em;    
        overflow: auto;
    }
    .result_auto{
        list-style: none;
        text-align: left;
        padding: 4px 2px;
        cursor: pointer;
    }
    .result_auto{
        background-color: #4AAE9B;
        color: white;
    }
    .form-control {
        position: relative;
    }
</style>