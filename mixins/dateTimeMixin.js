export default {
  methods: {
    timeFormatter(date) {
      const fdate = new Date(date);
      let minutes = fdate.getMinutes();
      const hours = fdate.getHours();
      if (fdate.getMinutes() < 10) {
        minutes = "0" + minutes;
      }
      return hours + ":" + minutes;
    },
    dateFormatter(date) {
      const months = [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];
      const suffix = "th";
      const fdate = new Date(date);
      return fdate.getDate() + suffix + " " + months[fdate.getMonth()];
    },
  },
};
