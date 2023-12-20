
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const window_width = (canvas.width = window.innerWidth);
  const window_height = (canvas.height = window.innerHeight);
  let animation_run = [];
  let animation_idle = [];
  let animation_jump = [];
  let animation_fall = [];
  let animation_die = [];
  let animation_dizzy = [];
  let animation_gethit = [];
  let animation_attack1 = [];
  let animation_attack2 = [];
  let animation_attack3 = [];
  for (var i = 0; i < 21; i++) {
    var image = new Image();
    if (i < 10) {
      image.src = `/robot/Transparent PNG/11_attack_c/skeleton-11_attack_c_0${i}.png`;
    } else {
      image.src = `/robot/Transparent PNG/11_attack_c/skeleton-11_attack_c_${i}.png`;
    }
    animation_attack3.push(image);
  }
  for (var i = 0; i < 16; i++) {
    var image = new Image();
    if (i < 10) {
      image.src = `/robot/Transparent PNG/10_attack_b/skeleton-10_attack_b_0${i}.png`;
    } else {
      image.src = `/robot/Transparent PNG/10_attack_b/skeleton-10_attack_b_${i}.png`;
    }
    animation_attack2.push(image);
  }
  for (var i = 0; i < 16; i++) {
    var image = new Image();
    if (i < 10) {
      image.src = `/robot/Transparent PNG/09_attack_a/skeleton-09_attack_a_0${i}.png`;
    } else {
      image.src = `/robot/Transparent PNG/09_attack_a/skeleton-09_attack_a_${i}.png`;
    }
    animation_attack1.push(image);
  }
  for (var i = 0; i < 11; i++) {
    var image = new Image();
    if (i < 10) {
      image.src = `/robot/Transparent PNG/08_get_hit/skeleton-08_get_hit_0${i}.png`;
    } else {
      image.src = `/robot/Transparent PNG/08_get_hit/skeleton-08_get_hit_${i}.png`;
    }
    animation_gethit.push(image);
  }
  for (var i = 0; i < 21; i++) {
    var image = new Image();
    if (i < 10) {
      image.src = `/robot/Transparent PNG/07_dizzy/skeleton-07_dizzy_0${i}.png`;
    } else {
      image.src = `/robot/Transparent PNG/07_dizzy/skeleton-07_dizzy_${i}.png`;
    }
    animation_dizzy.push(image);
  }
  for (var i = 0; i < 31; i++) {
    var image = new Image();
    if (i < 10) {
      image.src = `/robot/Transparent PNG/06_ko/skeleton-06_KO_0${i}.png`;
    } else {
      image.src = `/robot/Transparent PNG/06_ko/skeleton-06_KO_${i}.png`;
    }
    animation_die.push(image);
  }
  for (var i = 0; i < 11; i++) {
    var image = new Image();
    if (i < 10) {
      image.src = `/robot/Transparent PNG/05_fall/skeleton-05_fall_0${i}.png`;
    } else {
      image.src = `/robot/Transparent PNG/05_fall/skeleton-05_fall_${i}.png`;
    }
    animation_fall.push(image);
  }
  for (var i = 0; i < 11; i++) {
    var image = new Image();
    if (i < 10) {
      image.src = `/robot/Transparent PNG/04_jump/skeleton-04_jump_0${i}.png`;
    } else {
      image.src = `/robot/Transparent PNG/04_jump/skeleton-04_jump_${i}.png`;
    }
    animation_jump.push(image);
  }
  for (var i = 0; i < 21; i++) {
    var image = new Image();
    if (i < 10) {
      image.src = `/robot/Transparent PNG/01_idle_a/skeleton-01_idle_a_0${i}.png`;
    } else {
      image.src = `/robot/Transparent PNG/01_idle_a/skeleton-01_idle_a_${i}.png`;
    }
    animation_idle.push(image);
  }
  for (var i = 0; i < 13; i++) {
    var image = new Image();
    if (i < 10) {
      image.src = `/robot/Transparent PNG/03_run/skeleton-03_run_0${i}.png`;
    } else {
      image.src = `/robot/Transparent PNG/03_run/skeleton-03_run_${i}.png`;
    }
    animation_run.push(image);
  }
  class robot {
    constructor() {
      this.xpos = Math.random() * window_width;
      this.ypos = Math.random() * window_height - 50;
      this.width = 150;
      this.height = 100;
      this.sx = Math.random() * 1 + 1;
      this.sy = Math.random() * 2;
      this.count = 1;
    }
    update_run() {
      this.xpos += this.sx;
    }
    run() {
      if (this.count >= animation_run.length) this.count = 0;
      ctx.drawImage(
        animation_run[this.count],
        this.xpos,
        this.ypos,
        this.width,
        this.height
      );
      this.count++;
      
    }
    idle() {
      if (this.count >= animation_idle.length) this.count = 0;
      ctx.drawImage(
        animation_idle[this.count],
        this.xpos,
        this.ypos,
        this.width,
        this.height
      );
      this.count++;
    }
    jump() {
      if (this.count >= animation_die.length){
        pause();
      }
      ctx.drawImage(
        animation_jump[this.count],
        this.xpos,
        this.ypos,
        this.width,
        this.height
      );
      this.count++;
    }
    fall() {
      if (this.count >= animation_fall.length) this.count = 0;
      ctx.drawImage(
        animation_fall[this.count],
        this.xpos,
        this.ypos,
        this.width,
        this.height
      );
      this.count++;
    }
    die() {
      if (this.count >= animation_die.length){
        pause();
      }
      ctx.drawImage(
        animation_die[this.count],
        this.xpos,
        this.ypos,
        this.width,
        this.height
      );
      this.count++;
    }
    dizzy() {
      if (this.count >= animation_dizzy.length) this.count = 0;
      ctx.drawImage(
        animation_dizzy[this.count],
        this.xpos,
        this.ypos,
        this.width,
        this.height
      );
      this.count++;
    }
    gethit() {
      if (this.count >= animation_gethit.length) this.count = 0;
      ctx.drawImage(
        animation_gethit[this.count],
        this.xpos,
        this.ypos,
        this.width,
        this.height
      );
      this.count++;
    }
    attack1() {
      if (this.count >= animation_attack1.length) this.count = 0;
      ctx.drawImage(
        animation_attack1[this.count],
        this.xpos,
        this.ypos,
        this.width,
        this.height
      );
      this.count++;
    }
    attack2() {
      if (this.count >= animation_attack2.length) this.count = 0;
      ctx.drawImage(
        animation_attack2[this.count],
        this.xpos,
        this.ypos,
        this.width,
        this.height
      );
      this.count++;
    }
    attack3() {
      if (this.count >= animation_attack3.length) this.count = 0;
      ctx.drawImage(
        animation_attack3[this.count],
        this.xpos,
        this.ypos,
        this.width,
        this.height
      );
      this.count++;
    }
  }
  var b;
  let all_robot = [];
  for (var i = 0; i < 100; i++) {
    all_robot.push(new robot());
  }
  function run() {
    b = requestAnimationFrame(run);
    ctx.clearRect(0, 0, window_width, window_height);
    all_robot.forEach((robot) => {
      robot.run();
      robot.update_run();
    });
  }
  function idle() {
    b = requestAnimationFrame(idle);
    ctx.clearRect(0, 0, window_width, window_height);
    all_robot.forEach((robot) => {
      robot.idle();
    });
  }
  function jump() {
    b = requestAnimationFrame(jump);
    ctx.clearRect(0, 0, window_width, window_height);
    all_robot.forEach((robot) => {
      robot.jump();
    });
  }
  function fall() {
    b = requestAnimationFrame(fall);
    ctx.clearRect(0, 0, window_width, window_height);
    all_robot.forEach((robot) => {
      robot.fall();
      robot.ypos += 4;
      if (robot.ypos > window_height) robot.ypos = 0;
    });
  }
  function die() {
    b = requestAnimationFrame(die);
    ctx.clearRect(0, 0, window_width, window_height);
    all_robot.forEach((robot) => {
      robot.die();
    });
  }
  function dizzy() {
    b = requestAnimationFrame(dizzy);
    ctx.clearRect(0, 0, window_width, window_height);
    all_robot.forEach((robot) => {
      robot.dizzy();
    });
  }
  function gethit() {
    b = requestAnimationFrame(gethit);
    ctx.clearRect(0, 0, window_width, window_height);
    all_robot.forEach((robot) => {
      robot.gethit();
    });
  }
  function attack1() {
    b = requestAnimationFrame(attack1);
    ctx.clearRect(0, 0, window_width, window_height);
    all_robot.forEach((robot) => {
      robot.attack1();
    });
  }
  function attack2() {
    b = requestAnimationFrame(attack2);
    ctx.clearRect(0, 0, window_width, window_height);
    all_robot.forEach((robot) => {
      robot.attack2();
    });
  }
  function attack3() {
    b = requestAnimationFrame(attack3);
    ctx.clearRect(0, 0, window_width, window_height);
    all_robot.forEach((robot) => {
      robot.attack3();
    });
  }
  function pause(){
    cancelAnimationFrame(b);
  }
