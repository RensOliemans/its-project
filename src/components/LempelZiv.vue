<template>
    <div id="LempelZiv">
        <b-row>
            <b-col>
                <h1>Calculator</h1>
                <b-button variant="primary" size="lg" @click="encodeAndDecode">Calculate</b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <p>Received input:<br />
                    {{ this.input }}</p>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <p>Encoded input:<br />
                    {{ this.encoded }}</p>
            </b-col>
            <b-col>
                <p>Output:<br />
                    {{ this.decoded }}</p>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        name: "LempelZiv",

        props: {
            input: String,
            reset: Number,
        },

        data() {
            return {
                encoded: '',
                decoded: '',
            }
        },

        watch: {
            'reset': function() {
                this.encoded = '';
                this.decoded = '';
            }
        },

        methods: {
            encodeAndDecode() {
                if (this.input) {
                    this.encoded = this.encode(this.input);
                    this.decoded = this.decode(this.encoded);
                    this.encode2(this.input);
                }
            },
            encode2(s) {
                if (!s)
                    return;

                const eof = "Q";
                let dict = {};
                let start = 1;
                let data = (s + eof).split("");
                let currChar;
                let phrase = data[0];

                let i = 0;
                while (i <= data.length) {
                    currChar = data[i];
                    if (dict[phrase] == null) {
                        dict[phrase] = {'index': start, 'previous': 0};
                        phrase = currChar;
                        start++;
                        i++;
                    } else {
                        if (dict[phrase + currChar] == null) {
                            dict[phrase + currChar] = {'index': start, 'previous': dict[phrase]['index']};
                            phrase = currChar;
                            start++;
                            i++;
                        } else {
                            phrase += currChar;
                        }
                    }
                }

                for (let i = 1; i <= data.length; i++) {
                    currChar = data[i];
                    if (dict[phrase] == null) {
                        dict[phrase] = 0;
                        start++;
                    } else {
                        phrase += currChar;
                        if (dict[phrase] != null) {
                            dict[phrase + currChar] = start;
                            start++;
                        }
                    }

                    console.log(JSON.stringify(dict));
                }
            },
            encode(s) {
                if (!s)
                    return;
                var dict = {};
                var data = (s + "").split("");
                var out = [];
                var currChar;
                var phrase = data[0];
                var code = 256;
                var i, l;
                for (i = 1, l = data.length; i < l; i++) {
                    currChar = data[i];
                    if (dict[phrase + currChar] != null) {
                        phrase += currChar;
                    } else {
                        out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
                        dict[phrase + currChar] = code;
                        code++;
                        phrase = currChar;
                    }
                }
                out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
                for (i = 0, l = out.length; i < l; i++) {
                    out[i] = String.fromCharCode(out[i]);
                }
                return out.join("");
            },
            decode(s) {
                if (!s)
                    return;
                var dict = {};
                var data = (s + "").split("");
                var currChar = data[0];
                var oldPhrase = currChar;
                var out = [currChar];
                var code = 256;
                var phrase;
                for (var i = 1; i < data.length; i++) {
                    var currCode = data[i].charCodeAt(0);
                    if (currCode < 256) {
                        phrase = data[i];
                    } else {
                        phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
                    }
                    out.push(phrase);
                    currChar = phrase.charAt(0);
                    dict[code] = oldPhrase + currChar;
                    code++;
                    oldPhrase = phrase;
                }
                return out.join("");
            }
        }
    }
</script>

<style scoped>

</style>