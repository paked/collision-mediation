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

  intersection(a, b) {
    let x1 = b.x
    let y1 = b.y
    let x2 = b.x + b.width
    let y2 = b.y + b.height

    if (a.x > x1) {
      x1 = a.x
    }

    if (a.y > y1) {
      y1 = a.y
    }

    if (a.x + a.width < x2) {
      x2 = a.x + a.width
    }

    if (a.y + a.height < y2) {
      y2 = a.y + a.height
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
