import Vue from "vue";
import dayjs from 'dayjs'

Vue.filter("formatDate", value => {
  return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
});
