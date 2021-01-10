

let _interval_ = null

const COLLISION = {

	start: () => {
		_interval_ = setInterval(() => {
			PLAYERS.forEach((player) => {
				ENEMIES.forEach((enemie) => {
					if (player.x == enemie.x && player.y == enemie.y){
						//console.log(player.name + " should have died by the hand of " + enemie.name)
						window.location.href = "lost.html";
					}
				})
				TRESURES.forEach((tresure) => {
					if (player.x == tresure.x && player.y == tresure.y){
						//console.log(player.name + " have taken the tresure " + tresure.name)
						tresure.collect()
					}
				})
				if (TRESURES.length == 0){
					window.location.href = "win.html";
				}
			})
		}, 100);
	},

	stop: () => {

	}
}