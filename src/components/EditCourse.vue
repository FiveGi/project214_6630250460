<template>
  <div class="course-wrapper">
    <h2 class="title">GRADE</h2>

    <!-- 🔹 average -->
    <div class="summary-box">
      <div class="gen">ชื่อ-รหัสวิชา</div>
      <div>รวมหน่วยกิต: <strong>{{ totalCredits }}</strong></div>
      <div>GPA: <strong>{{ gpa }}</strong></div>
    </div>

    <div v-for="course in courses" :key="course.id" class="course-card">
      <div class="course-header">
        <div class="left">
          <span class="code">{{ course.code }}</span>
          <span class="separator">|</span>
          <span class="en">{{ course.name }}</span>
          <span class="separator">|</span>
          <span class="th">{{ course.name_th }}</span>
        </div>
        <div class="right">
          <div class="credit">{{ course.credit }} หน่วยกิต</div>
          <div class="grade">{{ course.grade }}</div>
        </div>
        <div class="actions">
          <span class="edit-text" @click="toggleEdit(course.id)">EDIT</span>
          |
          <span class="delete-text" @click="confirmDelete(course.id)">DELETE</span>
        </div>
      </div>

      <div v-if="editingId === course.id" class="edit-form">
        <input v-model="editedCourse.code" class="form-control" placeholder="รหัสวิชา" />
        <input v-model="editedCourse.name" class="form-control" placeholder="ชื่อวิชาภาษาอังกฤษ (EN)" />
        <input v-model="editedCourse.name_th" class="form-control" placeholder="ชื่อวิชาภาษาไทย (TH)" />
        <input v-model.number="editedCourse.credit" class="form-control" placeholder="หน่วยกิต" type="number" />
        <input v-model="editedCourse.grade" class="form-control" placeholder="เกรด(พิมพ์ใหญ่)เช่น A" />
        <button class="save-btn" @click="saveCourse(course.id)">save</button>
        <button class="cancel-btn" @click="cancelEdit">cancel</button>
      </div>
    </div>

    <!-- ✅ Add element -->
    <div class="dropdown">
        <button class="dropdown-btn" @click="toggleDropdown">➕</button>
        <div class="dropdown-content" v-show="dropdownVisible">
          <div class="popup">
            <h3>เพิ่มวิชาใหม่</h3>
            <input v-model="newCourse.code" class="form-control" placeholder="รหัสวิชา" />
            <input v-model="newCourse.name" class="form-control" placeholder="ชื่อวิชาภาษาอังกฤษ (EN)" />
            <input v-model="newCourse.name_th" class="form-control" placeholder="ชื่อวิชาภาษาไทย (TH)" />
            <input v-model.number="newCourse.credit" class="form-control" placeholder="หน่วยกิต" type="number" />
            <input v-model="newCourse.grade" class="form-control" placeholder="เกรด(พิมพ์ใหญ่)เช่น A" />
            <div class="popup-buttons">
              <button class="save-btn" @click="addCourse">add</button>
              <button class="cancel-btn" @click="cancelAdd">cancel</button>
            </div>
          </div>
        </div>
    </div>

    <div class="popup-backdrop" v-if="deleteId !== null">
      <div class="popup">
        <h3>Are you sure to delete?</h3>
        <div class="popup-buttons">
          <button class="cancel-btn" @click="deleteId = null">cancel</button>
          <button class="del-btn" @click="deleteCourse(deleteId)">delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      courses: [],
      editingId: null,
      editedCourse: {},
      deleteId: null,
      showAddPopup: false,
      newCourse: {
        code: "",
        name: "",
        name_th: "",
        credit: 0,
        grade: ""
      },
      dropdownVisible: false, // Controls the visibility of the dropdown
    };
  },
  computed: {
    totalCredits() {
      return this.courses.reduce((sum, c) => sum + (Number(c.credit) || 0), 0);
    },
    gpa() {
      const gradeMap = {
        'A': 4, 'B+': 3.5, 'B': 3,
        'C+': 2.5, 'C': 2,
        'D+': 1.5, 'D': 1,
        'F': 0
      };
      let totalGrade = 0;
      let totalCredit = 0;
      this.courses.forEach(c => {
        const gradePoint = gradeMap[c.grade];
        if (gradePoint !== undefined) {
          totalGrade += gradePoint * c.credit;
          totalCredit += c.credit;
        }
      });
      return totalCredit > 0 ? (totalGrade / totalCredit).toFixed(2) : "-";
    }
  },
  methods: {
    async fetchCourses() {
      const res = await fetch("http://localhost:3000/courses");
      this.courses = await res.json();
    },
    toggleEdit(id) {
      const course = this.courses.find(c => c.id === id);
      this.editingId = this.editingId === id ? null : id;
      this.editedCourse = { ...course };
    },
    cancelEdit() {
      this.editingId = null;
    },
    async saveCourse(id) {
      const res = await fetch(`http://localhost:3000/courses/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.editedCourse)
      });
      if (res.ok) {
        const index = this.courses.findIndex(c => c.id === id);
        this.courses[index] = { ...this.editedCourse };
        this.editingId = null;
      }
    },
    confirmDelete(id) {
      this.deleteId = id;
    },
    async deleteCourse(id) {
      await fetch(`http://localhost:3000/courses/${id}`, { method: "DELETE" });
      this.courses = this.courses.filter(c => c.id !== id);
      this.deleteId = null;
    },
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    cancelAdd() {
      this.dropdownVisible = false;
    },
    async addCourse() {
      const res = await fetch("http://localhost:3000/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.newCourse)
      });
      const data = await res.json();
      this.courses.push(data);
      this.newCourse = { code: "", name: "", name_th: "", credit: 0, grade: "" };
      this.dropdownVisible = false; // Close dropdown after adding
    }
  },
  mounted() {
    this.fetchCourses();
  }
};
</script>


