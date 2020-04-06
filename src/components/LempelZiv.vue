<template>
    <div id="LempelZiv">

    </div>
</template>

<script>
    export default {
        name: "LempelZiv",

        props: {
            input: String
        },

        methods: {
            encode(s) {
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
                console.log(out.join(""));
                return out.join("");
            }
        }
    }
</script>

<style scoped>

</style>