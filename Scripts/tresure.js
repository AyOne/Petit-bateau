

const TRESURES = []

function Tresure(object){
	const name = object.name
	const position = {
		x:0,
		y:0
	}
	let rdy = false
	let taken = false
	let expose = null


	let div = document.createElement("div")
	div.className = "tresure"
	div.id = name
	let img = document.createElement("img")
	img.src = "Sprites/crew.png"
	img.className = "sprite"
	div.appendChild(img)
	img.onload = () => {
		document.body.appendChild(div)
		position.x = object.x
		position.y = object.y

		let abs_coords = GRID.grid_to_abs({x:position.x, y:position.y})
		gsap.to("#" + name, {
			duration: 0,
			x: abs_coords.x + 16 - img.clientWidth / 2,
			y: abs_coords.y + 16 - img.clientHeight / 2,
		})
	}

	function collect(){
		document.body.removeChild(div)
		let index = TRESURES.indexOf(expose)
		if (index > -1){
			TRESURES.splice(index, 1)
		}
	}

	expose = {
		name:name,
		collect:collect,
		get position(){
			return position
		},
		get x(){
			return position.x
		},
		get y(){
			return position.y
		},
		set taken(value){
			taken = value
		},
		get taken(){
			return taken
		},
	}

	TRESURES.push(expose)
	return expose
}