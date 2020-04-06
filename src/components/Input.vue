<template>
    <div id="input">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group
                id="input-grp-1"
                label="Enter text"
                label-for="text-input"
                >
                <b-form-input
                    id="text-input"
                    v-model="form.input"
                    required
                    placeholder="Input string"></b-form-input>
            </b-form-group>
            <b-button size="sm" type="light" @click="convert">Convert to binary</b-button>
            <br />

            <b-button type="submit" variant="primary">Start</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>

    </div>
</template>

<script>
    import 'bootstrap/dist/css/bootstrap.css';
    import 'bootstrap-vue/dist/bootstrap-vue.css';

    export default {
        name: "Input",

        data() {
            return {
                form: {
                    input: ''
                },
                show: true,
            }
        },

        methods: {
            onSubmit(evt) {
                evt.preventDefault();
                this.$emit('onSubmit', this.form)
            },
            onReset(evt) {
                evt.preventDefault();

                this.form.input = '';
            },
            convert(evt) {
                evt.preventDefault();
                let output = "";
                const input = this.form.input;
                for (let i = 0; i < input.length; i++) {
                    let binary = input[i].charCodeAt(0).toString(2);
                    output += new Array(9 - binary.length).join('0') + binary + " ";
                }
                this.form.input = output;
            }
        }
    }
</script>

<style scoped>

</style>