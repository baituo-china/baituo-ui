export default function measureTextWidth(text, style) {
    if (typeof window !== 'undefined') {
        var span = document.createElement('span');
        span.style.cssText = 'position: absolute;top: -9999px;';
        span.innerHTML = text.replace(/\s/g, '&nbsp;');
        if (style) {
            ['fontSize', 'fontFamily'].forEach(function (property) {
                if (property in style) {
                    span.style[property] = style[property];
                }
            });
        }
        document.body.appendChild(span);
        var width = span.offsetWidth;
        document.body.removeChild(span);
        return width;
    }
    return 0;
}