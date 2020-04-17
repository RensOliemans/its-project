<template>
    <div>
        <h1>Lempel-Ziv visualisation</h1>
        <p>Enter some binary code and press "Start Encoding" and see how Lempel-Ziv works!</p>

        <b-button class="mb-2" variant="outline-warning" @click="makeExplanationToast()">
            Lempel-Ziv?
        </b-button>


        <div class="dropdown-divider"></div>
    </div>
</template>

<script>
    export default {
        name: "Front",
        methods: {
            makeExplanationToast() {
                this.$bvToast.toast(
                    "Lempel-Ziv is a compression algorithm, variants of which are used in GIF, PNG, and ZIP.\n" +
                    "It replaces repeated occurrences of data with references to that data.\n", {
                    title: 'Lempel-Ziv',
                    appendToast: true
                });
            }
        }
    }
</script>

<style scoped>

</style>