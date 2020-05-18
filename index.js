var blocks = document.querySelectorAll('.blocks-item');
var blocksContainer = document.querySelector('.blocks');
var viewContainer = document.querySelector('.view');
var coef = 25;

window.onload = init;
// инициализация
function init() {
    for (var i = 0; blocks.length > i; i++) {
        blocks[i].style.backgroundColor = blocks[i].innerHTML;
        blocks[i].id = "block_" + i;
        blocks[i].onmousedown = function (e) {
            moving(this)
        }
    }
}

function moving(block) {
    block.style.position = "fixed";
    block.style.zIndex = "1";
    eventsNone("none");
    // событие начала
    document.onmousemove = function (e) {
        moveTo(block);
    }
    // событие окончания
    document.onmouseup = function () {
        eventsNone("");
        inject(block);
        building(block);
        document.onmousemove = null;
        block.onmouseup = null;
    }
}
// перемещение за курсором
function moveTo(block) {
    block.style.left = event.pageX - block.offsetWidth / 2 + 'px';
    block.style.top = event.pageY - block.offsetHeight / 2 + 'px';
}
// перемещаем в нужный блок
function inject(block) {
    checkPosition().append(block)
    if (checkPosition() == blocksContainer) {
        block.style.position = "";
        block.style.top = "";
        block.style.left = "";
        block.style.zIndex = "";
    }
}
// проверяем в какой блок попадает
function checkPosition() {
    if (event.target == blocksContainer) {
        return blocksContainer;
    }
    if (event.target == viewContainer) {
        return viewContainer;
    }
}
// функция обнуления всех ивентов
function eventsNone(tmp) {
    for (var i = 0; blocks.length > i; i++) {
        blocks[i].style.pointerEvents = tmp;
    }
}

function building(block) {
    var closest = findClosest(block);

}

function findClosest(block) {
    if (block.parentNode == viewContainer) {
        var neighbors = block.parentNode.querySelectorAll(".blocks-item"),
            x = block.getBoundingClientRect().left,
            y = block.getBoundingClientRect().top;

        for (var i = 0; i < neighbors.length; i++) {
            if (neighbors[i] != block) {

                var neighborY = neighbors[i].getBoundingClientRect().top,
                    neighborX = neighbors[i].getBoundingClientRect().left,
                    neighborWidth = neighborX + neighbors[i].offsetWidth,
                    neighborHeight = neighborY + neighbors[i].offsetHeight;

                if (y + block.offsetHeight > neighborY - coef && neighborHeight + coef > y && x + block.offsetWidth > neighborX - coef && neighborWidth + coef > x) {
                    return (neighbors[i])
                }
            }
        }

    }
}