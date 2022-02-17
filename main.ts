const sitelenPona: {[nimi: string]: Image} = {
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

const openEnPini: {[nimi: string]: [number, number]} = {
    o: [1, 4],
    pona: [0, 5]
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
let openNi: number | null = null
let openKama: number | null = null
let piniNi: number | null = null
let piniKama: number | null = null

basic.forever(function () {
    if (lipu.length) {
        if (!nimiNi || !sitelenNi) {
            nimiNi = lipu[nanpaNi]
            sitelenNi = sitelenPona[nimiNi];
            [openNi, piniNi] = openEnPini[nimiNi]
        }
        if (lipu.length > 1) {
            if (!nimiKama || !sitelenKama) {
                nimiKama = lipu[nanpaKama]
                sitelenKama = sitelenPona[nimiKama];
                [openKama, piniKama] = openEnPini[nimiKama]
            }
            for (let x = 0; x < 5; x++) {
                for (let y = 0; y < 5; y++) {
                    led.unplot(x, y)
                    if (sitelenNi.pixel(x + lon + openNi + (piniNi - 4), y))
                        led.plot(x, y)
                    if (sitelenKama.pixel(x + lon + openKama - piniNi, y))
                        led.plot(x, y)
                }
            }
            lon++
            if (lon >= piniNi - openKama + 1) {
                lon = 0
                nanpaNi++
                nanpaKama++
                if (nanpaNi >= lipu.length)
                    nanpaNi = 0
                if (nanpaKama >= lipu.length)
                    nanpaKama = 0
                nimiNi = lipu[nanpaNi]
                sitelenNi = sitelenPona[nimiNi];
                [openNi, piniNi] = openEnPini[nimiNi]
                nimiKama = lipu[nanpaKama]
                sitelenKama = sitelenPona[nimiKama];
                [openKama, piniKama] = openEnPini[nimiKama]
            }
        } else {
            sitelenNi.showImage(0, 0)
        }
    }
    pause(400)
})
