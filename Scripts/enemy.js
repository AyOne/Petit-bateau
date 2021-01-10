

//array of all enemies
const ENEMIES = []


//this function is to considerate as a class constructor.
function Enemy(object){
	//private variables
	const name = object.name
	const position = {
		x:0,
		y:0
	}
	var rotation = 0
	var rdy = false
	var interval = null
	let expose = null


	//private functions
	const move = (instant = false) => {
		if (rdy){
			let abs_coords = GRID.grid_to_abs({x:position.x, y:position.y})
			let img = document.getElementById(name);
			gsap.to("#" + name, {
				duration: instant ? 0 : 0.5,
				x: abs_coords.x + 16 - img.clientWidth / 2,
				y: abs_coords.y + 16 - img.clientHeight / 2,
			})
		}
	}

	const rotate = (instant = false) => {
		if (rdy){
			gsap.to("#" + name, {
				duration: instant ? 0 : 0.1,
				rotation: rotation,
			})
		}
	}

	const stop = () => {
		if (interval != null){
			clearInterval(interval)
			interval = null
		}
	}

	const remove = () => {
		stop()
		let index = ENEMIES.indexOf(expose)
		if (index > -1){
			ENEMIES.splice(index, 1)
		}
		let div = document.getElementById(name)
		document.body.removeChild(div)
	}

	let actual_move = -2;
	let forward = true;
	let ended = false
	const start = () => {
		if (object.move && interval == null){
			interval = setInterval(() => {
				if (!ended){
					if (actual_move >= 0){
						let pos = object.moves[actual_move]
						if (position.y > pos.y){
							expose.rotation = "up"
						}else if (position.y < pos.y){
							expose.rotation = "down"
						}else if (position.x > pos.x){
							expose.rotation = "left"
						}else if (position.x < pos.x){
							expose.rotation = "right"
						}
						position.x = pos.x
						position.y = pos.y
						move()
						if (forward){
							actual_move += 1
							if (actual_move >= object.moves.length){
								if (object.loop_back){
									forward = !forward
									actual_move -= 2
								}else if (object.loop){
									actual_move = 0;
								}else{
									clearInterval(interval)
									interval = null
									ended = true
								}
							}
						}else{
							actual_move -= 1
						}
					}else{
						if (actual_move == -1 && object.loop_back && !forward){
							position.x = object.start.x
							position.y = object.start.y
							move()
							if (object.loop){
								forward = true
								actual_move = 0
							}else{
								clearInterval(interval);
								interval = null
								ended = true
							}
						}else{
							actual_move += 1
						}
					}
				}else{
					clearInterval(interval);
					interval = null
				}
				
			}, 1000)
		}
	}
	

	//constructor behaviour
	let div = document.createElement("div")
	div.className = "ship enemy"
	div.id = name
	let img = document.createElement("img")
	img.src = "Sprites/Ships/enemy_ship.png"
	img.className = "sprite"
	div.appendChild(img)
	img.onload = () => {
		rdy = true
		document.body.appendChild(div)
		position.x = object.start.x
		position.y = object.start.y
		move(true)
	}

	//public variables and functions
	expose = {
		name:name,

		set x(value){
			position.x = value
			move()
		},
		set y(value){
			position.y = value
			move()
		},
		get x(){
			return position.x
		},
		get y(){
			return position.y
		},
		set position({x, y}){
			position.x = x
			position.y = y
			move()
		},
		//aled. idc anymore, i'm doing a switch cascade !
		set rotation(value){
			let direction = rotation / 90 % 4
			let offset = 0
			switch(direction){
				case 0:
				default:
					switch(value){
						case "up":
						default:
							offset = 2
							break;
						case "down":
							offset = 0
							break;
						case "left":
							offset = 1
							break;
						case "right":
							offset = -1
							break;
					}
					break;
				case -1:
				case 3:
					switch(value){
						case "up":
						default:
							offset = -1
							break;
						case "down":
							offset = 1
							break;
						case "left":
							offset = 2
							break;
						case "right":
							offset = 0
							break;
					}
					break;
				case 2:
				case -2:
					switch(value){
						case "up":
						default:
							offset = 0;
							break;
						case "down":
							offset = 2
							break;
						case "left":
							offset = -1
							break;
						case "right":
							offset = 1
							break;
					}
					break;
				case -3:
				case 1:
					switch(value){
						case "up":
							offset = 1
						default:
							break;
						case "down":
							offset = -1
							break;
						case "left":
							offset = 0
							break;
						case "right":
							offset = 2
							break;
					}
					break;
			}
			rotation += offset * 90
			rotate()
		},

		stop:stop,
		start:start,
		remove:remove,
	}

	ENEMIES.push(expose)

	return expose
}