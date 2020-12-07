var xp1 = randomLocation(0, 9);
var xp1Next = null;
var yp1 = randomLocation(0, 9);
var yp1Next = null;
var xp2 = randomLocation(0, 9);
var xp2Next = null;
var yp2 = randomLocation(0, 9);
var yp2Next = null;
var destX = randomLocation(0, 9);
var destY = randomLocation(0, 9);
var time = 0;
var isColli = 0;

var p1Arrived = false;
var p2Arrived = false;


function simulator() {
	var step = 1;
	// shows destination and initial location
	document.getElementById(destY+"+"+destX).innerHTML = 'Dest'
	document.getElementById(yp1+"+"+xp1).innerHTML += 'A1' + '(start)';
	document.getElementById(yp2+"+"+xp2).innerHTML += 'A2' + '(start)';

	// if both aircraft did not arrive in destination
	while (xp1 !== destX || yp1 !== destY || xp2 !== destX || yp2 !== destY) {
		// timer(1000);
		if(!p1Arrived) {
			nextPathA1(xp1, yp1);
		}
		if(!p2Arrived) {
			nextPathA2(xp2, yp2);
		}

		// if both aircrafts are in 4 x 4 range, starts communication
		if(xp2 >= xp1 - 2 && xp2 <= xp1 + 2 && yp2 >= yp1 - 2 && yp2 <= yp1 + 2) {
			console.log("communication start")
		// if(xp2 <= xp1 - 4 && xp2 <= xp1 + 4 && yp2 >= yp1 - 4 && yp2 <= yp1 + 4) {
			collisionCheck();
			if(isColli === 1) {
				collisionMove();
			}		
		}

		// if no collision expected, aircraft moves
		if(isColli === 0) {
			if(!p1Arrived) {
				pathA1(xp1, yp1);
			}
			if(!p2Arrived) {
				pathA2(xp2, yp2);
			}
		}
		isColli = 0;
		step += 1;
		
		// no collision or no communication possible
		console.log("currP1 ", step, ": ", xp1, ", ", yp1)
		console.log("currP2 ", step, ": ", xp2, ", ", yp2)
		console.log("destination: ", destX, ", ", destY);
		document.getElementById(yp1+"+"+xp1).innerHTML += 'A1' + '(' + step + ')';
		document.getElementById(yp2+"+"+xp2).innerHTML += 'A2' + '(' + step + ')';
	}
	console.log("Both Aircrafts are arrived")

}

// check collision
function collisionCheck() {
	if(xp1Next === xp2Next && yp1Next === yp2Next) {
		if(xp1Next === destX && xp2Next === destX && yp1Next === destY && yp2Next === destY) {

		} else {
			console.log("collision warning!")
		}
		isColli = 1;
	}
}

// collision check and move
function collisionMove() {
	if(xp1Next === xp2Next && yp1Next === yp2Next) {
		if(p1Arrived) {
			pathA2(xp2, yp2);
			return;
		} else if(p2Arrived) {
			pathA1(xp1, yp1);
			return;
		}
		if(xp1Next === destX && xp2Next === destX && yp1Next === destY && yp2Next === destY) {
			pathA1(xp1, yp1);
			pathA2(xp2, yp2);
		}
		else if(xp1Next === destX && xp2Next === destX) {
			if (destY > yp1) {
				yp1 = yp1 + 1;
			} else {
				yp1 = yp1 - 1;
			}

			if (destY > yp2) {
				yp2 = yp2 + 1;
			} else {
				yp2 = yp2 - 1;
			}

		} else if(yp1Next === destY && yp2Next === destY) {
			if (destX > xp1) {
				xp1 = xp1 + 1;
			} else {
				xp1 = xp1 - 1;
			}

			if (destX > xp2) {
				xp2 = xp2 + 1;
			} else {
				xp2 = xp2 - 1;
			}
		}
	}
}

// move Y direction first then X (Aircraft1)
function pathA1(ix, iy) {
	if (yp1 !== destY) {
		if (destY > yp1) {
			yp1 = yp1 + 1;
		} else {
			yp1 = yp1 - 1;
		}
	} else if (xp1 !== destX) {
		if (destX > xp1) {
			xp1 = xp1 + 1;
		} else {
			xp1 = xp1 - 1;
		}
	} else {
		p1Arrived = true;
	}
}


// move Y direction first then X (Aircraft2)
function pathA2(ix, iy) {
	if (yp2 !== destY) {
		if (destY > yp2) {
			yp2 = yp2 + 1;
		} else {
			yp2 = yp2 - 1;
		}
	} else if (xp2 !== destX) {
		if (destX > xp2) {
			xp2 = xp2 + 1;
		} else {
			xp2 = xp2 - 1;
		}
	} else {
		p2Arrived = true;
	}
}

// predict next path for Aircraft1
function nextPathA1(ix, iy) {
	if (yp1 !== destY) {
		if (destY > yp1) {
			yp1Next = yp1 + 1;
			xp1Next = xp1;
		} else {
			yp1Next = yp1 - 1;
			xp1Next = xp1;
		}
	} else {
		if (destX > xp1) {
			xp1Next = xp1 + 1;
			yp1Next = yp1;
		} else {
			xp1Next = xp1 - 1;
			yp1Next = yp1;
		}
	}
}
// predict next path for Aircraft2
function nextPathA2(ix, iy) {
	if (yp2 !== destY) {
		if (destY > yp2) {
			yp2Next = yp2 + 1;
			xp2Next = xp2
		} else {
			yp2Next = yp2 - 1;
			xp2Next = xp2
		}
	} else {
		if (destX > xp2) {
			xp2Next = xp2 + 1;
			yp2Next = yp2
		} else {
			xp2Next = xp2 - 1;
			yp2Next = yp2
		}
	}
}

// create random starting location for aircraft
function randomLocation(min, max) {
	min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// timer to set for 1 minute communication
function timer(miliseconds) {
   var currentTime = new Date().getTime();

   while (currentTime + miliseconds >= new Date().getTime()) {
   }
}


simulator();
