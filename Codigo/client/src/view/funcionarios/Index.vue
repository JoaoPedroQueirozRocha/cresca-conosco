<template>
    <div class="flex flex-col w-full mt-[3em]">
        <div class="w-fullflex flex-col gap-3">
            <div class="mb-3">
                <div class="flex flex-row w-full justify-between align-middle">
              
                    <h2 class="text-[2.5em] font-bold">Funcionario</h2>  
                    <div class="flex flex-row flex wrap gap-2 content-center">
                        <Button>Adicionar</Button>
                    </div>

                </div>

                <div class="w-full flex flex-row justify-between">
                    <div>
                        <Input type="search" class="bg-white" />
                    </div>
                    <div>
                        <span class="material-symbols-rounded round-icon">
                        filter_list
                        </span>
                    </div>
                </div>
            </div>

            <Table :items="funcionariodata" :headers="headers" class="w-full">
                <template #actions="{item,index}">
                <td class="w-2 cursos-pointer action">
                    <span class="material-symbols-rounded" @click="positionCard(item, index)">
                  
                    </span>
                    <Card :ref="'card' + index" class="fixed" v-show="item.expanded" tabindex="0" @blur="item.expanded = false">
                    
                    </Card>
                </td>
                </template>
                <template #nome="{item,index}">
                    <td> {{ item.nome }} </td>
                </template>

                <template #salario="{item,index}">
                    <td> {{ item.salario }} </td>
                </template>

                <template #cargo="item,index">
                    <td>{{ item.cargo }}</td>
                </template>

                <template #clt="{item,index}">
                    <td>{{ item.clt }}</td>
                </template>

            </Table>
            <Dialog v-model="moreDetails">
                <DialogTable :headers="headersDialog" :allData="allData" />
            </Dialog>
            
        </div>
    </div>
</template>
<script>
import { ref } from "vue";
import  Button  from "@/components/Button.vue";
import Card from "@/components/Card.vue";
import Input from "@/components/Input.vue";
import Table from "@/components/Table.vue";
import DialogTable from "./DialogTable.vue";

import { useFetchs } from "./useFetchs.js";


export default {
    name: "Funcionario",
    components:{
        Button, Card, Input, Table, DialogTable,
    },
    setup(){  
        const funcionariodata = ref([]);
        const allData = ref([]);
        const { getBaseData } = useFetchs(funcionariodata);

        return {
            funcionariodata,
            allData,

            
        };
    },
};
</script>
<style lang=""></style>