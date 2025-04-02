<template>
    <div>
      <h2>รายละเอียดการเรียน</h2>
      <ul>
        <li v-for="course in history" :key="course.course_id">
          <p>{{ course.course_name }} - {{ course.credits }} หน่วยกิต</p>
          <p>เกรด: {{ course.grade }}</p>
          <button @click="editCourse(course)">แก้ไข</button>
          <button @click="deleteCourse(course)">ลบ</button>
        </li>
      </ul>
  
      <form v-if="isAdding" @submit.prevent="addCourse">
        <input v-model="newCourse.course_id" placeholder="รหัสวิชา" />
        <input v-model="newCourse.course_name" placeholder="ชื่อวิชา" />
        <input v-model="newCourse.credits" placeholder="หน่วยกิต" />
        <input v-model="newCourse.grade" placeholder="เกรด" />
        <button type="submit">เพิ่มวิชา</button>
      </form>
      <button @click="toggleAddCourse">เพิ่มวิชาใหม่</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // เปลี่ยนจาก 'courses' เป็น 'history'
        history: [
          {
            course_id: "CS101",
            course_name: "Introduction to Computer Science",
            credits: 3,
            grade: "A"
          }
        ],
        isAdding: false,
        newCourse: {
          course_id: "",
          course_name: "",
          credits: "",
          grade: ""
        }
      };
    },
    methods: {
      toggleAddCourse() {
        this.isAdding = !this.isAdding;
      },
      addCourse() {
        this.history.push({ ...this.newCourse });  // เปลี่ยน 'courses' เป็น 'history'
        this.newCourse = {
          course_id: "",
          course_name: "",
          credits: "",
          grade: ""
        };
        this.isAdding = false;
      },
      deleteCourse(course) {
        this.history = this.history.filter(c => c.course_id !== course.course_id);  // เปลี่ยน 'courses' เป็น 'history'
      },
      editCourse(course) {
        console.log(course);
      }
    }
  };
  </script>
  