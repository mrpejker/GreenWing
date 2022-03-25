import renderer from 'react-test-renderer';
import Home from '../pages';

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn().mockImplementation(() => ({})),
    useDispatch: () => jest.fn(),
  };
});

describe('Home Page', () => {
  it('Renders Correctly', () => {
    const { toJSON } = renderer.create(<Home />);

    expect(toJSON()).toMatchSnapshot();
  });
});
