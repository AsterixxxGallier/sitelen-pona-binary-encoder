const sitelenPona: { [nimi: string]: Image } = {
    o: images.createImage(`
        . . . . .
        . . # . .
        . # . # .
        . . # . .
        . . . . .
    `),
    a: images.createImage(`
        . . . . .
        . . # . .
        . # . # .
        . . # . #
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

const openNimi: { [nimi: string]: number } = {}
const piniNimi: { [nimi: string]: number } = {}
const suliNimi: { [nimi: string]: number } = {}

Object.keys(sitelenPona).forEach(nimi => {
    const sitelen = sitelenPona[nimi]
    let open = -1
    let pini = 0
    for (let x = 0; x < 5; x++) {
        let empty = true
        for (let y = 0; y < 5; y++)
            if (sitelen.pixel(x, y))
                empty = false
        if (!empty) {
            if (open == -1)
                open = x
            pini = x + 1
        }
    }
    openNimi[nimi] = open
    piniNimi[nimi] = pini
    suliNimi[nimi] = pini - open
})

let lipu: string[] = []
let lonNimi: number[] = []
let piniLipu: number = 0

function paliSin(nimi: string) {
    lipu.push(nimi)
    lonNimi.push(piniLipu)
    piniLipu += suliNimi[nimi] + 1
}

input.onButtonPressed(Button.A, function () {
    paliSin("a")
})

input.onButtonPressed(Button.B, function () {
    paliSin("pona")
})

let lon = -4
basic.forever(function () {
    if (lipu.length) {
        const sitelenSin = images.createImage("")
        lipu.forEach((nimi, nanpa) => {
            const sitelen = sitelenPona[nimi]
            for (let x = 0; x < 5; x++)
                for (let y = 0; y < 5; y++)
                    if (sitelen.pixel(x - lonNimi[nanpa] + openNimi[nimi] + lon, y))
                        sitelenSin.setPixel(x, y, true)
        })
        sitelenSin.showImage(0, 0)
        lon++
        if (lon >= piniLipu) {
            lon = -4
        }
    }
    pause(100)
})