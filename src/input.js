// up = k, left = h, right = l
INPUT_DEFAULTS = { up: 75, down: 74, left: 72, right: 76 }

class Input {
	constructor(conf) {
		this.conf = conf || INPUT_DEFAULTS
		this.states = { up: false, down: false, left: false, right: false }

		window.document.onkeydown = ev => { this.handleKeyPress(ev, true, this) }
		window.document.onkeyup = ev => { this.handleKeyPress(ev, false, this) }
	}

	handleKeyPress(ev, v, input) {
		switch(ev.keyCode) {
			case input.conf.up:
				input.states.up = v
				break
      case input.conf.down:
        input.states.down = v
        break
			case input.conf.left:
				input.states.left = v
				break
			case input.conf.right:
				input.states.right = v
				break
		}
	}

	get up() {
		return this.states.up
	}

  get down() {
    return this.states.down
  }

	get left() {
		return this.states.left
	}

	get right() {
		return this.states.right
	}
}

class Point {
	constructor(x, y) {
		this.x = x || 0
		this.y = y || 0
	}
}

