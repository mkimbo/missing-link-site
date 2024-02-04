// RATE = function (periods, payment, present, future, type, guess) {
//   guess = guess === undefined ? 0.01 : guess;
//   future = future === undefined ? 0 : future;
//   type = type === undefined ? 0 : type;

//   // Set maximum epsilon for end of iteration
//   var epsMax = 1e-10;

//   // Set maximum number of iterations
//   var iterMax = 10;

//   // Implement Newton's method
//   var y,
//     y0,
//     y1,
//     x0,
//     x1 = 0,
//     f = 0,
//     i = 0;
//   var rate = guess;

//   if (Math.abs(rate) < epsMax) {
//     y =
//       present * (1 + periods * rate) +
//       payment * (1 + rate * type) * periods +
//       future;
//   } else {
//     f = Math.exp(periods * Math.log(1 + rate));
//     y = present * f + payment * (1 / rate + type) * (f - 1) + future;
//   }

//   y0 = present + payment * periods + future;
//   y1 = present * f + payment * (1 / rate + type) * (f - 1) + future;
//   i = x0 = 0;
//   x1 = rate;
//   while (Math.abs(y0 - y1) > epsMax && i < iterMax) {
//     rate = (y1 * x0 - y0 * x1) / (y1 - y0);
//     x0 = x1;
//     x1 = rate;
//     if (Math.abs(rate) < epsMax) {
//       y =
//         present * (1 + periods * rate) +
//         payment * (1 + rate * type) * periods +
//         future;
//     } else {
//       f = Math.exp(periods * Math.log(1 + rate));
//       y = present * f + payment * (1 / rate + type) * (f - 1) + future;
//     }
//     y0 = y1;
//     y1 = y;
//     ++i;
//   }
//   const res = rate * 100;
//   return res.toFixed(2);
// };

// // Usage example
// const totalPeriods = 48;
// const amountEachPeriod = 10;
// const presentValue = 0;
// const futureValue = -1000;
// const type = 1;

// const result = RATE(
//   totalPeriods,
//   amountEachPeriod,
//   presentValue,
//   futureValue,
//   type
// );

// function maskPhoneNumber(phoneNumber) {
//   console.log("Original phone number:", phoneNumber);

//   const length = phoneNumber.length;
//   if (length < 8) {
//     return phoneNumber; // Return the original phone number if it has less than 8 characters
//   }

//   const maskedNumber =
//     phoneNumber.slice(0, Math.floor(length / 2) - 2) +
//     "****" +
//     phoneNumber.slice(Math.ceil(length / 2) + 2);

//   return maskedNumber;
// }
// const phoneNumber = "1234567890";
// const maskedNumber = maskPhoneNumber(phoneNumber);

// console.log("Rate:", maskedNumber);
function calculateRP({ rewardPool, maxDistance, receiverDistance }) {
  const reward = rewardPool * (1 - receiverDistance / maxDistance);
  return reward;
}

const awardPoints = async ({
  isPremium,
  rewardPool,
  maxDistance,
  receiverDistance,
  alertId,
  userId,
  userRp,
  userVp,
}) => {
  let rp;
  let vp;
  if (isPremium) {
    const unredeemedCrp = userRp.filter(
      (rp) => rp.redeemed == false && rp.isPremium == true
    );
    let newRp =
      unredeemedCrp.length +
      Math.round(calculateRP({ rewardPool, maxDistance, receiverDistance }));
    if (newRp >= 1000) {
      let remainingRp = newRp - 1000;
      let newVp = 1;

      while (remainingRp >= 1000) {
        remainingRp -= 1000;
        newVp += 1;
      }
      const unredeemedRp = Array(remainingRp).fill({
        userId: userId,
        alertId: alertId,
        redeemed: false,
        isPremium: true,
      });
      const redeemedRp = Array(newVp * 1000).fill({
        userId: userId,
        alertId: alertId,
        redeemed: true,
        isPremium: true,
      });
      vp = userVp + newVp;
      rp = [
        ...unredeemedRp,
        ...redeemedRp,
        ...userRp.filter((rp) => rp.redeemed == true && rp.isPremium == true),
        ...userRp.filter((rp) => rp.isPremium == false),
      ];
    } else {
      const unredeemedRp = Array(newRp).fill({
        userId: userId,
        alertId: alertId,
        redeemed: false,
        isPremium: true,
      });
      const redeemedRp = userRp.filter(
        (rp) => rp.redeemed == true && rp.isPremium == true
      );
      vp = userVp;
      rp = [
        ...unredeemedRp,
        ...redeemedRp,
        ...userRp.filter((rp) => rp.isPremium == false),
      ];
    }
  } else {
    const unredeemedRp = Array(10).fill({
      userId: userId,
      alertId: alertId,
      redeemed: false,
      isPremium: false,
    });
    vp = userVp;
    rp = [...userRp, ...unredeemedRp];
  }

  return { rp, vp };
};

const testFunc = async () => {
  const input = {
    isPremium: true,
    rewardPool: 2500,
    maxDistance: 10000,
    receiverDistance: 500,
    alertId: "alert123",
    userId: "user123",
    userRp: [
      {
        userId: "user123",
        alertId: "alert123",
        redeemed: false,
        isPremium: true,
      },
      {
        userId: "user123",
        alertId: "alert123",
        redeemed: true,
        isPremium: true,
      },
      {
        userId: "user123",
        alertId: "alert123",
        redeemed: true,
        isPremium: false,
      },
    ],
    userVp: 5,
  };

  // Calculate previous and current points
  const { rp: previousRp, vp: previousVp } = input;
  const { rp: currentRp, vp: currentVp } = await awardPoints(input);

  // Log previous and current points
  console.log("Previous RP:", previousRp);
  console.log("Previous VP:", previousVp);
  console.log("Current RP:", currentRp.length);
  console.log("Current VP:", currentVp);
};

testFunc();
