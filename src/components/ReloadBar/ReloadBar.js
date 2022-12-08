import React from 'react';
import PropTypes from 'prop-types';
import styles from './ReloadBar.module.css';

const ReloadBar = (props) => (
  <div className={styles.ReloadBar}
    style={{background: `linear-gradient(to right, rgb(255, 76, 76) 0%, rgb(255, 76, 76) ${props.reloadPercentage}%, rgb(20, 43, 213) ${props.reloadPercentage}%, rgb(20, 43, 213) 100%)`,}}>
      <img src='../assets/shells.png' style={{
        position: 'absolute',
        left: '-25px',
        top: '-7px',
      }}></img>
  </div>
);

export default ReloadBar;
