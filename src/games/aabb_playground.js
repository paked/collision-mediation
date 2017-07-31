class AABBPlayground extends Game {
  constructor(id) {
    super(id)

    let mid = new Point(this.r.width/2, this.r.height/2)

    this.anchorA = this.createAnchor(mid.x - 75, mid.y - 125)
    this.anchorB = this.createAnchor(mid.x + 75, mid.y + 125)

    this.box = this.createBox(this.anchorA, this.anchorB)
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

    g.drawRect(0, 0, bb.width, bb.height)
    g.endFill()

    g.x = bb.x
    g.y = bb.y
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

  createBox(anchorA, anchorB) {
    let b = new PIXI.Graphics()
    b.interactive = true

    b.
      on('pointerdown', this.anchorDragStart).
      on('pointerup', this.anchorDragEnd).
      on('pointerupoutside', this.anchorDragEnd).
      on('pointermove', this.boxDragMove)

    b.a1 = anchorA
    b.a2 = anchorB

    console.log(b.interactive)

    return b
  }
 
  createAnchor(x, y) {
    let anchor = new PIXI.Sprite(anchorTexture(this.r))

    anchor.interactive = true

    anchor.raw = new Point()
    
    anchor.setPos = function(x, y) {
      console.log(x, y, this)
      anchor.raw.x = x
      anchor.raw.y = y

      let s = snapPointToGrid(25, anchor.raw.x, anchor.raw.y)

      anchor.x = s.x
      anchor.y = s.y
    }

    anchor.setPos(x, y)

    anchor.
      on('pointerdown', this.anchorDragStart).
      on('pointerup', this.anchorDragEnd).
      on('pointerupoutside', this.anchorDragEnd).
      on('pointermove', this.anchorDragMove)

    return anchor
  }

  boxDragMove(ev) {
    if (this.dragging) {
      let raw = ev.data.getLocalPosition(this.parent)

      let diff = new Point(raw.x - this.lastPoint.x, raw.y - this.lastPoint.y)

      this.a1.setPos(
        this.a1.raw.x + diff.x,
        this.a1.raw.y + diff.y,
      )

      this.a2.setPos(
        this.a2.raw.x + diff.x,
        this.a2.raw.y + diff.y,
      )

      this.lastPoint = raw
    }
  }

  anchorDragStart(ev) {
    this.dragging = true

    this.alpha = 0.5

    this.lastPoint = ev.data.getLocalPosition(this.parent)
  }

  anchorDragEnd(ev) {
    this.dragging = false

    this.alpha = 1
  }

  anchorDragMove(ev) {
    if (this.dragging) {
      let raw = ev.data.getLocalPosition(this.parent);

      console.log(raw)
      this.setPos(raw.x, raw.y)
    }
  }
}

function snapPointToGrid(res, x, y) {
  return new Point(snapIntToGrid(res, x), snapIntToGrid(res, y))
}

function snapIntToGrid(res, i) {
  let diff = i%res
  let round = Math.floor(i/res)

  if (diff >= 0.5) {
    round += 1
  }

  return res*round 
}
