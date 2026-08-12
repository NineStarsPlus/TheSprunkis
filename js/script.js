//#region functions

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms * 1000));

const move = async (
  sprunki,
  area,
  speed,
  walkMin,
  walkMax,
  sprite,
  spriteFlip,
  image,
) => {
  sprunki.dataset.action = "walk";
  sprite.style.backgroundImage = image;
  spriteFlip.style.backgroundImage = image;

  let limitMinX = 0;
  let limitMaxX = area.clientWidth - sprunki.offsetWidth;
  let limitMinY = 0;
  let limitMaxY = area.clientHeight - sprunki.offsetHeight;

  let currentX = Number(sprunki.dataset.x);
  let currentY = Number(sprunki.dataset.y);

  let newX = Math.floor(Math.random() * (walkMax - walkMin + 1)) + walkMin;
  let newY = Math.floor(Math.random() * (walkMax - walkMin + 1)) + walkMin;

  let distance = Math.hypot(newX, newY);
  let duration = (distance / 10) * speed;

  sprunki.style.transitionProperty = "transform";
  sprunki.style.transitionDuration = `${duration}s`;

  let finalX;
  let finalY;

  let r = Math.random();

  if (r < 0.25) {
    sprite.style.visibility = "visible";
    spriteFlip.style.visibility = "hidden";
    sprite.style.display = "block";
    spriteFlip.style.display = "none";
    finalX = currentX - newX;
    finalY = currentY - newY;
  } else if (r < 0.5) {
    sprite.style.visibility = "hidden";
    spriteFlip.style.visibility = "visible";
    sprite.style.display = "none";
    spriteFlip.style.display = "block";
    finalX = currentX + newX;
    finalY = currentY + newY;
  } else if (r < 0.75) {
    sprite.style.visibility = "visible";
    spriteFlip.style.visibility = "hidden";
    sprite.style.display = "block";
    spriteFlip.style.display = "none";
    finalX = currentX - newX;
    finalY = currentY + newY;
  } else {
    sprite.style.visibility = "hidden";
    spriteFlip.style.visibility = "visible";
    sprite.style.display = "none";
    spriteFlip.style.display = "block";
    finalX = currentX + newX;
    finalY = currentY - newY;
  }

  if (finalX < limitMinX) {
    finalX = limitMinX;
  } else if (finalX > limitMaxX) {
    finalX = limitMaxX;
  }

  if (finalY < limitMinY) {
    finalY = limitMinY;
  } else if (finalY > limitMaxY) {
    finalY = limitMaxY;
  }

  sprunki.style.transform = `translate(${finalX}px, ${finalY}px)`;

  sprunki.dataset.x = finalX;
  sprunki.dataset.y = finalY;

  let waitTime = 0;
  if (duration == 1) {
    waitTime = 0.25;
  } else {
    waitTime = duration - 1;
  }

  await sleep(waitTime);

  sprunki.dataset.action = "none";
};

const sit = async (
  sprunki,
  sprite,
  spriteFlip,
  image,
  sitImage,
  sitTimeMin,
  sitTimeMax,
) => {
  sprunki.dataset.action = "sit";
  sprite.style.backgroundImage = sitImage;
  spriteFlip.style.backgroundImage = sitImage;

  let time = Math.random() * (sitTimeMax - sitTimeMin) + sitTimeMin;
  await sleep(time);

  sprite.style.backgroundImage = image;
  spriteFlip.style.backgroundImage = image;
  sprunki.dataset.action = "none";
};

function sort(chanceWalk, chanceSprint, chanceSit) {
  const options = [
    { value: "walk", chance: chanceWalk },
    { value: "sprint", chance: chanceSprint },
    { value: "sit", chance: chanceSit },
  ];

  const random = Math.random() * 100;
  let ac = 0;

  for (const option of options) {
    ac += option.chance;
    if (random < ac) {
      return option.value;
    }
  }

  return options[options.length - 1].value;
}

