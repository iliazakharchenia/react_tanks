import styles from './Projectile.module.css';

const Projectile = (props) => {

  if(props.status=="alive") return (
    <div className={styles.Projectile} style={{
      left: `${props.x}px`,
      top: `${props.y}px`,
    }}>
      <img src='../assets/projectile.png'></img>
    </div>
  ); else return(<div />);
};

export default Projectile;
