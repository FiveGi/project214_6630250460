<template>
    <div class="student-wrapper">
      <h2 class="title">ข้อมูลนิสิต</h2>
  
      <div class="content-box">
        <!-- picture -->
        <div class="left-section">
          <div class="profile-box square-style">
            <img src="@/assets/Gi.jpg" alt="Profile" class="profile-img" />
          </div>
        </div>
  
        <!-- info -->
        <div class="right-section">
          <div class="info-box">
            <template v-if="!editMode">
              <p><strong>ชื่อ:</strong> {{ student.name }}</p>
              <p><strong>รหัสนิสิต:</strong> {{ student.student_id }}</p>
              <p><strong>สาขา:</strong> {{ student.major }}</p>
              <p><strong>โรงเรียนเดิม:</strong> {{ student.school }}</p>
              <button class="edit-btn" @click="startEdit">EDIT</button>
            </template>
  
            <template v-else>
              <div class="form-group">
                <label>ชื่อ</label>
                <input type="text" v-model="editedStudent.name" class="form-control" />
              </div>
              <div class="form-group">
                <label>รหัสนิสิต</label>
                <input type="text" v-model="editedStudent.student_id" class="form-control" />
              </div>
              <div class="form-group">
                <label>สาขา</label>
                <input type="text" v-model="editedStudent.major" class="form-control" />
              </div>
              <div class="form-group">
                <label>โรงเรียนเดิม</label>
                <input type="text" v-model="editedStudent.school" class="form-control" />
              </div>
  
              <button class="save-btn" @click="saveStudent">SAVE</button>
              <button class="cancel-btn" @click="cancelEdit">CANCEL</button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        student: {
          name: "",
          student_id: "",
          major: "",
          school: ""
        },
        editedStudent: {},
        editMode: false
      };
    },
    methods: {
      async fetchStudent() {
        try {
          const res = await fetch("http://localhost:3000/student");
          this.student = await res.json();
        } catch (err) {
          console.error("โหลดข้อมูลล้มเหลว", err);
        }
      },
      startEdit() {
        this.editedStudent = { ...this.student };
        this.editMode = true;
      },
      async saveStudent() {
        try {
          const res = await fetch("http://localhost:3000/student", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(this.editedStudent)
          });
          if (res.ok) {
            this.student = { ...this.editedStudent };
            this.editMode = false;
          } else {
            alert("บันทึกไม่สำเร็จ");
          }
        } catch (err) {
          console.error("บันทึกข้อมูลล้มเหลว", err);
        }
      },
      cancelEdit() {
        this.editMode = false;
        this.editedStudent = {};
      }
    },
    mounted() {
      this.fetchStudent();
    }
  };
  </script>
  
  <style scoped>
  /* background and font */
  .student-wrapper {
    background-color: #3b3341;
    min-height: 100vh;
    padding: 20px 16px;
    color: white;
    font-family: 'Prompt', sans-serif;
  }
  
  /* Animation for changing text color */
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

/* Title styling with animation */
.title {
  text-align: center;
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 40px;
  animation: colorChange 1s infinite alternate; /* ใช้ animation เปลี่ยนสี */
}

  
  /* Layout */
.content-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
}

.left-section {
  flex: 0 0 250px;
  display: flex;
  justify-content: flex-start; /* จัดให้เป็นตำแหน่งซ้าย */
}

.right-section {
  flex: 1;
  max-width: 600px;
}

  
  /* picture box */
  @keyframes backgroundColorChange {
  0% {
    background-color: rgb(194, 182, 78); /* สีเริ่มต้น */
  }
  25% {
    background-color: rgb(78, 182, 194); /* สีที่สอง */
  }
  50% {
    background-color: rgb(182, 78, 194); /* สีที่สาม */
  }
  75% {
    background-color: rgb(78, 194, 182); /* สีที่สี่ */
  }
  100% {
    background-color: rgb(194, 182, 78); /* กลับไปที่สีเริ่มต้น */
  }
}