const sprint = async (
  sprunki,
  area,
  speed,
  sprintMin,
  sprintMax,
  sprite,
  spriteFlip,
  image,
  sprintImage,
) => {
  if (sprunki == document.getElementById("simon")) {
    spriteFlip.style.transform = "scaleX(-1)";
    sprite.style.transform = "scaleX(1)";
  }
  sprunki.dataset.action = "sprint";
  sprite.style.backgroundImage = sprintImage;
  spriteFlip.style.backgroundImage = sprintImage;

  let limitMinX = 0;
  let limitMaxX = area.clientWidth - sprunki.offsetWidth;
  let limitMinY = 0;
  let limitMaxY = area.clientHeight - sprunki.offsetHeight;

  let currentX = Number(sprunki.dataset.x);
  let currentY = Number(sprunki.dataset.y);

  let newX =
    Math.floor(Math.random() * (sprintMax - sprintMin + 1)) + sprintMin;
  let newY =
    Math.floor(Math.random() * (sprintMax - sprintMin + 1)) + sprintMin;

  let distance = Math.hypot(newX, newY);
  let duration = (distance / 10) * speed;

  sprunki.style.transitionProperty = "transform";
  sprunki.style.transitionDuration = `${duration}s`;

  let finalX;
  let finalY;

  let r = Math.random();

  if (r < 0.25) {
    sprite.style.visibility = "visible";
    spriteFlip.style.visibility = "hidden";
    sprite.style.display = "block";
    spriteFlip.style.display = "none";
    finalX = currentX - newX;
    finalY = currentY - newY;
  } else if (r < 0.5) {
    sprite.style.visibility = "hidden";
    spriteFlip.style.visibility = "visible";
    sprite.style.display = "none";
    spriteFlip.style.display = "block";
    finalX = currentX + newX;
    finalY = currentY + newY;
  } else if (r < 0.75) {
    sprite.style.visibility = "visible";
    spriteFlip.style.visibility = "hidden";
    sprite.style.display = "block";
    spriteFlip.style.display = "none";
    finalX = currentX - newX;
    finalY = currentY + newY;
  } else {
    sprite.style.visibility = "hidden";
    spriteFlip.style.visibility = "visible";
    sprite.style.display = "none";
    spriteFlip.style.display = "block";
    finalX = currentX + newX;
    finalY = currentY - newY;
  }

  if (finalX < limitMinX) {
    finalX = limitMinX;
  } else if (finalX > limitMaxX) {
    finalX = limitMaxX;
  }

  if (finalY < limitMinY) {
    finalY = limitMinY;
  } else if (finalY > limitMaxY) {
    finalY = limitMaxY;
  }

  sprunki.style.transform = `translate(${finalX}px, ${finalY}px)`;

  sprunki.dataset.x = finalX;
  sprunki.dataset.y = finalY;

  await sleep(duration);

  sprunki.dataset.action = "none";

  sprite.style.backgroundImage = image;
  spriteFlip.style.backgroundImage = image;
  if (sprunki == document.getElementById("simon")) {
    spriteFlip.style.transform = "scaleX(1)";
    sprite.style.transform = "scaleX(-1)";
  }
};

const returnRandomTalk = (talkArray) => {
  let index = Math.floor(Math.random() * talkArray.length);
  return index;
};

//#endregion functions

//#region polo

// !!! = ALL chances must add up to 100%

let poloEnabled = false;

let polo = document.getElementById("polo");
let poloImage = "url('../img/polo/polo.png')";
let poloSprite = document.getElementsByClassName("poloSprite")[0];
let poloSpriteFlip = document.getElementsByClassName("poloSpriteFlip")[0];

let poloArea = document.getElementById("poloArea");
let poloSpeed = 0.1; // seconds per 10px
let poloWalkChance = 65; // percent each [waitMin - waitMax] while not acting
let poloWaitMin = 1; // seconds
let poloWaitMax = 2; // seconds
let poloWalkRangeMin = 40;
let poloWalkRangeMax = 200;

const runPolo = async () => {
  animatePolo();
  while (true) {
    if (
      polo.dataset.action === "none" &&
      Math.floor(Math.random() * 101) < poloWalkChance
    ) {
      // sprunki, area, speed, walkMin, walkMax, sprite, spriteFlip, image
      await move(
        polo,
        poloArea,
        poloSpeed,
        poloWalkRangeMin,
        poloWalkRangeMax,
        poloSprite,
        poloSpriteFlip,
        poloImage,
      );
    }
    await sleep(Math.random() * (poloWaitMax - poloWaitMin) + poloWaitMin);
  }
};

const animatePolo = async () => {
  while (true) {
    if (polo.dataset.action == "walk" || polo.dataset.action == "sprint") {
      poloSprite.style.rotate = "5deg";
      poloSpriteFlip.style.rotate = "-5deg";
      await sleep(0.15);

      poloSprite.style.rotate = "-5deg";
      poloSpriteFlip.style.rotate = "5deg";
      await sleep(0.15);
    } else {
      poloSprite.style.rotate = "0deg";
      poloSpriteFlip.style.rotate = "0deg";
      await sleep(0.05);
    }
  }
};

