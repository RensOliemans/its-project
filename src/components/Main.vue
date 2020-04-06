<template>
    <div id="main">
        <Input @onSubmit="onSubmit" />
    </div>
</template>

<script>
import Input from "@/components/Input";

export default {
    name: "Main",
    components: {
        Input
    },

    methods: {
        onSubmit(form) {
            console.log(form);
            alert(JSON.stringify(form));
        }
    }
}
</script>

<style scoped>

</style>