var blocks = document.querySelectorAll('.blocks-item');
var view = document.querySelector('.view');


window.onload = init;

function init() {
    for(var i = 0; blocks.length > i; i++) {
        blocks[i].style.backgroundColor = blocks[i].innerHTML;
        blocks[i].id = "block_" + i;
        blocks[i].onmousedown = function(e) {
            moving(this)
        }
    }
}

function moving(block) {
    block.classList.add('blocks-item--moving')
    // moveTo(block);

    document.onmousemove = function(e) {
        moveTo(block);
    }

    block.onmouseup = function () {
        block.classList.remove('blocks-item--moving')
        inject(block)
        document.onmousemove = null;
        block.onmouseup = null;
    }
}

function moveTo(block) {
    block.style.left = event.pageX - block.offsetWidth / 2 + 'px';
    block.style.top = event.pageY - block.offsetHeight / 2 + 'px';
}

function inject(block) {
    var tmp = block;
    block.remove();
    console.log(event.target)
}
