<template>
    <div class="custom-input">
        <label>{{ label }}</label>
        <input :value="internalValue" @input="updateValue" :type="type" :placeholder="placeholder" />
    </div>
</template>

<script>
export default {
    props: {
        value: String,
        label: String,
        type: {
            type: String,
            default: 'text'
        },
        placeholder: String
    },
    data() {
        return {
            internalValue: this.value
        };
    },
    methods: {
        updateValue(event) {
            this.internalValue = event.target.value;
            this.$emit('input', this.internalValue);
        }
    }
};
</script>

<style scoped>
.custom-input {
    margin-bottom: 20px;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
</style>
