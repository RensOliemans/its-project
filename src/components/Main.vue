<template>
    <div id="main">
        <Input @onSubmit="onSubmit" />
        <LempelZiv :input="msg"/>
    </div>
</template>

<script>
import Input from "@/components/Input";
import LempelZiv from "@/components/LempelZiv";

export default {
    name: "Main",
    components: {
        Input,
        LempelZiv
    },

    data() {
        return {
            msg: ""
        }
    },

    methods: {
        onSubmit(form) {
            console.log(form);
            this.msg = JSON.stringify(form)['input'];
            alert(JSON.stringify(form));
        }
    }
}
</script>

<style scoped>

</style>