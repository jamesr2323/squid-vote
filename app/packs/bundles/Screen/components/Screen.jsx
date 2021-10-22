import './Screen.scoped.scss'
import numberPatterns from 'Screen/numberPatterns'

const circlePattern = [
  [0,1,1,1,1,1,1,0],
  [1,1,0,0,0,0,1,1],
  [1,1,0,0,0,0,1,1],
  [1,1,0,0,0,0,1,1],
  [1,1,0,0,0,0,1,1],
  [1,1,0,0,0,0,1,1],
  [0,1,1,1,1,1,1,0],
]

const colonPattern = [
  [0,0],
  [1,1],
  [1,1],
  [0,0],
  [0,0],
  [1,1],
  [1,1],
  [0,0]
]

const crossPattern = [
  [1,1,0,0,0,0,1,1],
  [0,1,1,0,0,1,1,0],
  [0,0,1,1,1,1,0,0],
  [0,0,1,1,1,1,0,0],
  [0,0,1,1,1,1,0,0],
  [0,1,1,0,0,1,1,0],
  [1,1,0,0,0,0,1,1],
]

console.log({ numberPatterns })

export default function Screen() {
  const [n, setN] = useState(0)
  const [n2, setN2] = useState(0)
  const [results, setResults] = useState({ red: 0, green: 0 })

  useEffect(() => {
    setInterval(() => {
      axios.get('/results')
      .then(({ data }) => setResults(data))
    }, 300)
  }, [])

  function reset() {
    const csrfToken = document.querySelector('meta[name=csrf-token]')?.content
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
    axios.post('/reset')
  }

  return <div>
    <div className='top'>
      <div className='left'>
        <div className='number'>
          <GridBox color='#AAFF00' pattern={circlePattern} />
        </div>
      </div>
      <div className='middle'>
        <div className='number' onClick={reset}>
          <GridBox color='#888' pattern={colonPattern} />
        </div>
      </div>
      <div className='right'>
        <div className='number'>
          <GridBox color='#FF3232' pattern={crossPattern} />
        </div>
      </div>
    </div>
    <div className='bottom'>
      <div className='left'>
        <DigitPair number={results.green} />
      </div>
      <div className='right'>
        <DigitPair number={results.red} />
      </div>
    </div>
  </div>
}

function DigitPair({ number }) {
  return <div className='number-container'>
    <div className='number'>
      <GridBox color='#cffecc' pattern={numberPatterns[Math.floor(number / 10)]} />
    </div>
    <div className='number'>
      <GridBox color='#cffecc' pattern={numberPatterns[number % 10]} />
    </div>
  </div>
}

function GridBox({ color, pattern }) {
  const [width, setWidth] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const totalWidth = ref.current.offsetWidth
    const width = (totalWidth / pattern[0].length) - 0.1
    setWidth(width)
  }, [])


  return <div className='grid-box' ref={ref}>
    { pattern.map((row, i) => <div className='row' key={i}>
      { row.map((cell, i) => <Cell key={i} fill={!!cell} width={width} color={color} /> )}
    </div>)}
  </div>
}

const duration = 300

function Cell({ fill, color, width }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (fill) {
      setTimeout(() => setShow(true), Math.random() * duration)
    } else {
      setTimeout(() => setShow(false), Math.random() * duration)
    }
  }, [fill])

  const style = {
    backgroundColor: color,
    width,
    height: width,
    transition: 'opacity .2s',
    opacity: show ? 1 : 0
  }

  return <div
    className='cell'
    style={style}
  />
}