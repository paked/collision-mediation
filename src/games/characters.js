class Characters extends Game {
  constructor(id) {
    super(id)

    this.steven = new PIXI.Sprite(stevenTexture(this.r))
    this.steven.x = this.r.width/2 - this.steven.width/2
    this.steven.y = 20

    this.reina = new PIXI.Sprite(reinaTexture(this.r))
    this.reina.x = this.r.width/2 - this.reina.width/2
    this.reina.y = this.r.height/2 - this.reina.height/2

    this.stage.addChild(this.steven)
    this.stage.addChild(this.reina)
  }
}
