import { connect } from 'react-redux';
import Currency from '../components/Currency';
import {
  increment,
  decrement,
  incrementIfOdd,
  incrementAsync
} from '../reducers/currency';

const mapStateToProps = state => ({
  counter: state.counter
});

const mapDispatchToProps = dispatch => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement()),
  incrementIfOdd: () => dispatch(incrementIfOdd()),
  incrementAsync: () => dispatch(incrementAsync())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Currency);
