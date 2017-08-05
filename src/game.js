class Game {
  constructor(id) {
    let width = 600
    let height = 400
    let settings = { antialias: true }

    if (id) {
      let elem = document.getElementById(id)
      settings.view = elem
    }

    this.r = PIXI.autoDetectRenderer(width, height, settings)

    this.r.backgroundColor = 0xE0E0E0

    this.stage = new PIXI.Container()

    this.render = this.render.bind(this)

    this.input = new Input()
    this.physics = new Physics()

    this.time = 0

    requestAnimationFrame(this.render)

    if (!id) {
      document.body.appendChild(this.r.view)
    }

    this.stage.interactive = true

    this.stage.hitArea = new PIXI.Rectangle(0, 0, 1000, 1000);

    this.stage.paused = false

    this.stage.on('pointerdown', this.inFocus)
    this.stage.on('pointerupoutside', this.outOfFocus)
  }

  inFocus(ev) {
    this.paused = false
  }

  outOfFocus(ev) {
    this.paused = true
  }

  update(dt) {}

  render(now) {
    console.log(this.stage.paused)

    let dt = (now - this.time)/100
    this.time = now

    if (!this.stage.paused) {
      this.update(dt)

      this.r.render(this.stage)
    }

    requestAnimationFrame(this.render)
  }
}