//#endregion polo

// simon can be used as sprunki template
//#region simon

let simonEnabled = true;

let simon = document.getElementById("simon");
let simonImage = "url('../img/simon/simon.png')";
let simonSprite = document.getElementsByClassName("simonSprite")[0];
let simonSpriteFlip = document.getElementsByClassName("simonSpriteFlip")[0];

let simonArea = document.getElementById("simonArea");
let simonSpeed = 0.045; // seconds per 10px
let simonWaitMin = 0.5; // seconds
let simonWaitMax = 1; // seconds
let simonWalkRangeMin = 150;
let simonWalkRangeMax = 450;

let simonSitTimeMin = 2;
let simonSitTimeMax = 5;
let simonSitImage = "url('../img/simon/simonSit.png')";

let simonSprintSpeed = 0.015; // seconds per 10px
let simonSprintRangeMin = 250;
let simonSprintRangeMax = 600;
let simonSprintImage = "url('../img/simon/simonRunning.png')";

let simonTalkDiv = document.getElementById("simonTalk");
let simonTalks = ["Hello", "Im simon", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaa"];
let simonWordSpeed = 0.005;
let simonWaitBetweenTalks = 0.5;
let simonWaitAfterTalk = 2;

// Chances
// ! ALL chances (except talk chance) must add up to 100%
let simonWalkChance = 50;
let simonSprintChance = 40;
let simonSitChance = 10;

let simonTalkChance = 70;

const runSimon = async () => {
  animateSimon();
  talkLoopSimon();
  while (true) {
    // walkChance, sprintChance, sitChance
    let chance = sort(simonWalkChance, simonSprintChance, simonSitChance);
    if (simon.dataset.action === "none" && chance == "walk") {
      // sprunki, area, speed, walkMin, walkMax, sprite, spriteFlip, image
      await move(
        simon,
        simonArea,
        simonSpeed,
        simonWalkRangeMin,
        simonWalkRangeMax,
        simonSprite,
        simonSpriteFlip,
        simonImage,
      );
    } else if (simon.dataset.action === "none" && chance == "sprint") {
      // sprunki, area, sprintSpeed, sprintMin, sprintMax, sprite, spriteFlip, image, sprintImage
      await sprint(
        simon,
        simonArea,
        simonSprintSpeed,
        simonSprintRangeMin,
        simonSprintRangeMax,
        simonSprite,
        simonSpriteFlip,
        simonImage,
        simonSprintImage,
      );
    } else if (simon.dataset.action === "none" && chance == "sit") {
      // sprunki, sprite, spriteFlip, image, sitImage, sitTimeMin, sitTimeMax
      await sit(
        simon,
        simonSprite,
        simonSpriteFlip,
        simonImage,
        simonSitImage,
        simonSitTimeMin,
        simonSitTimeMax,
      );
    }

    await sleep(Math.random() * (simonWaitMax - simonWaitMin) + simonWaitMin);
  }
};

const animateSimon = async () => {
  while (true) {
    if (simon.dataset.action == "walk" || simon.dataset.action == "sprint") {
      simonSprite.style.rotate = "5deg";
      simonSpriteFlip.style.rotate = "-5deg";
      await sleep(0.15);
      simonSprite.style.rotate = "-5deg";
      simonSpriteFlip.style.rotate = "5deg";
      await sleep(0.15);
    } else {
      simonSprite.style.rotate = "0deg";
      simonSpriteFlip.style.rotate = "0deg";
      await sleep(0.05);
    }
  }
};

const talkLoopSimon = async () => {
  while (true) {
    let random = Math.floor(Math.random() * 101);

    if (random <= simonTalkChance) {
      simonTalkDiv.style.visibility = "visible";
      const fullPhrase = simonTalks[returnRandomTalk(simonTalks)];
      const letters = fullPhrase.split("");
      simonTalkDiv.innerHTML = "";

      for (let i = 0; i < letters.length; i++) {
        simonTalkDiv.innerHTML += letters[i];
        await sleep(simonWordSpeed);
      }

      await sleep(simonWaitAfterTalk);
  
      simonTalkDiv.style.visibility = "hidden";
      simonTalkDiv.innerHTML = "";
    }

    await sleep(simonWaitBetweenTalks);
  }
};

//#endregion simon

//#region run

const run = () => {
  // run template

  if (poloEnabled == true) {
    runPolo();
  } else {
    polo.remove();
  }

  if (simonEnabled == true) {
    runSimon();
  } else {
    simon.remove();
  }
};
run();

//#endregion run
