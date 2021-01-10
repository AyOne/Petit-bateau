




const GRID = {
	//initialize the playground
	//do not init more than one time !
	init_grid: (selected_map) => {
		let upper_wrapper = document.getElementById("upper_grid");
		let lower_wrapper = document.getElementById("lower_grid");
		for (let x = 0; x < selected_map.max_x; x++)
		{
			for (let y = 0; y < selected_map.max_y; y++)
			{
				//upper
				let upper = document.createElement("img");
				upper.className = "sprite tile";
				upper.id = "ux" + x + "y" + y;
				upper.style.gridRow = x + 1;
				upper.style.gridColumn = y + 1;
				upper.src = selected_map.upper_map[x][y] == 00 ? "" : "Sprites/Tiles/tile_" + selected_map.upper_map[x][y] + ".png";
				upper_wrapper.appendChild(upper);


				//lower
				let lower = document.createElement("img");
				lower.className = "sprite tile";
				lower.id = "lx" + x + "y" + y;
				lower.style.gridRow = x + 1
				lower.style.gridColumn = y + 1
				lower.src = selected_map.lower_map[x][y] == 00 ? "" : "Sprites/Tiles/tile_" + selected_map.lower_map[x][y] + ".png"
				lower_wrapper.appendChild(lower)
			}
		}
	},

	//translate grid coords to absolute coords
	grid_to_abs: ({x = -1, y = -1, grid_x = -1, grid_y = -1}) => {
		x = x == -1 ? grid_x : x;
		y = y == -1 ? grid_y : y;
		if (x == -1 || y == -1)
			return null
		let rect = document.getElementById("ux" + x + "y" + y).getBoundingClientRect()
		return {x:rect.top, y:rect.left}
	},

	//translate absolute coords to grid coords
	abs_to_grid: ({x = -1, y = -1, abs_x = -1, abs_y = -1}) => {
		return null
	},

}







