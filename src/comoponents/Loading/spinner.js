import Spinner from 'spin';

function spinnerInit(color) {
    var opts = {
        lines: 12,
        // The number of lines to draw
        length: 20,
        // The length of each line
        width: 6,
        // The line thickness
        radius: 29,
        // The radius of the inner circle
        corners: 1,
        // Corner roundness (0..1)
        rotate: 0,
        // The rotation offset 
        color: color ? color : '#5A198D',
        // #rgb or #rrggbb '#5A198D'
        speed: 0.9,
        // Rounds per second
        trail: 60,
        // Afterglow percentage
        shadow: false,
        // Whether to render a shadow
        hwaccel: false,
        // Whether to use hardware acceleration
        className: 'spinner',
        // The CSS class to assign to the spinner
        zIndex: 2e9,
        // The z-index (defaults to 2000000000)
        top: 'auto',
        // Top position relative to parent in px
        left: 'auto',
        // Left position relative to parent in px
        visibility: true
    };

    const spinnerContainer = document.getElementById('spinnerContainer');
    if (spinnerContainer) {
        spinnerContainer.after(new Spinner(opts).spin().el);
    }
}

export default spinnerInit;