const sitelenPona: { [nimi: string]: Image } = {
    o: images.createImage(`
        . . . . .
        . # . . .
        # . # . .
        . # . . .
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

const suliNimi: { [nimi: string]: number } = {
}

Object.keys(sitelenPona).forEach(nimi => {
    const sitelen = sitelenPona[nimi]
    let suli = 0
    for (let x = 0; x < 5; x++) {
        let empty = true
        for (let y = 0; y < 5; y++)
            if (sitelen.pixel(x, y))
                empty = false
        if (!empty)
            suli = x + 1
    }
    suliNimi[nimi] = suli
})

let lipu: string[] = []
let lonNimi: number[] = []
let suliLipu: number = 0

function paliSin(nimi: string) {
    lipu.push(nimi)
    lonNimi.push(suliLipu)
    suliLipu += suliNimi[nimi] + 1
}

input.onButtonPressed(Button.A, function () {
    paliSin("o")
})

input.onButtonPressed(Button.B, function () {
    paliSin("pona")
})

let lon = -4
basic.forever(function () {
    if (lipu.length) {
        if (lipu.length > 1) {
            const sitelenSin = images.createImage("")
            lipu.forEach((nimi, nanpa) => {
                const sitelen = sitelenPona[nimi]
                for (let x = 0; x < 5; x++)
                    for (let y = 0; y < 5; y++)
                        if (sitelen.pixel(x - lonNimi[nanpa] + lon, y))
                            sitelenSin.setPixel(x, y, true)
            })
            sitelenSin.showImage(0, 0)
            lon++
            if (lon >= suliLipu) {
                lon = -4
            }
        } else {
            sitelenPona[lipu[0]].showImage(0, 0)
        }
    }
    pause(100)
})