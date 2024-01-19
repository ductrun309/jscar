const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const canvas_height = (canvas.height = window.innerHeight);
const canvas_width = (canvas.width = window.innerWidth);

class Player {
  constructor() {
    this.vel = {
      x: 0,
      y: 0,
    };
    this.rotate = 0;
    const img = new Image();
    img.src = "../Transparent PNG/rocket.png";
    img.onload = () => {
      this.scale = 0.035;
      this.width = img.width * this.scale;
      this.height = img.height * this.scale;
      this.img = img;
      this.pos = {
        x: canvas_width / 2 - this.width / 2,
        y: (canvas_height * 3) / 4,
      };
    };
  }

  draw() {
    ctx.save();
    ctx.translate(
      player.pos.x + player.width / 2,
      player.pos.y + player.height / 2
    );
    ctx.rotate(this.rotate);
    ctx.translate(
      -player.pos.x - player.width / 2,
      -player.pos.y - player.height / 2
    );
    if (this.img) {
      ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
    }
    ctx.restore();
  }
  update() {
    if (this.img) {
      this.draw();
      this.pos.x += this.vel.x * 3;
      this.pos.y += this.vel.y * 3;
    }
  }
}

class Bullet {
  constructor({ pos, vel }) {
    this.pos = pos;
    this.vel = vel;
    this.radius = 3;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
  }
  update() {
    this.draw();
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
}

class Enemy {
  constructor({ pos, vel }) {
    const img = new Image();
    img.src = "../Transparent PNG/05_fall/skeleton-05_fall_00.png";
    this.scale = 0.05;
    this.vel = vel;
    this.pos = pos;
    this.health = 3;
    img.onload = () => {
      this.scale = 0.05;
      this.width = img.width * this.scale;
      this.height = img.height * this.scale;
      this.img = img;
    };
  }
  draw() {
    if (this.img) {
      ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
    }
  }
  update() {
    this.draw();
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
}

var animation;
const player = new Player();
const bullet = [];
const enemy = [];

let spawn_enemy = setInterval(() => {
  enemy.push(
    new Enemy({
      pos: {
        x: Math.random() * canvas_width,
        y: 100,
      },
      vel: {
        x: 1,
        y: 2,
      },
    })
  );
}, 1000);
const key_press = {
  a: {
    press: false,
  },
  s: {
    press: false,
  },
  d: {
    press: false,
  },
  w: {
    press: false,
  },
  space: {
    press: false,
  },
};
function key_control() {
  if (key_press.a.press && player.pos.x > 0) {
    player.vel.x = -3;
    player.rotate = -0.1;
  } else if (key_press.d.press && player.pos.x + player.width < canvas_width) {
    player.vel.x = 3;
    player.rotate = 0.1;
  } else {
    player.vel.x = 0;
    player.rotate = 0;
  }
  if (key_press.w.press && player.pos.y > 0) {
    player.vel.y = -3;
  } else if (
    key_press.s.press &&
    player.pos.y + player.height < canvas_height
  ) {
    player.vel.y = 3;
  } else {
    player.vel.y = 0;
  }
}
function check() {
  enemy.forEach((ghost) => {
    if (
      player.pos.x <= ghost.pos.x + ghost.width &&
      player.pos.x + player.width >= ghost.pos.x &&
      player.pos.y <= ghost.pos.y + ghost.height &&
      player.pos.y + player.height >= ghost.pos.y
    ) {
      cancelAnimationFrame(animation);
    }
  });
  bullet.forEach((projectile, index) => {
    enemy.forEach((ghost) => {
      if (
        projectile.pos.x - projectile.radius <= ghost.pos.x + ghost.width &&
        projectile.pos.x + projectile.radius >= ghost.pos.x &&
        projectile.pos.y - projectile.radius <= ghost.pos.y + ghost.height
      ) {
        bullet.splice(index, 1);
        ghost.health--;
        console.log("true");
      }
    });
  });
}
function animate() {
  animation = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas_width, canvas_height);
  player.update();
  key_control();
  bullet.forEach((projectile, index) => {
    if (projectile.radius + projectile.pos.y <= 0) {
      bullet.splice(index, 1);
    }
    projectile.update();
  });
  enemy.forEach((ghost, index) => {
    if (
      ghost.health == 0 ||
      ghost.pos.x >= canvas_width ||
      ghost.pos.y >= canvas_height
    ) {
      enemy.splice(index, 1);
    }
    ghost.update();
  });

  check();
}

window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "a":
      key_press.a.press = true;
      break;
    case "d":
      key_press.d.press = true;
      break;
    case "w":
      key_press.w.press = true;
      break;
    case "s":
      key_press.s.press = true;
      break;
    case " ":
      if (!key_press.space.press) {
        bullet.push(
          new Bullet({
            pos: {
              x: player.pos.x + player.width / 2,
              y: player.pos.y,
            },
            vel: {
              x: 0,
              y: -5,
            },
          })
        );
      }
      key_press.space.press = true;
      break;
  }
});
window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "a":
      key_press.a.press = false;
      break;
    case "d":
      key_press.d.press = false;
      break;
    case "w":
      key_press.w.press = false;
      break;
    case "s":
      key_press.s.press = false;
      break;
    case " ":
      key_press.space.press = false;
      break;
  }
});

animate();
