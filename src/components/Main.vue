<template>
    <div id="main">
        <b-container>
            <Front />
            <Input @onSubmit="onSubmit" @reset="resetAll" />
            <LempelZiv :input="msg" :reset="reset" />
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
            reset: 0
        }
    },

    methods: {
        onSubmit(input) {
            this.msg = input;
        },
        resetAll() {
            this.reset += 1;
        }
    }
}
</script>

<style scoped>

</style>