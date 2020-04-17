<template>
    <div id="LempelZiv">
        <div class="dropdown-divider"></div>
        <b-row class="lempel-row">
            <b-col>
                <b-button variant="primary" size="lg" @click="encodeAndDecode">Start Encoding</b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <p>Received input:</p>
                <div v-if="this.validate(this.input)" class="binary-input">
                    <b-list-group horizontal class="justify-content-center binary-input">
                        <b-list-group-item
                                v-for="(char, index) in this.input"
                                :key="index"
                                :active="currentLookingIndices.includes(index)"
                                :class="matchedIndices.includes(index) ? 'matched' : ''"
                        >
                            {{ char.valueOf() }}
                        </b-list-group-item>
                    </b-list-group>
                </div>
                <div v-else>Enter a binary string</div>
            </b-col>
        </b-row>
        <b-row class="lempel-row">
            <b-col>
                <p>Current state of dictionary:<br />
                    {{ this.dict }}
                </p>
            </b-col>
            <b-col>
                <p>Enter delay. Current delay: {{ this.delay }}</p>
                <b-input-group prepend="0" append="2000" class="mt-3">
                    <b-form-input type="range" min="0" max="2000" v-model="delay"></b-form-input>
                </b-input-group>
            </b-col>
        </b-row>
        <b-row class="lempel-row">
            <b-col>
                <div>
                    <p>Result (encoded input), in integers:<br />
                        {{ this.encoded }}
                    </p>
                </div>
                <div>
                    <p>Result (encoded input), in binary:<br />
                        {{ convert(this.encoded) }}
                    </p>
                </div>

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
                currentLookingIndices: [],
                matchedIndices: [],
                dict: [],
                delay: 500,
            }
        },

        watch: {
            'reset': function() {
                this.encoded = '';
                this.decoded = '';
                this.currentLookingIndices = [];
                this.matchedIndices = [];
                this.dict = [];
                this.delay = 500;
            }
        },

        methods: {
            encodeAndDecode() {
                this.encoded = '';
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
                this.currentLookingIndices = [i];
                let n = 1;
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
                    await sleep(this.delay);

                    // Finds a match of the currently looking chars
                    let index_matched = this.find_first_match(indices, chars);
                    if (index_matched === 0) {
                        // Not found, save chars in dictionary
                        const lastChar = this.determineChar(chars[chars.length - 1]);
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
                        this.currentLookingIndices = [i];
                        this.matchedIndices = [];
                    } else {
                        // It was found, so look at the next char as well
                        unmatched += 1;
                        chars += data[i+unmatched];

                        prev_index = parseInt(index_matched);

                        // Update props
                        this.matchedIndices = this.calculateIndices(prev_index, unmatched, indices);
                        this.currentLookingIndices.push(i+unmatched);
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
            validate(input) {
                return input.search(/^[01]+$/) !== -1;
            },
            convert(input) {
                return input;
            },
            calculateIndices(prev_index, unmatched, indices) {
                let range = (x, y) => Array.from((function*() {
                    while (x <= y) yield x++;
                })());
                let calculateBefore = (prev, ind) => function() {
                    let total = 0;
                    for (let i = 1; i < prev; i++) {
                        total += ind[i][1].length;
                    }
                    return total;
                }();
                let elementsBeforePrevIndex = calculateBefore(prev_index, indices);
                return range(elementsBeforePrevIndex, elementsBeforePrevIndex + (unmatched - 1));
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
    .lempel-row {
        margin: 25px;
    }
    .matched {
        background-color: lightgray;
    }
    .binary-input {
        flex-wrap: wrap;
    }
</style>