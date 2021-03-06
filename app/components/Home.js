// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className={styles.container} data-tid="container">
        <h2>Currency App</h2>
        {/* <Link to={routes.COUNTER}>to Counter</Link> */}
        <Link to={routes.CURRENCY}>to Currnecy Page</Link>
      </div>
    );
  }
}
