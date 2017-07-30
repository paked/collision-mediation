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
  }

  update(dt) {}

  render(now) {
    let dt = (now - this.time)/100
    this.time = now

    this.update(dt)

    this.r.render(this.stage)

    requestAnimationFrame(this.render)
  }
}
