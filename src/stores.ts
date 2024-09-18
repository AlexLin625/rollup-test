export const initExampleCode = `
import { tag, Component, h, render, signal } from 'omi'

const count = signal(0)

@tag('hello-omi')
class HelloOmi extends Component {
  render(props) {
    return (
      <>
        <h1>Hello {props.msg}!</h1>
        {count.value}
        <button onClick={() => count.value++}>+</button>
      </>
    )
  }
}

render(<hello-omi msg="Omi" />, 'body')
`