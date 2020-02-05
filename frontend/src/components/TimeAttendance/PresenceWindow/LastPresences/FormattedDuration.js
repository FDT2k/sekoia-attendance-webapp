import React from 'react'
import  moment from 'moment';
import msetup from 'moment-duration-format'

import './style.css'
msetup(moment);


export default props =>{
  const {decimalHours} = props;

  const duration = moment.duration(decimalHours,'hours')

  const formattedDuration = duration.format('hh[h]mm',{ forceLength: true,useSignificantDigits: true,trim: false});

  return (
    <>

      <b className={decimalHours>8 ? 'timeanomaly':''}>{"durée: " + formattedDuration} </b>
    </>
  )
}
