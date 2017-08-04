// up = k, left = h, right = l
INPUT_DEFAULTS = { up: 75, down: 74, left: 72, right: 76 }

class Input {
	constructor(conf) {
		this.conf = conf || INPUT_DEFAULTS
		this.states = { up: false, down: false, left: false, right: false }

    if (!window.im) {
      window.im = new InputManager()
    }

    window.im.addDown(ev => { this.handleKeyPress(ev, true, this) })
    window.im.addUp(ev => { this.handleKeyPress(ev, false, this) })
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

class InputManager {
  constructor() {
    this.downs = []
    this.ups = []

    this.onkeydown = this.onkeydown.bind(this)
    this.onkeyup = this.onkeyup.bind(this)

    window.document.onkeydown = this.onkeydown
    window.document.onkeyup = this.onkeyup
  }

  addDown(f) {
    this.downs.push(f)
  }

  addUp(f) {
    this.ups.push(f)
  }

  onkeydown(ev) {
    this.downs.forEach(c => {
      c(ev)
    })
  }

  onkeyup(ev) {
    this.ups.forEach(c => {
      c(ev)
    }) 
  }
}