.profile-box.square-style {
  width: 150px;
  background: linear-gradient(180deg, rgb(49, 10, 49), #b629b6);
  border-radius: 100px;
  padding: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease-in-out;
  border: 3px solid transparent;
  background-clip: padding-box;
  margin-left: -150px;
  height: 300px;
}


.profile-box.square-style img {
  width: 200%;
  padding: auto;
  object-fit: cover;
  border-radius: 50px;
  border: none;
  box-shadow: 0 6px 18px rgba(85, 22, 22, 0.15);
  transition: box-shadow 0.3s ease-in-out, transform 0.3s;
  height: 135%;
}

/* RGB hover box */
.profile-box.square-style:hover {
  box-shadow: 0 0 10px 4px rgba(255, 0, 0, 0.7), 
              0 0 10px 6px rgba(0, 255, 0, 0.7), 
              0 0 10px 8px rgba(0, 0, 255, 0.7); /* RGB สีแดง, เขียว, น้ำเงิน */
  transform: scale(1.02);
}

  
 /* info box */
 .info-box {
  background-color: #3a3a3a;
  padding: 40px;
  border-radius: 12px;
  border: 1px solid #5e5e5e;
  box-shadow: 0 0 10px 4px rgba(255, 0, 0, 0.7),
              0 0 10px 6px rgba(0, 255, 0, 0.7),
              0 0 10px 8px rgba(0, 0, 255, 0.7);
  animation: rgbShadowAnimation 5s infinite alternate;
  animation-timing-function: ease-in-out;
  display: flex; /* เพิ่ม */
  flex-direction: column; /* เพิ่ม */
  align-items: left; /* เพิ่ม */
  justify-content: left; /* เพิ่ม */
  width: 150%;
  margin: 0 auto;
}

.edit-btn {
  margin-top: 20px;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #4caf50;
  color: white;
  width: 100%; /* เพิ่มเพื่อให้ปุ่มกว้างขึ้นและกึ่งกลาง */
  text-align: center;
}


/* 🔳 การเปลี่ยนสี RGB ของเงา */
@keyframes rgbShadowAnimation {
  0% {
    box-shadow: 0 0 10px 4px rgba(255, 0, 0, 0.7),   /* เงาสีแดง */
                0 0 10px 6px rgba(0, 255, 0, 0.7),   /* เงาสีเขียว */
                0 0 10px 8px rgba(0, 0, 255, 0.7);   /* เงาสีน้ำเงิน */
  }
  25% {
    box-shadow: 0 0 10px 4px rgba(255, 255, 0, 0.7),   /* เงาสีเหลือง */
                0 0 10px 6px rgba(255, 165, 0, 0.7), /* เงาสีส้ม */
                0 0 10px 8px rgba(255, 0, 255, 0.7); /* เงาสีม่วง */
  }
  50% {
    box-shadow: 0 0 10px 4px rgba(0, 255, 255, 0.7),  /* เงาสีฟ้า */
                0 0 10px 6px rgba(0, 255, 0, 0.7),   /* เงาสีเขียว */
                0 0 10px 8px rgba(0, 0, 255, 0.7);   /* เงาสีน้ำเงิน */
  }
  75% {
    box-shadow: 0 0 10px 4px rgba(255, 0, 255, 0.7),   /* เงาสีม่วง */
                0 0 10px 6px rgba(255, 255, 0, 0.7),   /* เงาสีเหลือง */
                0 0 10px 8px rgba(0, 255, 255, 0.7);   /* เงาสีฟ้า */
  }
  100% {
    box-shadow: 0 0 10px 4px rgba(255, 0, 0, 0.7),   /* เงาสีแดง */
                0 0 10px 6px rgba(0, 255, 0, 0.7),   /* เงาสีเขียว */
                0 0 10px 8px rgba(0, 0, 255, 0.7);   /* เงาสีน้ำเงิน */
  }
}


  
  .info-box:hover {
    box-shadow: 0 0 18px rgba(255, 255, 255, 0.1);
    transform: translateY(-3px);
  }
  
  /* form */
  .info-box p {
    background-color: #5e5e5e;
    padding: 12px 16px;
    margin-bottom: 15px;
    border-radius: 8px;
    border: 1px solid #888;
    font-size: 1.2rem;
    color: #fff;
  }
  
  /* 🔳 edit form */
  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }
  input.form-control {
    width: 100%;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }
  
  /* 🔳 ปุ่มต่าง ๆ */
  .edit-btn, .save-btn, .cancel-btn {
    margin-top: 20px;
    margin-right: 10px;
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  .edit-btn { background-color: #d15555; color: white; }
  .save-btn { background-color: #007bff; color: white; }
  .cancel-btn { background-color: #888; color: white; }
  
  .edit-btn:hover,
  .save-btn:hover,
  .cancel-btn:hover {
    opacity: 0.9;
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(255, 255, 255, 0.12);
  }
  
  /* 🔳 Animation box */
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* 🔳 Responsive */
  @media (max-width: 768px) {
    .content-box {
      flex-direction: column;
      align-items: center;
    }
    .left-section,
    .right-section {
      width: 100%;
      text-align: center;
    }
    .info-box {
      margin-top: 20px;
      padding: 20px;
    }
  }
  </style>
  