<style scoped>
.course-wrapper {
  background: #57375f;
  color: white;
  font-family: 'Prompt', sans-serif;
  padding: 30px;
  min-height: 100vh;
  position: relative;
}

.title {
  text-align: center;
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 20px;
  animation: colorChange 1s infinite alternate;
}

.summary-box {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 40px;
  margin-bottom: 30px;
  font-size: 1.1rem;
  padding: 15px 30px;
  border-radius: 10px;
  border: 1px solid #7c216d25;
}

.gen {
  margin-right: auto;
  font-size: 25px;
  
  
}

.course-card {
  background: #bc08c22f;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(255, 255, 255, 0.05);
}

.course-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 10px;
  width: 100px;
  margin: auto;
  padding: auto;
}

.left {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
}

.code, .en, .th {
  font-weight: 600;
  font-size: 1rem;
}

.separator {
  color: #ccc;
}


.code {
  font-weight: bold;
  margin-bottom: 4px;
}

.en {
  font-weight: 600;
}

.th {
  font-size: 0.9rem;
  color: #bbb;
  margin-top: 2px;
}

.right {
  text-align: right;
}

.credit {
  font-size: 0.9rem;
  color: #ccc;
}

.grade {
  font-size: 1.2rem;
  color: #7cdba0;
  font-weight: bold;
}

.actions {
  font-size: 0.9rem;
  color: #aaa;
  white-space: nowrap;
  margin-top: 5px;
}

.actions span {
  cursor: pointer;
  transition: all 0.2s ease;
}

.actions span:hover {
  color: #fff;
  text-decoration: underline;
}

.edit-form {
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #444;
}

input.form-control {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.save-btn, .cancel-btn {
  padding: 8px 14px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  margin-right: 10px;
  cursor: pointer;
}

.save-btn {
  background: #37af08;
  color: white;
}
.del-btn {
  background: #af0808;
  color: white;
}

.cancel-btn {
  background: #888;
  color: white;
}

.save-btn:hover,
.cancel-btn:hover {
  transform: translateY(-1px);
  opacity: 0.9;
}

.add-btn {
  position: fixed;
  top: 30px;
  right: 30px;
  background: #420b32;
  color: white;
  padding: 12px 20px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
}


.popup-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.popup {
  background: #000000;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 0 15px rgba(255,255,255,0.1);
}

.popup h3 {
  margin-bottom: 20px;
  text-align: center;
  animation: colorChange 1s infinite alternate;
}
@keyframes colorChange {
  0% {
    color: #ff5733; /* แดง */
  }
  25% {
    color: #33ff57; /* เขียว */
  }
  50% {
    color: #3357ff; /* น้ำเงิน */
  }
  75% {
    color: #ff33a1; /* ชมพู */
  }
  100% {
    color: #ff5733; /* แดง */
  }
}
.popup-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}


/* สไตล์ปุ่ม dropdown */
.dropdown-btn {
    background-color: #4CAF50;
    color: white;
    padding: 16px;
    font-size: 16px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    position: fixed;  /* เปลี่ยนจาก display: inline-block เป็น position: fixed */
    top: 30px;  /* ระยะห่างจากขอบบน */
    right: 30px;  /* ระยะห่างจากขอบขวา */
    z-index: 1000;  /* ให้ปุ่มอยู่เหนือองค์ประกอบอื่น */
}

.dropdown-btn {
    background-color: #3e8e41;
}


/* สไตล์ของเมนู dropdown */
.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px rgba(0,0,0,0.2);
    position: fixed;  /* เปลี่ยนจาก display: inline-block เป็น position: fixed */
    top: 30px;  /* ระยะห่างจากขอบบน */
    right: 30px;  /* ระยะห่างจากขอบขวา */
    z-index: 1000;
}

.dropdown-content a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

.dropdown-content a:hover {
    background-color: #ffffff;
}

/* แสดงเมนู dropdown เมื่อ hover หรือคลิก */
.dropdown .dropdown-content {
    display: block;
}
</style>
