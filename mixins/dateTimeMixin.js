export default {
  computed: {
    chooseSuffix() {
      return (date) => {
        const unique = date[0] === "1" && date.length > 1;
        const config = {
          1: unique ? "th" : "st",
          2: unique ? "th" : "nd",
          3: unique ? "th" : "rd",
        };
        return config[date[date.length - 1]] ?? "th";
      };
    },
  },
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
      const fdate = new Date(date);
      const suffix = this.chooseSuffix(String(fdate.getDate()));
      return fdate.getDate() + suffix + " " + months[fdate.getMonth()];
    },
  },
};
