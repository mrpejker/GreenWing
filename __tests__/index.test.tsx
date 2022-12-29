import renderer from 'react-test-renderer';
import Home from '../pages';

describe('Home Page', () => {
  it('Renders Correctly', () => {
    const { toJSON } = renderer.create(<Home />);

    expect(toJSON()).toMatchSnapshot();
  });
});
