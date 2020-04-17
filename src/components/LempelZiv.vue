<template>
    <div id="LempelZiv">
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
                <p>Current state of dictionary:
                    <b-button size="sm" class="mb-2" variant="outline-warning" @click="makeDictToast()">?</b-button><br />
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
                    <p>Result (encoded input), in integers:
                        <b-button size="sm" class="mb-2" variant="outline-warning" @click="makeResultIntToast()">?</b-button><br />
                        {{ this.encoded.replace(/ /g, '') }}
                    </p>
                </div>
            </b-col>
            <b-col>
                <div>
                    <p>Result (encoded input), in binary:
                        <b-button size="sm" class="mb-2" variant="outline-warning" @click="makeResultBinToast()">?</b-button><br />
                        {{ this.convertedEncoding }}
                    </p>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <div>
                    <div v-if="this.encoded && this.convertedEncoding">
                        <p>
                            The input string had a length of {{ this.usedInput.length }} bits, and
                            the output string had a length of {{ this.convertedEncoding.length }} bits.<br />
                            This means our compression means we used <b>{{ 100 * this.convertedEncoding.length / this.usedInput.length }}%</b> of the original source!
                        </p>
                    </div>
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
        },

        data() {
            return {
                usedInput: '',
                encoded: '',
                convertedEncoding: '',
                decoded: '',
                currentLookingIndices: [],
                matchedIndices: [],
                dict: [],
                delay: 500,
            }
        },

        methods: {
            encodeAndDecode() {
                this.encoded = '';
                this.dict = [];
                if (this.input) {
                    this.usedInput = this.input;
                    this.encode(this.input);
                }
            },
            async encode(s) {
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
                this.encoded = concatenated.join(" ");
                this.convertedEncoding = this.convert(this.encoded);
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
                if (input) {
                    let output = '';
                    const amountOfBits = (x) => function() {
                        if (x === 0)
                            return 0;
                        return Math.ceil(Math.log2(x));
                    }();
                    const convertToBinary = (x, num) => function() {
                        if (num === 0)
                            return '';
                        let bin = x.toString(2);
                        return new Array((num+1) - bin.length).join('0') + bin;
                    }();
                    this.dict.forEach(function(value, index) {
                        let prevIndex = value[0];
                        let nextBit = value[1];
                        output += convertToBinary(prevIndex, amountOfBits(index + 1)) + '' + nextBit;
                    });
                    return output;
                }
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
            makeDictToast() {
                this.$bvToast.toast(
                    "This is a list (though you can visualise it as a dictionary) of tuples, containing " +
                    "[index, nextBit] information, where index is the index of the longest match, and nextBit the " +
                    "first bit that it could not match.",
                    {
                        title: 'Dictionary',
                        appendToast: true
                    });
            },
            makeResultIntToast() {
                this.$bvToast.toast(
                    "The final result (simply the dictionary seen above, but everything next to each other).",
                    {
                        title: 'Result in integer',
                        appendToast: true
                    });
            },
            makeResultBinToast() {
                this.$bvToast.toast(
                    "The final result converted to binary. The prevIndex (index of longest match) is denoted " +
                    "with the last possible amount of bits, which is the ceiling of log2(x), x = index." +
                    "'eof' denotes the End-Of-File, or the last character in the bitstream.",
                    {
                        title: 'Result in binary',
                        appendToast: true
                    });
            },
        }
    }
</script>

<style scoped>
    .lempel-row {
        margin: 15px;
    }
    .matched {
        background-color: lightgray;
    }
    .binary-input {
        flex-wrap: wrap;
    }
</style>