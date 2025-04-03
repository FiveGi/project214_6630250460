<template>
  <div class="contact-wrapper">
    <h2 class="title">CONTACT</h2>

    <!-- เพิ่มรูปตรงนี้ -->
    <div class="image-container">
      <img src="@/assets/Gi2.jpg" alt="Contact Image" class="contact-image" />
    </div>

    <div class="contact-container">
      <div class="contact-card">
        <div class="icon-box"><i class="fas fa-envelope"></i></div>
        <div class="info">
          <div class="label">Email FiveGi</div>
          <div class="value">five1237890@gmail.com</div>
        </div>
      </div>

      <div class="contact-card">
        <div class="icon-box"><i class="fas fa-phone-alt"></i></div>
        <div class="info">
          <div class="label">Tel</div>
          <div class="value">097-128-9320</div>
        </div>
      </div>

      <div class="contact-card">
        <div class="icon-box"><i class="fab fa-facebook"></i></div>
        <div class="info">
          <div class="label">Facebook</div>
          <div class="value">
            <a href="https://www.facebook.com/panupong.srisuyong" target="_blank">Fiveza Gi </a>
          </div>
        </div>
      </div>
      
      <div class="contact-card">
        <div class="icon-box"><i class="fab fa-facebook"></i></div>
        <div class="info">
          <div class="label">Instagram</div>
          <div class="value">
            <a href="https://www.instagram.com/fivegizi/" target="_blank">fivegizi</a>
          </div>
        </div>
      </div>

      <div class="contact-card">
        <div class="icon-box"><i class="fab fa-github"></i></div>
        <div class="info">
          <div class="label">GitHub</div>
          <div class="value">
            <a href="https://github.com/FiveGi/project214_6630250460" target="_blank">FiveGi</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "MyContact",
  mounted() {
    this.animateBackground();
  },
  methods: {
    animateBackground() {
      const wrapper = document.querySelector(".contact-wrapper");
      let hue = 0;
      let stripeSize = 10;
      setInterval(() => {
        hue = (hue + 5) % 360;
        stripeSize = (stripeSize + 5) % 50 + 10;
        wrapper.style.background = `repeating-linear-gradient(45deg, hsl(${hue}, 80%, 30%), hsl(${(hue + 30) % 360}, 80%, 40%) ${stripeSize}px)`;
      }, 500);
    },
  },
};
</script>

<style scoped>
.contact-wrapper {
  min-height: 100vh;
  color: white;
  font-family: 'Prompt', sans-serif;
  padding: 30px 20px;
  display: flex;
  justify-content: center;
  transition: background 0.5s linear;
  position: relative;
  flex-direction: column; /* จัดระเบียบให้เป็นคอลัมน์ */
  align-items: center; /* จัดกลางแนวนอน */
}

.title {
  font-size: 4rem;
  font-weight: bold;
  position: absolute;
  left: 200px; /* ชิดซ้าย */
  margin-bottom: 20px; /* เพิ่มระยะห่างระหว่าง title กับรูป */
}


.image-container {
  position: relative;
  top: 30px; /* ปรับระยะห่างให้เหมาะสม */
  margin-bottom: 20px; /* ระยะห่างจาก contact-container */
}

.contact-image {
  width: 350px; /* ขนาดของภาพ */
  height: 500px;
  object-fit: cover; /* ให้ภาพไม่ผิดสัดส่วน */
  border-radius: 10%; /* ทำให้รูปเป็นวงกลม */
  border: 3px solid #4caf50; /* ขอบสีเขียว */
}

.contact-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
}

.contact-card {
  background: #2a2a2a;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease-in-out;
}

.contact-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(255, 255, 255, 0.08);
}

.icon-box {
  font-size: 1.8rem;
  margin-right: 20px;
  color: #4caf50;
  min-width: 40px;
  text-align: center;
}

.info {
  flex: 1;
}

.label {
  font-weight: bold;
  font-size: 1rem;
  margin-bottom: 5px;
}

.value {
  font-size: 0.95rem;
  color: #ccc;
  word-break: break-word;
}

a {
  color: #7cdba0;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 600px) {
  .contact-container {
    right: 5%;
  }

  .contact-card {
    flex-direction: column;
    align-items: flex-start;
    align-self: center;
  }

  .icon-box {
    margin-bottom: 10px;
  }

  .value {
    font-size: 1rem;
  }

  .title {
    left: 5%;
    font-size: 1.8rem;
  }
}
</style>
