class Snowflake {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.VX = 0;
        this.VY = 0;
        this.radius = 0;
        this.alpha = 0;

        this.reset();
    }

    update() {
        this.x += this.VX;
        this.y += this.VY;

        if (this.y + this.radius > window.innerHeight) {
            this.reset();
        }
    }

    reset() {
        this.x = this.randBetween(0, window.innerWidth);
        this.y = this.randBetween(0, -window.innerHeight);
        this.VX = this.randBetween(-3, 3);
        this.VY = this.randBetween(2, 5);
        this.radius = this.randBetween(1, 4);
        this.alpha = this.randBetween(0.1, 0.9);
    }

    randBetween(min, max) {
        return min + Math.random() * (max - min);
    }
}

class Snow {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");

        document.body.appendChild(this.canvas);

        window.addEventListener("resize", this.onResize.bind(this));
        this.onResize();

        this.updateBound = this.update.bind(this);
        requestAnimationFrame(this.updateBound);

        this.createSnowflakes();
    }

    onResize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    update() {
        this.ctx.clearRect(0, 0, this.width, this.height);

        for (const flake of this.snowflakes) {
            flake.update();

            this.ctx.save();
            this.ctx.fillStyle = "#FFF";
            this.ctx.beginPath();
            this.ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
            this.ctx.closePath();
            this.ctx.globalAlpha = flake.alpha;
            this.ctx.fill();
            this.ctx.restore();
        }
        requestAnimationFrame(this.updateBound);
    }

    createSnowflakes() {
        const flakes = window.innerWidth / 4;

        this.snowflakes = [];
        for (let s = 0 ; s < flakes ; s++){
            this.snowflakes.push(new Snowflake());
        }
    }
}

// Let it snow
new Snow();
