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
                <h3>Current Step</h3>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <p>Indices currently looking at:<br />
                   {{ this.currentLookingIndices }}</p>
            </b-col>
            <b-col>
                <p>Current state of dictionary:<br />
                   {{ this.dict }}</p>
            </b-col>
            <b-col>
                <b-button variant="secondary" @click="nextStep">Next Step</b-button>
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
                currentLookingIndices: 0,
                dict: [],
                doNextStep: false,
            }
        },

        watch: {
            'reset': function() {
                this.encoded = '';
                this.decoded = '';
                this.currentLookingIndices = 0;
                this.dict = [];
            }
        },

        methods: {
            encodeAndDecode() {
                if (this.input) {
                    this.encoded = this.encode(this.input);
                    this.decoded = this.decode(this.encoded);
                    this.encode3(this.input);
                }
            },
            async encode3(s) {
                const sleep = (milliseconds) => {
                    return new Promise(resolve => setTimeout(resolve, milliseconds));
                };
                let i = 0;
                let n = 1;
                let final_dict = {};
                let indices = {};
                let chars = s[i];
                let prev_index = 0;
                const eof = "Q";
                let data = (s + eof);
                let unmatched = 0;
                let result = [];
                while (i <= data.length) {
                    if (!this.doNextStep) {
                        await sleep(500);
                        continue;
                    }
                    this.doNextStep = false;
                    if (data[i] === eof) {
                        console.log('eof');
                        break;
                    }
                    console.log('i: ' + i);
                    console.log('chars: ' + chars);

                    let index_matched = this.find_first_match(indices, chars);
                    if (index_matched === 0) {
                        indices[n] = [prev_index, chars];
                        const lastChar = parseInt(chars[chars.length - 1]);
                        final_dict[n] = [prev_index, lastChar];
                        result.push([prev_index, lastChar]);
                        this.dict = result;
                        i += chars.length;
                        this.currentLookingIndices = i;
                        n += 1;
                        chars = data[i];
                        unmatched = 0;
                        prev_index = 0;
                    } else {
                        unmatched += 1;
                        prev_index = index_matched;
                        this.currentLookingIndices = i + '-' + (i + unmatched);
                        chars += data[i+unmatched];
                    }
                    console.log('indices: '+ JSON.stringify(indices));
                    console.log('dict: '+ JSON.stringify(final_dict));
                    console.log();
                }
                console.log('final indices:' + JSON.stringify(indices));
                console.log('final dict:   ' + JSON.stringify(final_dict));
                console.log('result:       ' + JSON.stringify(result));
            },
            find_first_match(indices, chars) {
                for (const [key, value] of Object.entries(indices)) {
                    if (chars === value[1]) {
                        console.log('match:' + key);
                        return key;
                    }
                }
                console.log('match:none');
                return 0;
            },
            nextStep() {
                this.doNextStep = true;
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