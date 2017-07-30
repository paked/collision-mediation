class AABBPlayground extends Game {
  constructor(id) {
    super(id)

    let mid = new Point(this.r.width/2, this.r.height/2)

    this.anchorA = this.createAnchor(mid.x - 75, mid.y - 125)
    this.anchorB = this.createAnchor(mid.x + 75, mid.y + 125)

    this.box = new PIXI.Graphics()
    this.stage.addChild(this.box)

    this.stage.addChild(this.anchorA)
    this.stage.addChild(this.anchorB)
  }

  update(dt) {
    let g = this.box
    let bb = this.boxBounds()

    g.clear()

    if (bb.width == 100 && bb.height == 100) {
      g.beginFill(0x88C8DD)
    } else if (bb.width == 200 && bb.height == 50) {
      g.beginFill(0xECA5B3)
    } else {
      g.beginFill(0x9EDD88)
    }

    g.drawRect(bb.x, bb.y, bb.width, bb.height)
    g.endFill()
  }

  boxBounds() {
    let awidth = this.anchorA.width
    let aheight = this.anchorA.height

    let min = new Point()
    min.x = this.anchorA.x + awidth/2
    min.y = this.anchorA.y + aheight/2

    let max = new Point()
    max.x = this.anchorB.x + awidth/2
    max.y = this.anchorB.y + aheight/2

    return new AABB(min, max)
  }
 
  createAnchor(x, y) {
    let anchor = new PIXI.Sprite(anchorTexture(this.r))

    anchor.interactive = true

    anchor.x = x || 0
    anchor.y = y || 0

    anchor.
      on('pointerdown', this.anchorDragStart).
      on('pointerup', this.anchorDragEnd).
      on('pointerupoutside', this.anchorDragEnd).
      on('pointermove', this.anchorDragMove)

    return anchor
  }

  anchorDragStart(ev) {
    this.dragging = true

    this.alpha = 0.5
  }

  anchorDragEnd(ev) {
    this.dragging = false

    this.alpha = 1
  }

  anchorDragMove(ev) {
    if (this.dragging) {
      let raw = ev.data.getLocalPosition(this.parent);

      let snapped = snapPointToGrid(25, raw.x, raw.y)

      this.x = snapped.x;
      this.y = snapped.y;
    }
  }
}

function snapPointToGrid(res, x, y) {
  return new Point(snapIntToGrid(res, x), snapIntToGrid(res, y))
}

function snapIntToGrid(res, i) {
  let diff = i%res
  let round = Math.floor(i/res)

  if (diff > 0.5) {
    round += 1
  }

  return res*round 
}
