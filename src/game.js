class Game {
  constructor() {
    this.r = PIXI.autoDetectRenderer(600, 400, { antialias: true })
    document.body.appendChild(this.r.view)

    this.r.backgroundColor = 0xE0E0E0

    this.stage = new PIXI.Container()

    this.steven = new PIXI.Sprite(stevenTexture(this.r))
    this.reina = new PIXI.Sprite(reinaTexture(this.r))

    this.stage.addChild(this.steven)
    this.stage.addChild(this.reina)

    this.render = this.render.bind(this)

    this.input = new Input()

    this.time = 0

    requestAnimationFrame(this.render)
  }

  update(dt) {
    if (this.input.up) {
      this.steven.y -= 50*dt
    }

    if (this.input.down) {
      this.steven.y += 50*dt
    }

    if (this.input.left) {
      this.steven.x -= 50*dt
    }

    if (this.input.right) {
      this.steven.x += 50*dt
    }
  }

  render(now) {
    let dt = (now - this.time)/100
    this.time = now

    this.update(dt)

    this.r.render(this.stage)

    requestAnimationFrame(this.render)
  }
}
