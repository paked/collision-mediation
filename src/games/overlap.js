class Overlap extends Characters {
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
  }
}
