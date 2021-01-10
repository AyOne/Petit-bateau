
const PLAYERS = []

//this function is to considerate as a class constructor.
function Player({x, y}, _map){
	//private variables
	const name = "player"
	const map = _map
	const position = {
		x:0,
		y:0
	}
	var rotation = 0
	var rdy = false


	//private functions
	const move = (instant = false) => {
		if (rdy){
			if (map.collision_map[position.x][position.y] != 1)
			{
				let abs_coords = GRID.grid_to_abs({x:position.x, y:position.y})
				let img = document.getElementById(name);
				gsap.to("#" + name, {
					duration: instant ? 0 : 0.5,
					x: abs_coords.x + 16 - img.clientWidth / 2,
					y: abs_coords.y + 16 - img.clientHeight / 2,
				})
				return true
			}else{
				return false
			}
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

	//constructor behaviour
	let div = document.createElement("div")
	div.className = "ship enemy"
	div.id = name
	let img = document.createElement("img")
	img.src = "Sprites/Ships/player_ship.png"
	img.className = "sprite"
	div.appendChild(img)
	img.onload = () => {
		rdy = true
		document.body.appendChild(div)
		position.x = x
		position.y = y
		move(true)
	}

	//public variables and functions
	let expose = {
		name:name,

		set x(value){
			let buff = position.x
			position.x = value
			if (!move()){
				position.x = buff
			}
		},
		set y(value){
			let buff = position.y
			position.y = value
			if (!move()){
				position.y = buff
			}
		},
		get x(){
			return position.x
		},
		get y(){
			return position.y
		},
		set position({x, y}){
			let buff = position
			position.x = x
			position.y = y
			if (!move()){
				position.x = buff.x
				position.y = buff.y
			}
		},
		//aled. idc anymore, i'm doing a switch cascade !

//		      (-2/2)
//		         |
//		 (1/-3)--O--(-1/3)
//		         |
//		        (0)

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
	}

	PLAYERS.push(expose)

	return expose
}