export default function secondsToHms(d: number) {
    d = Number(d);
    let h = Math.floor(d / 3600);
    let sH = String(h)
    let m = Math.floor(d % 3600 / 60);
    let sM = String(m)
    let s = Math.floor(d % 3600 % 60);
    let sS = String(s)

    /* RUSSIAN GENERAL VERSION */  
    let hDisplay = h > 0 ? h + " часов " : ""; 
    let mDisplay = m > 0 ? m + " минут ": ""; 
    let sDisplay = s > 0 ? s + " секунд" : "";

    /* RUSSIAN DETAILED VERSION */
    // let hDisplay = h > 0 ? h + ( (/1$/.test(sH) && !/11$/.test(sH)) ? " час, " : /[2-4]$/.test(sH) ? " часа, " : " часов " ) : ""; 
    // let mDisplay = m > 0 ? m + ( (/1$/.test(sM) && !/11$/.test(sM)) ? " минута, " : /[2-4]$/.test(sM) && !/12$|13$|14$/.test(sM) ? " минуты, " : " минут " ) : ""; 
    // let sDisplay = s > 0 ? s + ( (/1$/.test(sS) && !/11$/.test(sS)) ? " секунда, " : /[2-4]$/.test(sS) && !/12$|13$|14$/.test(sS) ? " секунды, " : " секунд" ) : "";
  
    /* ENGLISH VERSION */
    // var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    // var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    // var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  
    return hDisplay + mDisplay + sDisplay; 
  }