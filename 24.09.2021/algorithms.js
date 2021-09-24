
/**
 *
 * @param {string} message
 * @param {string} color
 * @returns {string}
 */
var colorAMessage = (message, color = 'white') => {
    var asciiColor = "\x1b[37m";

    switch (color) {
        case 'blue':
            asciiColor = "\x1b[31m";
        case 'red':
            asciiColor = "\x1b[31m";
        case 'white':
        default:
            asciiColor = "\x1b[37m";
    }
    return console.log(`${asciiColor}%s\x1b[0m`, message);
};

colorAMessage("Hello world", 'blue');
