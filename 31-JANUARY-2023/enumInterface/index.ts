const enum MouseAction {
    MouseClick,
    ContextMenu,
    DoubleClick,

    MouseDown,
    MouseEnter,
    MouseLeave,
    MouseMove,
    MouseOut,
    MouseOver,
    MouseUp,
}

var text = document.getElementById("text");

const handleMouseAction = (action: MouseAction) => {
    switch (action) {
        case MouseAction.MouseClick:
            if(text != null){
                text.innerHTML = "	A user clicked on an button";
            }
            break;

        case MouseAction.ContextMenu:
            if(text != null){
                text.innerHTML = "A user right-clicks on an button"
            }
            break;

        case MouseAction.DoubleClick:
            if(text != null){
                text.innerHTML = "A user double-clicks on an button"
            }
            break;

        case MouseAction.MouseDown:
            if(text != null){
                text.innerHTML = "A mouse button is pressed over an button"
            }
            break;

        case MouseAction.MouseEnter:
            if(text != null){
                text.innerHTML = "The mouse pointer moves into an button"
            }
            break;

        case MouseAction.MouseLeave:
            if(text != null){
                text.innerHTML = "The mouse pointer moves out of an button"
            }
            break;

        case MouseAction.MouseMove:
            if(text != null){
                text.innerHTML = "The mouse pointer moves over an button"
            }
            break;

        case MouseAction.MouseOut:
            if(text != null){
                text.innerHTML = "The mouse pointer moves out of an button"
            }
            break;

        case MouseAction.MouseOver:
            if(text != null){
                text.innerHTML = "The mouse pointer moves onto an button"
            }
            break;

        case MouseAction.MouseUp:
            if(text != null){
                text.innerHTML = "A mouse button is released over an button"
            }
            break;
    }
};