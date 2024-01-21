const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const canvas_height = (canvas.height = 500);
const canvas_width = (canvas.width = 1000);

class Player {
  constructor() {
    this.vel = {
      x: 0,
      y: 0,
    };
    this.rotate = 0;
    const img = new Image();
    img.src = "./rocket.png";
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
    img.src = "./skeleton-05_fall_00.png";
    this.scale = 0.05;
    this.vel = vel;
    this.pos = pos;
    this.health = 1;
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
class EnemyBullet {
  constructor({ pos, vel }) {
    this.pos = pos;
    this.vel = vel;
    this.radius = 3;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
  }
  update() {
    this.draw();
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }
}

class Screen {
  draw() {
    ctx.fillStyle = "Black";
    ctx.font = "30px Arial";
    ctx.fillText(`Score: ${count}`, 0, 50, 100);
  }
}

class Effect {
  constructor({ pos, vel }, radius) {
    this.pos = pos;
    this.vel = vel;
    this.radius = radius;
    this.opacity = 1;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
  update() {
    this.draw();
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.opacity -= 0.03;
  }
}

var animation;
var count = 0;
var failed = 3;
var restart = false;
const screen = new Screen();
const player = new Player();
const bullet = [];
const enemy = [];
const effect = [];

let spawn_enemy = setInterval(() => {
  enemy.push(
    new Enemy({
      pos: {
        x: Math.random() * (canvas_width - 50) + 50,
        y: 0,
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
      failed = 3;
      restart = window.confirm(
        `Game over \n Bạn đã đạt được ${count} điểm \n Bạn có muốn bắt đầu lại`
      );
    }
  });
  bullet.forEach((projectile, index) => {
    enemy.forEach((ghost) => {
      if (
        projectile.pos.x - projectile.radius <= ghost.pos.x + ghost.width &&
        projectile.pos.x + projectile.radius >= ghost.pos.x &&
        projectile.pos.y - projectile.radius <= ghost.pos.y + ghost.height &&
        projectile.pos.y + projectile.radius >= ghost.pos.y
      ) {
        bullet.splice(index, 1);
        ghost.health--;
      }
    });
  });
  effect.forEach((ef, index) => {
    if (ef.opacity <= 0) {
      effect.splice(index, 15);
    }
  });
  if (failed <= 0) {
    cancelAnimationFrame(animation);
    failed = 3;
    restart = window.confirm(
      `Game over \n Bạn đã đạt được ${count} điểm \n Bạn có muốn bắt đầu lại`
    );
  }
  if (restart == true) {
    enemy.splice(0, enemy.length);
    bullet.splice(0, bullet.length);
    count = 0;
    restart = false;
    animate();
  }
}
function animate() {
  animation = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas_width, canvas_height);
  effect.forEach((ef) => {
    ef.update();
  });
  player.update();
  key_control();
  screen.draw();
  bullet.forEach((projectile, index) => {
    if (projectile.radius + projectile.pos.y <= 0) {
      bullet.splice(index, 1);
    }
    projectile.update();
  });
  check();
  enemy.forEach((ghost, index) => {
    if (ghost.pos.x >= canvas_width) {
      enemy.splice(index, 1);
    }
    if (ghost.pos.y >= canvas_height) {
      enemy.splice(index, 1);
      failed--;
    }
    if (ghost.health == 0) {
      for (var i = 0; i < 15; i++) {
        effect.push(
          new Effect(
            {
              pos: {
                x: ghost.pos.x + ghost.width / 2,
                y: ghost.pos.y + ghost.height / 2,
              },
              vel: {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2,
              },
            },
            Math.random() * 2 + 1
          )
        );
      }
      enemy.splice(index, 1);
      count++;
    }
    ghost.update();
  });
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
      console.log(effect);
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
