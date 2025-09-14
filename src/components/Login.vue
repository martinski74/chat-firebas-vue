<template>
  <div class="login">
    <form class="login-form" @submit.prevent="Login">
      <div class="form-inner">
        <div class="logo">
          <i class="fas fa-comments"></i>
        </div>
        <h1>Welcome to FireChat</h1>
        <p class="subtitle">Connect and chat with friends</p>
        <div class="input-group">
          <label for="username">
            <i class="fas fa-user"></i>
            Username
          </label>
          <input
            type="text"
            id="username"
            v-model="inputUsername"
            placeholder="Enter your username..."
          />
        </div>
        <button type="submit" class="login-button">
          <span>Start Chatting</span>
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const inputUsername = ref("");
    const store = useStore();
    const router = useRouter();

    const Login = () => {
      if (inputUsername.value != "" && inputUsername.value != null) {
        store.dispatch("setUser", inputUsername.value);
        router.replace("/home");
      } else {
        alert("Please enter username");
      }
    };

    return {
      inputUsername,
      Login,
    };
  },
};
</script>

<style lang="scss">
.login {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Roboto', sans-serif;
  padding: 20px;
  .login-form {
    width: 100%;
    max-width: 420px;
    padding: 20px;

    .form-inner {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      padding: 40px;
      border-radius: 16px;
      box-shadow: 
        0 8px 32px rgba(0, 0, 0, 0.1),
        0 16px 48px rgba(0, 0, 0, 0.1),
        0 0 0 1px rgba(255, 255, 255, 0.1);
      .logo {
        width: 80px;
        height: 80px;
        margin: 0 auto 20px;
        background: linear-gradient(to right, #667eea, #764ba2);
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

        i {
          font-size: 40px;
          color: white;
        }
      }

      h1 {
        color: #2d3748;
        font-size: 24px;
        margin-bottom: 8px;
        text-align: center;
        font-weight: 600;
      }

      .subtitle {
        color: #718096;
        text-align: center;
        margin-bottom: 30px;
        font-size: 15px;
      }

      .input-group {
        margin-bottom: 24px;

        label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          color: #4a5568;
          font-size: 14px;
          font-weight: 500;

          i {
            color: #667eea;
          }
        }

        input[type="text"] {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          font-size: 15px;
          color: #2d3748;
          background: #f7fafc;
          transition: all 0.3s ease;

          &::placeholder {
            color: #a0aec0;
          }

          &:focus {
            border-color: #667eea;
            background: white;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          }
        }
      }

      .login-button {
        width: 100%;
        padding: 12px 24px;
        background: linear-gradient(to right, #667eea, #764ba2);
        border: none;
        border-radius: 12px;
        color: white;
        font-size: 16px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        span {
          margin-right: 4px;
        }

        i {
          font-size: 14px;
          transition: transform 0.3s ease;
        }

        &:hover i {
          transform: translateX(4px);
        }
      }
      &:focus-within {
        label {
          color: #ea526f;
        }
        input[type="text"] {
          background-color: #fff;
          box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
          &::placeholder {
            color: #666;
          }
        }
      }
    }
  }
}
</style>
