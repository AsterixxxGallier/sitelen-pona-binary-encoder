const sitelenPona: {[id: string]: Image} = {
    o: images.createImage(`
        . . . . .
        . . # . .
        . # . # .
        . . # . .
        . . . . .
    `),
    pona: images.createImage(`
        . . . . .
        . . . . .
        # . . . #
        . # # # .
        . . . . .
    `)
}

let lipu: string[] = []

input.onButtonPressed(Button.A, function () {
    lipu.push("o")
})

input.onButtonPressed(Button.B, function () {
    lipu.push("pona")
})

let lon = 0
let nanpaNi = 0
let nanpaKama = 1
let nimiNi: string | null = null
let nimiKama: string | null = null
let sitelenNi: Image | null = null
let sitelenKama: Image | null = null

basic.forever(function () {
    if (lipu.length) {
        if (!nimiNi || !sitelenNi) {
            nimiNi = lipu[nanpaNi]
            sitelenNi = sitelenPona[nimiNi]
        }
        if (lipu.length > 1) {
            if (!nimiKama || !sitelenKama) {
                nimiKama = lipu[nanpaKama]
                sitelenKama = sitelenPona[nimiKama]
            }
            for (let x = 0; x < 5; x++) {
                for (let y = 0; y < 5; y++) {
                    led.unplot(x, y)
                    if (sitelenNi.pixel(x + lon, y))
                        led.plot(x, y)
                    if (sitelenKama.pixel(x + lon - 5, y))
                        led.plot(x, y)
                }
            }
            lon++
        } else {
            sitelenNi.showImage(0, 0)
        }
    }
    pause(1000)
})
