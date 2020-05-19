var blocks = document.querySelectorAll('.blocks-item');
var blocksContainer = document.querySelector('.blocks');
var viewContainer = document.querySelector('.view');
var coef = 25;

window.onload = init;

//обработчик событий кнопки
document.querySelector(".button.button--add").onclick = function () {
    console.log()
    var div = document.createElement("div");
    div.classList.add("blocks-item");
    div.innerHTML = this.parentNode.querySelector("input").value;
    blocksContainer.append(div);
    init();
}

// инициализация
function init() {
    blocks = document.querySelectorAll('.blocks-item');
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
        if (event.target == blocksContainer || event.target == viewContainer) {
            eventsNone("");
            inject(block);
            building(block);
            document.onmousemove = null;
            block.onmouseup = null;
        }
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
    if (findClosest(block)) {
        var closest = findClosest(block);
        fromWhere(block, closest);


        // console.log(block,closest)
    }
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

function fromWhere(block, closest) {
    var closestY = closest.getBoundingClientRect().top,
        closestX = closest.getBoundingClientRect().left,
        closestW = closestX + closest.offsetWidth,
        closestH = closestY + closest.offsetHeight,
        y = block.getBoundingClientRect().top,
        x = block.getBoundingClientRect().left;

    if (y - block.offsetHeight / 2 >= closestY) {
        replaceBlock(block,closest,"down")
    }
    if (y < closestY + closest.offsetHeight / 2) {
        replaceBlock(block,closest,"up")
    }
    // if (x - block.offsetWidth / 2 >= closestX) {
    //     console.log('right')
    // }
    // if (x < closestX + closest.offsetWidth / 2) {
    //     console.log('left')
    // }
}

function replaceBlock(block, closest, from) {
    if (from == "up") {
        block.classList.add('blocks-item--animate');
        block.style.top = closest.getBoundingClientRect().top - block.offsetHeight + "px";
        block.style.left = closest.getBoundingClientRect().left + "px";
    }
    if (from == "down") {
        block.classList.add('blocks-item--animate');
        block.style.top = closest.getBoundingClientRect().top + block.offsetHeight + "px";
        block.style.left = closest.getBoundingClientRect().left + "px";
    }

    setTimeout(() => block.classList.remove('blocks-item--animate'), 301);
    
}
