class Game {
  constructor() {
    this.r = PIXI.autoDetectRenderer(600, 400, { antialias: true })
    document.body.appendChild(this.r.view)

    this.r.backgroundColor = 0xE0E0E0

    this.stage = new PIXI.Container()

    this.steven = new PIXI.Sprite(stevenTexture(this.r))
    this.reina = new PIXI.Sprite(reinaTexture(this.r))

    this.reina.x = this.r.width/2 - this.reina.width/2
    this.reina.y = this.r.height/2 - this.reina.height/2

    this.stage.addChild(this.steven)
    this.stage.addChild(this.reina)

    this.render = this.render.bind(this)

    this.input = new Input()
    this.physics = new Physics()

    this.time = 0

    requestAnimationFrame(this.render)
  }

  update(dt) {
    let next = new Point(this.steven.x, this.steven.y)

    if (this.input.up) {
      next.y -= 50*dt
    }

    if (this.input.down) {
      next.y += 50*dt
    }

    let b = this.physics.toAABB(this.reina)
    let a = new AABB(next, new Point(this.steven.x + this.steven.width, next.y + this.steven.height))

    let i = this.physics.intersection(a, b)
    if (i) {
      let diff = next.y - this.steven.y
      let mod = diff <= 0 ? 1 : -1

      next.y += i.height * mod
    }

    this.steven.y = next.y

    if (this.input.left) {
      next.x -= 50*dt
    }

    if (this.input.right) {
      next.x += 50*dt
    }

    a = new AABB(next, new Point(next.x + this.steven.width, this.steven.y + this.steven.height))

    i = this.physics.intersection(a, b)
    if (i) {
      let diff = next.x - this.steven.x
      let mod = diff <= 0 ? 1 : -1

      next.x += i.width * mod
    }

    this.steven.x = next.x
  }

  render(now) {
    let dt = (now - this.time)/100
    this.time = now

    this.update(dt)

    this.r.render(this.stage)

    requestAnimationFrame(this.render)
  }
}
