<template>
    <div id="main">
        <b-container fluid="xl">
            <Front />
            <Input @onSubmit="onSubmit" />
            <LempelZiv :input="msg" />
        </b-container>

    </div>
</template>

<script>
import Input from "@/components/Input";
import LempelZiv from "@/components/LempelZiv";
import Front from "@/components/Front";

export default {
    name: "Main",
    components: {
        Front,
        Input,
        LempelZiv
    },

    data() {
        return {
            msg: "",
        }
    },

    methods: {
        onSubmit(input) {
            this.msg = input;
        },
    }
}
</script>

<style scoped>

</style>