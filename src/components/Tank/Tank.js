import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Tank.module.css';

const Tank = (props) => {

  const [status, setStatus] = useState("alive");

  useEffect(
    () => {
      if (props.status=="dead") {
        setStatus("dead") // here can be a death animation
      }
    },
    [props.status],
  );

  if (props.status=="alive") return (
    <div className={styles.Tank} style={{
      left: `${props.x-15}px`,
      top: `${props.y}px`,
      transform: `rotate(${props.direction}deg)`,
    }}>
      <img src={props.imageSrc}></img>
    </div>
  );
  else return (<div />);
};

export default Tank;
