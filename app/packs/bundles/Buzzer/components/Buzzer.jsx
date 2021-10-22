import './Buzzer.scoped.scss'
const vibePattern = [20,180,20,160,20,140,20,120,20,100,20,80,20,60,20,40,20,20,1500]
const voteDelay = _.sum(vibePattern) - vibePattern[vibePattern.length - 1] + 500

export default function Buzzer({ color = 'green' }) {
  const [clicked, setClicked] = useState(false)
  const [holding, setHolding] = useState(false)
  const [voted, setVoted] = useState(false)
  const timeout = useRef(null)

  function vibe() {
    setHolding(true)
    if (timeout.current) clearTimeout(timeout.current)
    timeout.current = setTimeout(vote, voteDelay)
    window.navigator.vibrate(vibePattern)
  }

  function stopVibe() {
    setHolding(false)
    window.navigator.vibrate(0)
    if (timeout.current) clearTimeout(timeout.current)
  }

  function vote() {
    const csrfToken = document.querySelector('meta[name=csrf-token]')?.content
    axios.defaults.headers.common['X-CSRF-Token'] = csrfToken

    if (color === 'green') {
      axios.post('/vote_green')
    } else if (color === 'red') {
      axios.post('/vote_red')
    }
  }

  if (!clicked) return <button onClick={() => setClicked(true)}>Click to start Squid</button>

  const eventHandlers = {
    onMouseDown: vibe,
    onTouchStart: vibe,
    onMouseUp: stopVibe,
    onTouchEnd: stopVibe
  }

  return <div>
    <div className={`${color} dim`} {...eventHandlers} />
    <div className={`${color} bright ${holding ? 'visible' : ''}`} {...eventHandlers} />
  </div>
}