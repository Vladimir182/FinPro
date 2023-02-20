export default function moveCursorToEnd(el: any) {
    if (typeof el.selectionStart == "number") {

        el.selectionStart = el.selectionEnd = el.value.length;
    } else if (typeof el.createTextRange != "undefined") {
        el.focus();
        var range = el.createTextRange();
        range.collapse(false);
        range.select();
    }
}