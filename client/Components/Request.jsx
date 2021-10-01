import React, {useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, Trash } from '@fortawesome/free-solid-svg-icons';



const Request = (props) => {
  const[style, setStyle] = useState('requests-body');
  console.log('req props', props);
  const date = new Date(props.time);
  const time = date.toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: true});
  const day = date.toLocaleDateString('en-US');
  

  const deleteMessage = (e) => {
    console.log('what should be passed', e.target.id);
    props.handleClick(e.target.id);
  };

  useEffect(() => {
    !props.isRead ? setStyle('requests-body-new') : null;
  }, []);

  // useEffect(() => { 
  //   if (style === 'requests-body-new') {
  //     setTimeout(() => {
  //       setStyle('requests-body');
  //     }, 5000);}
  // }
  // , [style]);

  

  return (
    <div className='request'>
      <div className='requests-name'><span className='username'>{props.sourceName} </span><span className='time'>{time} {day}</span></div>
      <div className={style}>{props.requestBody}</div>  
      <button type='button' id={props.id} onClick={deleteMessage} className='delete-request'>
      -
      </button>
    </div>
  );
};

export default Request;