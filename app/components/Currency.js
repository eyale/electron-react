// @flow
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Select from 'react-select';

import styles from './Currency.css';
import routes from '../constants/routes';

type Props = {
  // increment: () => void,
  // incrementIfOdd: () => void,
  // incrementAsync: () => void,
  // decrement: () => void,
  // counter: number
};

const getCurrHelper = rates =>
  Object.keys(rates).map(rate => ({
    name: rate,
    rate: rates[rate]
  }));

const makeOptions = currencies =>
  currencies.map(rate => ({
    label: rate.name,
    value: rate.rate
  }));

const selectStyles = {
  option: (provided, state) => ({
    ...provided,
    // borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 10
  }),
  control: provided => ({
    ...provided,
    // none of react-select's styles are passed to <Control />
    width: 140
  })
  // singleValue: (provided, state) => {
  //   const opacity = state.isDisabled ? 0.5 : 1;
  //   const transition = 'opacity 300ms';

  //   return { ...provided, opacity, transition };
  // }
};

export default class Currency extends Component<Props> {
  props: Props;

  state = {
    loading: true,
    dateRate: '0000-00-00',
    base: '',
    currencies: [],
    currencyValue: 0,
    result: ''
  };

  componentDidMount() {
    console.log('MOUNTED');
    axios
      .get('https://api.exchangeratesapi.io/latest')
      .then(res => {
        console.log('res', res);

        this.setState({
          loading: false,
          dateRate: res.data.date,
          base: res.data.base,
          currencies: getCurrHelper(res.data.rates)
        });

        return res;
      })
      .catch(e => console.log(e));
  }

  mapCurrencies = currencies => {
    const items = currencies ? (
      currencies.map((item, i) => (
        <p key={i.toString()} className={styles.currencyWrapper}>
          <b style={{ width: '100%' }}>{item.name}:</b>
          {item.rate}
        </p>
      ))
    ) : (
      <p>There is no currencies</p>
    );

    return <div>{items}</div>;
  };

  onCurrencyEnter = e => {
    e.preventDefault();

    this.setState({
      currencyValue: e.target.value
    });
  };

  onInputFocus = () => {
    const { currencyValue } = this.state;
    if (currencyValue === 0) {
      this.setState({
        currencyValue: ''
      });
    }
  };

  onInputBlur = () => {
    const { currencyValue } = this.state;
    if (currencyValue === '') {
      this.setState({
        currencyValue: 0
      });
    }
  };

  onSelectChange = val => {
    console.log(val);
    const { currencyValue } = this.state;
    this.setState({ result: parseFloat(currencyValue) * val.value });
  };

  render() {
    const {
      loading,
      currencies,
      currencyValue,
      result,
      base,
      dateRate
    } = this.state;

    console.log(base);

    return (
      <div className={styles.main}>
        <div className={styles.backButton} data-tid="backButton">
          <Link to={routes.HOME}>
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
          <h1 className={styles.h1}>Currency Page</h1>
        </div>
        {loading && <p style={{ fontSize: 24 }}>Loading...</p>}

        {!loading && (
          <>
            <p>Exchange rate for date: {dateRate}</p>
            <div className={styles.exchangeHolder}>
              <input
                className={styles.input}
                onChange={this.onCurrencyEnter}
                onFocus={this.onInputFocus}
                onBlur={this.onInputBlur}
                value={currencyValue}
              />
              <p className={styles.p}>{base}</p>
              <p className={styles.p}>*</p>
              <Select
                styles={selectStyles}
                options={makeOptions(currencies)}
                onChange={this.onSelectChange}
              />
              <p className={styles.p}>=</p>
              <p className={styles.p}>{result}</p>
            </div>
            {this.mapCurrencies(currencies)}
          </>
        )}
      </div>
    );
  }
}
