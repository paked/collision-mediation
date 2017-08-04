class Physics {
  toAABB(thing) {
    if (thing instanceof PIXI.Sprite) {
      return new AABB(
        new Point(thing.x, thing.y),
        new Point(thing.x + thing.width, thing.y + thing.height)
      )
    }

    throw "Don't know how to turn this thing into an AABB"
  }

  intersects(a, b) {
    return b.min.x <= a.max.x &&
      a.min.x <= b.max.x &&
      b.min.y <= a.max.y &&
      a.min.y <= b.max.y
  }

  intersection(a, b) {
    let x1 = b.min.x
    let y1 = b.min.y
    let x2 = b.max.x
    let y2 = b.max.y

    if (a.min.x > x1) {
      x1 = a.x
    }

    if (a.min.y > y1) {
      y1 = a.y
    }

    if (a.max.x < x2) {
      x2 = a.max.x
    }

    if (a.max.y < y2) {
      y2 = a.max.y
    }

    if (x2 <= x1 || y2 <= y1) {
      return null
    }

    return new AABB(new Point(x1, y1), new Point(x2, y2))
  }
}

class AABB {
  constructor(min, max) {
    this.min = min
    this.max = max
  }

  get x() {
    return this.min.x
  }

  get y() {
    return this.min.y
  }

  get width() {
    return this.max.x - this.min.x
  }

  get height() {
    return this.max.y - this.min.y
  }
}

class Point {
  constructor(x, y) {
    this.x = x || 0
    this.y = y || 0
  }
}
