import Buzzer from 'Buzzer/components/Buzzer'

const node = document.getElementById('buzzer')
ReactDOM.render(<Buzzer color={node.dataset.color} />, node)