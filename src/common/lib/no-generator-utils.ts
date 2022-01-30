import * as blake2 from 'blake2'

export class NoGeneratorUtils {
  static getRandomArbitrary(): string {
    return (Math.random() * (999999 - 100000) + 100000).toFixed(0)
  }

  static async generateCode(length: number = 8): Promise<any> {
    const code = (this.getRandomArbitrary()) + Date.now().toString()
    const h = await blake2.createHash('blake2b', { digestLength: length })
    await h.update(Buffer.from(code))
    return h.digest('hex');
  }
}
