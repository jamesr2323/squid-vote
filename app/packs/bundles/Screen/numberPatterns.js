let numbers = []
numbers[0] = `000000
00  00
00  00
00  00
000000`

numbers[1] = `1111
  11
  11
  11
111111`

numbers[2] = `222222
     2
222222
2
222222`

numbers[3] = `333333
    33
333333
    33
333333`

numbers[4] = `44  44
44  44
444444
    44
    44`

numbers[5] = `555555
55
555555
    55
555555`

numbers[6] = `666666
66
666666
66  66
666666`

numbers[7] = `777777
    77
    77
    77
    77`

numbers[8] = `888888
88  88
888888
88  88
888888`

numbers[9] = `999999
99  99
999999
    99
999999`

const width = 6

const numberPatterns = numbers.map((number, i) => {
  return number.split("\n").map(row => {
    const digits = row.split('').map(char => char === ' ' ? 0 : 1)
    return _.assign(_.fill(new Array(width), 0), digits)
  })
})

export default numberPatterns