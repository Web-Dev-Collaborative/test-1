$(function () {
    mkTool(
        'random-tsv',
        function () {
            var cols = parseInt($('#random-tsv-cols').val(), 10);
            var rows = parseInt($('#random-tsv-rows').val(), 10);

            function randomString(len) {
                var alphabet = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
                var str = "";
                var length = parseInt(Math.random()*len)+1;
                for (var i = 0; i < length; i++) {
                    str += alphabet[parseInt(Math.random()*alphabet.length)];
                }
                return str;
            }

            var json = [];
            for (var row = 0; row < rows; row++) {
                var line = "";
                for (var col = 0; col < cols; col++) {
                    var field = randomString(10);
                    /*
                    if (options['quote']) {
                        field = '"' + field + '"';
                    }
                    */
                    line = line + field;
                    if (col != cols-1) {
                        line += "\t";
                    }
                }
                json.push(line);
            }

            var tsv = json.join("\n");
            return tsv;
        },
        {
            allowEmptyText : true,
            exceptionFn : function (err) {
                $('#action-error').show();
                $('#action-error').text(err.message);
            }
        }
    );
});
