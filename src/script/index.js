class SpritAnimation {

    constructor({ height, width, imgSrc, xcount, ycount, showLog = false }) {
        this.height = height;
        this.width = width;
        this.imgSrc = imgSrc;
        this.xcount = xcount;
        this.ycount = ycount;
        this.box = document.createElement('div');
        this.timer = null;
        this.x = 0;
        this.y = 0;
        this.showLog = showLog;
    }
    showAnimationBox(target, time) {
        // let box = document.createElement('div');
        let targetelm = document.getElementById(target);
        let propObject = {
            class: "animationBox",
        }
        this.box.style.cssText = `
        display: block; 
        background-image:url("${this.imgSrc}");
        border:1px solid; 
        width:${this.width}px; 
        overflow:hidden;
        background-position:0 0;
        height:${this.height}px;
        background-repeat:no-repeat;
        `;

        setMultipleAttribute(this.box, propObject);
        this.startAnimation(this.box, time);
        targetelm.appendChild(this.box);
    }
    stopAnimation() {
        clearInterval(this.timer);
    }
    startAnimation(box, timer = 400) {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            if (this.x + 1 > this.xcount - 1) {
                this.x = 0;
                if (this.ycount > 1) {
                    console.log(this.ycount);

                    this.y++;
                }
            } else {
                this.x++;
            }
            if (this.y > this.ycount - 1) {
                this.y = 0;
                this.x = 0;
            }
            if (this.showLog) {
                console.log(this.x, this.y, this.xcount, this.ycount);
            }


            this.box.style.backgroundPositionX = (this.x * this.width) * -1 + "px";
            this.box.style.backgroundPositionY = (this.y * this.height) * -1 + "px";
        }, timer)
    }
}
function setMultipleAttribute(elm, propObj) {
    Object.keys(propObj).map((item, index) => {
        elm.setAttribute(item, propObj[item]);
    })
}
var sa = new SpritAnimation({ height: 256, width: 512, imgSrc: "./images/sprites-cat-running.png", xcount: 4, ycount: 2 })
sa.showAnimationBox("target", 50);
var manRun = new SpritAnimation({ height: 318, width: 181, imgSrc: "./images/manW.png", xcount: 8, ycount: 1 });
manRun.showAnimationBox("target2", 100);

document.getElementById("stopTarget").addEventListener('click', () => {
    sa.stopAnimation();
})