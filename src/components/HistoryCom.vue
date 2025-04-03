<template>
  <div>
    <button class="menu-btn" @click="toggleSidebar">
      ❤️
    </button>

    <!-- Use v-show to show or hide Sidebar -->
    <div class="sidebar" :class="{ show: showSidebar }">
      <div class="profile-pic-container">
        <img :src="profilePic" alt="Profile" class="profile-pic" />
      </div>

      <ul class="menu-links">
        <li><router-link to="/" @click="toggleSidebar">PROFILE</router-link></li>
        <li><router-link to="/course-list" @click="toggleSidebar">GRADE</router-link></li>
        <li><router-link to="/my-contact" @click="toggleSidebar">CONTACT</router-link></li>
      </ul>
      <div class="profile-pic-container">
        <img :src="profilePic" alt="Profile" class="profile-pic" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSidebar: false,  // hide Sidebar
      profilePic: new URL('@/assets/dadwas.jpg', import.meta.url).href
    };
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;  
    }
  }
};
</script>

<style scoped>
/* 🔸 button ❤️ */
.menu-btn {
  position: fixed;
  top: 15px;
  left: 15px;
  background-color: #057cca;
  border: 1px solid #888;
  color: white;
  font-size: 1.6rem;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}
.menu-btn:hover {
  background-color: #d20cec;
  transform: scale(1.05);
  box-shadow: 0 6px 15px rgba(255, 255, 255, 0.15);
}

/* 🔸 Sidebar */
.sidebar {
  position: fixed;
  top: -100%; /* Initially hidden above */
  left: 0;
  width: 100%;
  height: 80px; /* Adjust height to fit the top section */
  background: linear-gradient(180deg, rgb(179, 83, 179), #461946);
  color: white;
  display: flex;
  align-items: center; /* Vertically center content */
  justify-content: space-between;
  z-index: 999;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.096);
  border-bottom: 3px solid #e40cae33; /* Add border at the bottom */
  transition: top 0.4s ease-in-out; /* Add transition for movement */
}


.sidebar.show {
  top: 0; /* Show the sidebar when showSidebar is true */
} 

/* 🔸 Profile Picture */
.profile-pic-container {
  display: flex;
  justify-content: center; /* Align vertically */
  flex: 1; /* Add space between the menu and the profile picture */
}

.profile-pic {
  width: 60px; /* Reduce the size for a top sidebar */
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #000;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.5);
}

/* 🔸 Menu */
.menu-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center; /* Align items horizontally */
}
.menu-links li {
  margin: 0 20px;
}
.menu-links li a {
  text-decoration: none;
  color: rgb(2, 2, 2);
  font-size: 1.2rem;
  font-weight: bold;
  display: block;
  padding: 10px 0;
  transition: all 0.3s ease;
}
.menu-links li a:hover {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  padding-left: 10px;
  transform: translateX(5px);
}


@media (max-width: 768px) {
  /* ปรับเมนูให้อยู่กลางและไม่ทับกัน */
  .menu-links {
    margin: 0;
    text-align: center;
  }

  /* ลดขนาดรูปโปรไฟล์ */
  .profile-pic {
    width: 50px;
    height: 50px;
  }

  /* ปรับขนาดตัวอักษรของเมนูเล็กลง */
  .menu-links li a {
    font-size: 1.1rem;
  }

}
</style>