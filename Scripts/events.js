

const keydown = (event) => {

	PLAYERS.forEach(player => {
		if (event.key == "ArrowUp")
		{
			player.y -= 1;
			player.rotation = "up";
		}
		else if (event.key == "ArrowDown")
		{
			player.y += 1;
			player.rotation = "down";
		}
		else if (event.key == "ArrowRight")
		{
			player.x += 1;
			player.rotation = "right";
		}
		else if (event.key == "ArrowLeft")
		{
			player.x -= 1;
			player.rotation = "left";
		}
	})
}