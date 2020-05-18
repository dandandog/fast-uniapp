export function longToTime(value) {
  let theTime = value || 0,
    theTime1 = 0,
    theTime2 = 0
  if (theTime >= 60) {
    theTime1 = parseInt((theTime / 60).toString())
    theTime = parseInt((theTime % 60).toString())
    if (theTime1 >= 60) {
      theTime2 = parseInt((theTime1 / 60).toString())
      theTime1 = parseInt((theTime1 % 60).toString())
    }
  }
  let result
  if (parseInt(theTime.toString()) > 9) {
    result = '' + parseInt(theTime.toString()) + ''
  } else {
    result = '0' + parseInt(theTime.toString()) + ''
  }
  if (theTime1 > 0) {
    if (parseInt(theTime1.toString()) > 9) {
      result = '' + parseInt(theTime1.toString()) + ':' + result
    } else {
      result = '0' + parseInt(theTime1.toString()) + ':' + result
    }
  } else {
    result = '00:' + result
  }
  if (theTime2 > 0) {
    result = '' + parseInt(theTime2.toString()) + ':' + result
  }
  return result
}

export default {
  longToTime
}
