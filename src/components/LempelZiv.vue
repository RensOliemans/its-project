<template>
    <div id="LempelZiv">
        <div class="dropdown-divider"></div>
        <b-row>
            <b-col>
                <b-button variant="primary" size="lg" @click="encodeAndDecode">Start Calculating</b-button>
            </b-col>
            <b-col>
                <p>Received input:<br />
                    {{ this.input }}</p>
            </b-col>
        </b-row>
        <div class="dropdown-divider"></div>
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
                <p>Encoded input:<br />
                    {{ this.encoded }}</p>
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
                this.encoded = '';
                this.currentLookingIndices = 0;
                this.dict = [];
                if (this.input) {
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
                while (i < data.length) {
                    if (data[i] === eof) {
                        break;
                    }
                    if (!this.doNextStep) {
                        // Allow for calculating the result step-by-step.
                        await sleep(500);
                        continue;
                    }
                    this.doNextStep = false;

                    // Finds a match of the currently looking chars
                    let index_matched = this.find_first_match(indices, chars);
                    if (index_matched === 0) {
                        // Not found, save chars in dictionary
                        const lastChar = this.determineChar(chars[chars.length - 1]);
                        final_dict[n] = [prev_index, lastChar];
                        result.push([parseInt(prev_index), lastChar]);
                        indices[n] = [parseInt(prev_index), chars];

                        // Setup for next codeword
                        i += chars.length;
                        n += 1;
                        chars = data[i];
                        unmatched = 0;
                        prev_index = 0;

                        // Update props
                        this.dict = result;
                        this.currentLookingIndices = i;
                    } else {
                        // It was found, so look at the next char as well
                        unmatched += 1;
                        chars += data[i+unmatched];

                        prev_index = index_matched;

                        // Update props
                        this.currentLookingIndices = i + '-' + (i + unmatched);
                    }
                }

                // Neatly
                let concatenated = [].concat.apply([], result);
                if (concatenated[concatenated.length - 1] === 'eof') {
                    concatenated = concatenated.slice(0, concatenated.length - 1);
                }
                this.encoded = concatenated.join("");
            },
            find_first_match(indices, chars) {
                // This method finds 'chars' in the existing 'indices' (all previous matches)
                for (const [key, value] of Object.entries(indices)) {
                    if (chars === value[1]) {
                        return key;
                    }
                }
                return 0;
            },
            determineChar(char) {
                // Returns 'eof' if the char is end-of-file, otherwise parsed int
                if (char === 'Q') {
                    return 'eof'
                }
                return parseInt(char);
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