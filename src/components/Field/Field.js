import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Field.module.css';
import Tank from '../Tank/Tank';
import Projectile from '../Projectile/Projectile';
import ReloadBar from '../ReloadBar/ReloadBar';

const Field = (props) => {
  // player 1 tank state
  const [x1, setX1] = useState(40);
  const [y1, setY1] = useState(40);
  const [direction1, setDirection1] = useState(180); // degree
  const [tank1status, setTank1Status] = useState("alive");
  const [timeToReload, setTimeToReload] = useState(4000); // ms
  const [canShoot, setCanShoot] = useState(false);

  // player 2 state
  const [player2state, setPlayer2state] = useState(
    {
      x: 360,
      y: 330,
      direction: 360,
      tankStatus: "alive",
      p_x: -10,
      p_y: -10,
      p_status: "dead",
    }
  );
  
  // game variables (balance vital)
  const [step] = useState(10); // px
  const [timer, setTimer] = useState(0);
  const [reloadTime] = useState(4000); // ms
  

  // player 1 projectile
  const [projectileStatus, setProjectileStatus] = useState("dead");
  const [projectileState, setProjectileState] = useState(
    {
      x: -10,
      y: -10,
      direction: 360,
    }
  );

  // start setting
  useEffect(
    ()=>{
      setCanShoot(false);
      setTimeToReload(4000);
      setX1(40);
      setY1(30);
    }
    ,[]);

  // timer ticking
  useEffect(
    ()=>{
      setTimeout(
        ()=>{
          setTimer(timer+1);
          if (timer>=9) setTimer(0);
        }, 50
      );
    },
    [timer]
  );

  // reload progress
  useEffect(
    ()=>{
      if (timeToReload<=0) {
        setCanShoot(true);
        setTimeToReload(0);
        return;
      }
      if (timeToReload>0 && canShoot==false) {
        setTimeToReload(timeToReload-50);
      }
    },
    [timer]
  );

  // reload delay
  useEffect(
    () => {
      if (canShoot) {
        setCanShoot(false);
        setTimeout(
          ()=>{
            setCanShoot(true);
            setTimeToReload(0);
          }, reloadTime
        );
      }
    }, 
    [projectileStatus]
  );
  
  // calculate projectile wall-collision and safe-zone teleport
  useEffect(
    ()=>{
      // update all need
      if (projectileStatus=="alive") {
        shoot();
        if (projectileStatus=="alive") {
          if (projectileState.x<=15 || projectileState.x>=385 
            || projectileState.y<=0 || projectileState.y>=370) 
          {
            setProjectileStatus("dead");
            setProjectileState(
              {
                x: -10,
                y: -10,
                direction: 360,
              }
            );
          }
        }
      }
    },
    [timer]
  );
  
  // projectile safe zone teleport
  useEffect(() => {
    if (projectileStatus=="alive") {
      if (projectileState.x<=15 || projectileState.x>=385 
        || projectileState.y<=0 || projectileState.y>=370) 
          {
            setProjectileStatus("dead");
            setProjectileState(
              {
                x: -10,
                y: -10,
                direction: 360,
              }
            );
          }
    }
  }, 
  [projectileStatus]);

  // hitting a tank calculating
  useEffect(() => {
    if (x1-15<=projectileState.x &&
      x1+15>=projectileState.x &&
      y1-15<=projectileState.y &&
      y1+15>=projectileState.y) 
    {
      setTank1Status("dead");
      setProjectileStatus("dead");
    }
  }, 
  [projectileState,x1,y1]);

  // wall collision
  const ifMoveIsImpossible = ()=>{
    if (x1<=2*step) setX1(x1+step);
    if (x1>=400-2*step) setX1(x1-step);
    if (y1<=step) setY1(y1+step);
    if (y1>=400-4*step) setY1(y1-step);
  }

  // tank shooting function
  const shoot = ()=>{

    // update projectile
    if (projectileStatus=="alive") {
      if (projectileState.direction==360) setProjectileState({
        x: projectileState.x,
        y: projectileState.y-10,
        direction: 360,
      });
      if (projectileState.direction==180) setProjectileState({
        x: projectileState.x,
        y: projectileState.y+10,
        direction: 180,
      });
      if (projectileState.direction==-90) setProjectileState({
        x: projectileState.x-10,
        y: projectileState.y,
        direction: -90,
      });
      if (projectileState.direction==90) setProjectileState({
        x: projectileState.x+10,
        y: projectileState.y,
        direction: 90,
      });

      ////////// update later!!!!!
      // check if tanks is damaged
      if (x1-15<=projectileState.x &&
            x1+15>=projectileState.x &&
              y1-15<=projectileState.y &&
                y1+15>=projectileState.y) {
        setTank1Status("dead");
        setProjectileStatus("dead");
      }
      if (player2state.x-15<=projectileState.x &&
            player2state.x+15>=projectileState.x &&
              player2state.y-15<=projectileState.y &&
                player2state.y+15>=projectileState.y) {
        setPlayer2state({
          x: player2state.x,
          y: player2state.y,
          direction: 360,
          tankStatus: "dead",
          p_x: player2state.p_x,
          p_y: player2state.p_y,
          p_status: player2state.p_status,
        });
        setProjectileStatus("dead");
        setProjectileState(
          {
            x: -10,
            y: -10,
            direction: 360,
          }
        );
      }

      return;
    }

    // set shot possibility (if reloaded)
    if (timeToReload<=0) {
      setTimeToReload(4000);
      setCanShoot(true);
    }

    // check if can shoot at all
    if (!canShoot) return;

    // shot projectile setting
    setProjectileStatus("alive");
    switch (direction1) {
      case 360:
        setProjectileStatus("alive");
        setProjectileState({
          x: x1,
          y: y1-30,
          direction: 360,
        });
        setProjectileStatus("alive");
        break;

      case 180:
        setProjectileStatus("alive");
        setProjectileState({
          x: x1,
          y: y1+30,
          direction: 180,
        });
        setProjectileStatus("alive");
        break;

      case -90:
        setProjectileStatus("alive");
        setProjectileState({
          x: x1-30,
          y: y1,
          direction: -90,
        });
        setProjectileStatus("alive");
        break;

      case 90:
        setProjectileStatus("alive");
        setProjectileState({
          x: x1+30,
          y: y1,
          direction: 90,
        });
        setProjectileStatus("alive");
        break;
    }
  }

  const handleKeyDown = (event) => {

    if (tank1status=="dead") return;

    switch (event.key) {
      case 'ArrowUp':
        if (direction1==360) {
          setY1(y1-step);
        } else setDirection1(360);
        setDirection1(360);
        break;
      case 'ArrowRight':
        if (direction1==90) { 
          setX1(x1+step);
        } else setDirection1(90);
        setDirection1(90);
        break;
      case 'ArrowLeft':
        if (direction1==-90) { 
          setX1(x1-step);
        } else setDirection1(-90);
        setDirection1(-90);
        break;
      case 'ArrowDown':
        if (direction1==180) { 
          setY1(y1+step);
        } else setDirection1(180);
        setDirection1(180);
        break;
      case ' ':
        shoot();
        break;
    };

    ifMoveIsImpossible();
  };

  return (
    <div onKeyUp={handleKeyDown}>
      <div className={styles.Field} tabIndex={0}>
          <Tank name={"tank1"} x={x1} y={y1} 
            direction={direction1} status={tank1status} imageSrc={'../assets/tank-up-green.png'} />
          <Tank name={"tank2"} x={player2state.x} y={player2state.y} 
            direction={player2state.direction} status={player2state.tankStatus} imageSrc={'../assets/tank-up.png'} />
          <Projectile direction={projectileState.direction} status={projectileStatus} 
            name={"2_1"} x={projectileState.x} y={projectileState.y} />
          <ReloadBar reloadPercentage={100-timeToReload*100.0/reloadTime} />
      </div>
    </div>
  );
};

export default Field;