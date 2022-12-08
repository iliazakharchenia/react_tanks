import styles from './Tank.module.css';

const Tank = (props) => {

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
