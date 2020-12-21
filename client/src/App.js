import Wrapper from './components/Wrapper/Wrapper';
import Mailbox from './containers/Mailbox';
import ComposeEmail from './containers/ComposeEmail';

function App() {
  return (
    <Wrapper>
        <Mailbox />
        {/* <ComposeEmail /> */}
    </Wrapper>
  );
}

export default App;
