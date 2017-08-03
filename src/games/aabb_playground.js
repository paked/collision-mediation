class AABBPlayground extends Game {
  constructor(id) {
    super(id)

    let mid = new Point(this.r.width/2, this.r.height/2)

    this.box = this.createBox()

    this.box.x = mid.x - this.box.size.x/2
    this.box.y = mid.y - this.box.size.y/2

    this.boxMin = this.createAnchor(mid.x - 75, mid.y - 75, this.box, true)
    this.boxMax = this.createAnchor(mid.x + 75, mid.y + 75, this.box, false)

    let textSettings = { align: 'center' }

    this.widthText = new PIXI.Text("", textSettings)
    this.widthText.anchor.x = 0.5
    this.widthText.anchor.y = 1
    this.heightText = new PIXI.Text("", textSettings)
    this.heightText.anchor.x = 0
    this.heightText.anchor.y = 0.5

    this.stage.addChild(this.box)
    this.stage.addChild(this.boxMin)
    this.stage.addChild(this.boxMax)

    this.stage.addChild(this.widthText)
    this.stage.addChild(this.heightText)
  }

  update(dt) {
    let g = this.box

    let pw = this.box.size.x.toFixed(0)
    let ph = this.box.size.y.toFixed(0)

    g.clear()

    if (pw == 100 && ph == 100) {
      g.beginFill(0x88C8DD)
    } else if (pw == 200 && ph == 50) {
      g.beginFill(0xECA5B3)
    } else {
      g.beginFill(0x9EDD88)
    }

    this.box.size.x = parseInt(pw)
    this.box.size.y = parseInt(ph)

    g.drawRect(0, 0, this.box.size.x, this.box.size.y)
    g.endFill()

    this.widthText.x = g.x + g.width/2
    this.widthText.y = g.y

    this.heightText.x = g.x + g.width
    this.heightText.y = g.y + g.height/2

    this.widthText.text = pw.toString()
    this.heightText.text = ph.toString()

    this.boxMin.x = g.x
    this.boxMin.y = g.y

    this.boxMax.x = g.x + this.box.size.x
    this.boxMax.y = g.y + this.box.size.y
  }

  createAnchor(x, y, box, upper) {
    let anchor = new PIXI.Sprite(anchorTexture(this.r))
    anchor.anchor.x = 0.5
    anchor.anchor.y = 0.5

    anchor.x = x
    anchor.y = y

    anchor.box = box
    anchor.isUpper = upper

    anchor.interactive = true

    anchor.
      on('pointerdown', this.dragStart).
      on('pointerup', this.dragEnd).
      on('pointerupoutside', this.dragEnd).
      on('pointermove', this.anchorDragMove)

    return anchor
  }

  createBox() {
    let b = new PIXI.Graphics()
    b.interactive = true

    b.size = new Point(100, 100)

    b.
      on('pointerdown', this.dragStart).
      on('pointerup', this.dragEnd).
      on('pointerupoutside', this.dragEnd).
      on('pointermove', this.boxDragMove)

    return b
  }

  dragStart(e) {
    this.dragging = true

    this.lastPos = e.data.getLocalPosition(this.parent);
  }

  dragEnd(e) {
    this.dragging = false
  }

  boxDragMove(ev) {
    if (this.dragging) {
      let raw = ev.data.getLocalPosition(this.parent)

      let diff = new Point(raw.x - this.lastPos.x, raw.y - this.lastPos.y)

      this.x += diff.x
      this.y += diff.y

      this.lastPos = raw
    }
  }

  anchorDragMove(ev) {
    if (this.dragging) {
      let raw = ev.data.getLocalPosition(this.parent)

      let diff = new Point(raw.x - this.lastPos.x, raw.y - this.lastPos.y)
      if (this.isUpper) {
        let ogSize = this.box.size

        this.box.size.x -= diff.x
        this.box.size.y -= diff.y

        this.box.x += diff.x
        this.box.y += diff.y
      } else {
        this.box.size.x += diff.x
        this.box.size.y += diff.y
      }

      this.lastPos = raw
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
