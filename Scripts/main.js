var timeline = gsap.timeline();

const SELECTED_MAP = MAP_TEST


GRID.init_grid(SELECTED_MAP)

// player init
let player = new Player(MAP_TEST.start, SELECTED_MAP)


//enemies init
SELECTED_MAP.enemies.forEach((element) => {
	let enemy = new Enemy(element)
	enemy.start()
});

SELECTED_MAP.tresures.forEach((element) => {
	let tresure = new Tresure(element)
})

//start collision system
setTimeout(() => {
	COLLISION.start()
}, 200);