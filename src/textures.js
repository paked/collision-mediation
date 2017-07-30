function stevenTexture(r) {
  var g = new PIXI.Graphics()

  g.beginFill(0x88C8DD)
  g.drawRect(0, 0, 100, 100)
  g.endFill()

  var t = PIXI.RenderTexture.create(g.width, g.height);

  r.render(g, t)

  return t
}

function reinaTexture(r) {
  var g = new PIXI.Graphics()

  g.beginFill(0xECA5B3)

  g.drawRect(0, 0, 200, 50)
  g.endFill()

  var t = PIXI.RenderTexture.create(g.width, g.height);

  r.render(g, t)

  return t
}
