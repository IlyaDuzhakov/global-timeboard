import classes from './AnalogClock.module.css'


const AnalogClock = ({ time, title, onDelete }) => {
  const {hour, minute, second} = time // деструктурировали
  return (
    <div className={classes.clockContainer}>
      <button className={classes.closeBtn} onClick={onDelete}>×</button>
      <div className={classes.clockTitle}>{title}</div>
      <div className={classes.clock}>
        <div className={classes.handHour} style={{transform: `rotate(${hour}deg)`}}></div>
        <div className={classes.handMinute} style={{transform: `rotate(${minute}deg)`}}></div>
        <div className={classes.handSecond} style={{transform: `rotate(${second}deg)`}}></div>
      </div>
    </div>
  )
}

export default AnalogClock