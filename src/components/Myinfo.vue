<template>
  <div>
    <img :src="student.image" alt="Student Image" />
    <h2>{{ student.name }}</h2>
    <p>รหัสนิสิต: {{ student.student_id }}</p>
    <p>สาขา: {{ student.branch }}</p>
    <p>โรงเรียนเดิม: {{ student.school }}</p>

    <button @click="editStudent">แก้ไขข้อมูล</button>

    <form v-if="isEditing" @submit.prevent="saveStudent">
      <input v-model="student.name" placeholder="ชื่อ-นามสกุล" />
      <input v-model="student.student_id" placeholder="รหัสนิสิต" />
      <input v-model="student.branch" placeholder="สาขา" />
      <input v-model="student.school" placeholder="โรงเรียนเดิม" />
      <button type="submit">บันทึกการเปลี่ยนแปลง</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      student: {},  // สร้างเป็น object ว่างเพื่อรับข้อมูลจาก json-server
      isEditing: false
    };
  },
  mounted() {
    // ดึงข้อมูลจาก Myinfo ใน json-server
    axios.get('http://localhost:5000/Myinfo/1')  // สมมติว่า ID ของนิสิตคือ 1
      .then(response => {
        this.student = response.data;
      })
      .catch(error => {
        console.log('Error fetching student data:', error);
      });
  },
  methods: {
    editStudent() {
      this.isEditing = !this.isEditing;
    },
    saveStudent() {
      // ส่งข้อมูลกลับไปยัง json-server เพื่อบันทึกการเปลี่ยนแปลง
      axios.put(`http://localhost:5000/Myinfo/1`, this.student)
        .then(response => {
          console.log('Updated student data:', response.data);
          this.isEditing = false;
        })
        .catch(error => {
          console.log('Error saving student data:', error);
        });
    }
  }
};
</script>
