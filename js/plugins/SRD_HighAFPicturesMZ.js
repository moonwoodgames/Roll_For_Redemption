(function () {
	
	const highPictureIds = [
		// Place Pictures IDs in here you want to appear above HUD Maker.
		// They must be separated by commas.

		71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 91
	];

	Spriteset_Base.prototype.createPictures = function () {
		const rect = this.pictureContainerRect();
		this._pictureContainer = new Sprite();
		this._pictureContainer.setFrame(
			rect.x,
			rect.y,
			rect.width,
			rect.height,
		);
		for (let i = 1; i <= $gameScreen.maxPictures(); i++) {
			// If the ID is in `highPictureIds`, don't generate the Sprite_Picture here.
			if (highPictureIds.includes(i)) continue;

			this._pictureContainer.addChild(new Sprite_Picture(i));
		}
		this.addChild(this._pictureContainer);
	};

	const _Scene_Map_start = Scene_Map.prototype.start;
	Scene_Map.prototype.start = function () {
		_Scene_Map_start.apply(this, arguments);
		// Add pictures on Map directly. This will be above HUD Maker if this plugin is
		// placed below SRD_HUDMaker.js
		for (const pictureId of highPictureIds) {
			this.addChild(new Sprite_Picture(pictureId));
		}

	};
})();