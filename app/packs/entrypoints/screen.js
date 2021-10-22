import Screen from 'Screen/components/Screen'

const node = document.getElementById('screen')
ReactDOM.render(<Screen color={node.dataset.color} />, node)