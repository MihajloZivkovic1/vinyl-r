<template>
    <div class="mb-3">
        <label v-if="label" class="form-label">{{ label }}</label>
        <div class="form-check" v-for="item in items" :key="item[valueProperty]">
        <input class="form-check-input" v-model="localItems" :value="item[valueProperty]" :id="item[TextProperty]" type="checkbox" checked>
        <label :for="item[textProperty]" class="form-check-label">Option 1</label>
        </div>
        <div v-if="showHint" id="emailHelp" class="form-text">{{ hint }}</div>
            <div v-if="error" class="alert p-1 mt-2 alert-danger" role="alert">
                {{ error }}
        </div>
    </div>
</template>

<script>

    export default{
        name:"CheckBoxList",
        data(){
            return{
                localItems:[]
            }
        },
        props:{
            error: {
            type: String
        },
        value: {
            type: Array
        },
        textProperty: {
            type: String,
            default: "text"
        },
        valueProperty: {
            type: String,
            default: "value"
        },
        label: {
            type: String,
            default: ""
        },
        items: {
            type: Array,
            required: true
        },
        hint: {
            type: String,
            default: ""
        },
        id: {
            type: String
        },
    },
    mounted(){
        this.localItems = this.value
    },
    computed:{
        style:function(){
            return this.error ? "border 1px solid red" : "";
        },
        showHint:function(){
            return !this.error & this.hint
        }
    },
    watch:{
        localItems:function(){
            this.$emit("input",this.localItems)
        }
    }
}
</script>