class Overlap extends Characters {
  constructor(id) {
    super(id)

    this.light = new PIXI.Graphics()
    this.light.radius = 30
    this.light.padding = 10

    this.stage.addChild(this.light)
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

    let a = this.physics.toAABB(this.steven)
    let b = this.physics.toAABB(this.reina)

    let g = this.light
    g.clear()

    if (this.physics.intersects(a, b)) {
      g.beginFill(0x9EDD88)
    } else {
      g.beginFill(0xECA5B3)
    }

    let offset = this.light.radius + this.light.padding

    g.drawCircle(offset, offset, this.light.radius)

    g.endFill()
  }
}
