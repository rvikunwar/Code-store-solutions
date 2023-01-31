var text = document.getElementById("text");
var handleMouseAction = function (action) {
    switch (action) {
        case 0 /* MouseAction.MouseClick */:
            if (text != null) {
                text.innerHTML = "	A user clicked on an button";
            }
            break;
        case 1 /* MouseAction.ContextMenu */:
            if (text != null) {
                text.innerHTML = "A user right-clicks on an button";
            }
            break;
        case 2 /* MouseAction.DoubleClick */:
            if (text != null) {
                text.innerHTML = "A user double-clicks on an button";
            }
            break;
        case 3 /* MouseAction.MouseDown */:
            if (text != null) {
                text.innerHTML = "A mouse button is pressed over an button";
            }
            break;
        case 4 /* MouseAction.MouseEnter */:
            if (text != null) {
                text.innerHTML = "The mouse pointer moves into an button";
            }
            break;
        case 5 /* MouseAction.MouseLeave */:
            if (text != null) {
                text.innerHTML = "The mouse pointer moves out of an button";
            }
            break;
        case 6 /* MouseAction.MouseMove */:
            if (text != null) {
                text.innerHTML = "The mouse pointer moves over an button";
            }
            break;
        case 7 /* MouseAction.MouseOut */:
            if (text != null) {
                text.innerHTML = "The mouse pointer moves out of an button";
            }
            break;
        case 8 /* MouseAction.MouseOver */:
            if (text != null) {
                text.innerHTML = "The mouse pointer moves onto an button";
            }
            break;
        case 9 /* MouseAction.MouseUp */:
            if (text != null) {
                text.innerHTML = "A mouse button is released over an button";
            }
            break;
    }
};
