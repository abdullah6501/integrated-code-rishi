const calculateProductiveHours = (data) => {
  const groupedData = groupByUserAndDate(data);

  return groupedData.map(group => {
    const { Userid, Date, activities } = group;
    let firstTimeIn = null;
    let currentTimeIn = null;
    let lastTimeOut = null;
    let totalBreakDuration = 0;
    let totalLunchDuration = 0;
    let productiveDuration = 0;

    let breakStart = null;
    let lunchStart = null;

    activities.forEach(activity => {
      const { activity_type, time } = activity;
      const timeObj = new global.Date(`1970-01-01T${time}Z`); // Use global.Date to ensure no conflicts

      switch (activity_type) {
        case 'Time In':
          if (!firstTimeIn) {
            firstTimeIn = timeObj;
          }
          if (!currentTimeIn) {
            currentTimeIn = timeObj;
          }
          break;
        case 'Time Out':
          lastTimeOut = timeObj;
          if (currentTimeIn) {
            const duration = timeObj - currentTimeIn;
            if (duration > 0) {
              productiveDuration += duration;
            }
            currentTimeIn = null; // Reset currentTimeIn for the next pair
          }
          break;
        case 'breakin':
          if (!breakStart) {
            breakStart = timeObj;
          }
          break;
        case 'breakout':
          if (breakStart) {
            totalBreakDuration += timeObj - breakStart;
            breakStart = null;
          }
          break;
        case 'lunchin':
          if (!lunchStart) {
            lunchStart = timeObj;
          }
          break;
        case 'lunchout':
          if (lunchStart) {
            totalLunchDuration += timeObj - lunchStart;
            lunchStart = null;
          }
          break;
        default:
          break;
      }
    });

    // Calculate productive and non-productive hours in hours
    const productiveHours = lastTimeOut ? (productiveDuration - totalBreakDuration - totalLunchDuration) / (1000 * 60 * 60) : 0;
    const nonProductiveHours = (totalBreakDuration + totalLunchDuration) / (1000 * 60 * 60);

    return {
      Userid,
      Date,
      time_in: firstTimeIn ? firstTimeIn.toISOString().split('T')[1].split('.')[0] : null,
      time_out: lastTimeOut ? lastTimeOut.toISOString().split('T')[1].split('.')[0] : null,
      break_duration: formatDuration(totalBreakDuration),
      lunch_duration: formatDuration(totalLunchDuration),
      productive_hours: formatDuration(Math.abs(productiveHours) * 60 * 60 * 1000),
      non_productive_hours: formatDuration(nonProductiveHours * 60 * 60 * 1000)
    };
  });
};

const groupByUserAndDate = (data) => {
  const grouped = data.reduce((acc, record) => {
    const { Userid, Date, activity_type, time } = record;
    const key = `${Userid}-${Date}`;

    if (!acc[key]) {
      acc[key] = { Userid, Date, activities: [] };
    }

    acc[key].activities.push({ activity_type, time });

    return acc;
  }, {});

  return Object.values(grouped);
};

// Helper function to format duration in milliseconds to HH:MM:SS
const formatDuration = (duration) => {
  const totalSeconds = duration / 1000;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

module.exports = {
  calculateProductiveHours,
  formatDuration
};
















