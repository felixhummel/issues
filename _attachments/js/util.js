$.prettyDate2 = function(time) {                                               
  return time.replace("T", " ").replace("Z","").replace(/(\d*\:\d*:\d*)\.\d*/g,"$1");
};
