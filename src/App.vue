import axios from 'axios';

export default {
  data() {
    return {
      students: [],
      courses: []
    };
  },
  created() {
    axios.get('http://localhost:5000/students')
      .then(response => {
        this.students = response.data;
      })
      .catch(error => console.error(error));

    axios.get('http://localhost:5000/courses')
      .then(response => {
        this.courses = response.data;
      })
      .catch(error => console.error(error));
  }
};
