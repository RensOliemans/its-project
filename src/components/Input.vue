<template>
    <div id="input">
        <h1>Input</h1>
        <b-form @reset="onReset" v-if="show">
            <b-form-group
                    id="input-grp-1"
                    label="Enter text"
                    label-for="text-input"
            >
                <b-form-textarea
                        id="text-input"
                        v-model="form.input"
                        required
                        rows="3"
                        max-rows="6"
                        placeholder="Input binary string"></b-form-textarea>
            </b-form-group>
            <b-button-group vertical>
                <b-button type="reset" variant="danger">Reset</b-button>
            </b-button-group>
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

        watch: {
            'form.input': function() {
                if (this.form.input && this.validate(this.form.input)) {
                    // let binaryInput = this.computeOutput(this.form.input);
                    this.$emit('onSubmit', this.form.input);
                } else {
                    this.$emit('onSubmit', 'Enter a binary string');
                }
            }
        },

        methods: {
            onReset(evt) {
                evt.preventDefault();
                this.form.input = '';
                this.$emit('reset');
            },
            validate(input) {
                return input.search(/^[01]+$/) !== -1;
            },
            computeOutput(input) {
                let output = "";
                for (let i = 0; i < input.length; i++) {
                    let binary = input[i].charCodeAt(0).toString(2);
                    output += new Array(9 - binary.length).join('0') + binary;
                }
                return output;
            }
        }
    }
</script>

<style scoped>

</style>