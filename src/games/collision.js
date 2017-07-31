class Collision extends Game {
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
}
