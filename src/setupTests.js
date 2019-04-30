import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

require('jest-localstorage-mock');
jest.mock('react-ga');

Enzyme.configure({ adapter: new Adapter() });
