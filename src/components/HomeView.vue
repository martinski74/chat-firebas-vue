<template>
  <div class="view chat">
    <header>
      <button class="logout" @click="Logout">Logout</button>
      <h1>Welcome, {{ store.state.username }}</h1>
    </header>

    <section class="chat-box" ref="messageBody">
      <div
        v-for="message in store.state.messages"
        :key="message.key"
        :class="
          message.username == store.state.username
            ? 'message current-user'
            : 'message'
        "
      >
        <div class="message-inner">
          <div class="username">
            <i class="fas fa-user-circle"></i>
            {{ message.username }}
          </div>
          <div class="content">{{ message.content }}</div>
        </div>
      </div>
    </section>

    <footer>
      <form @submit.prevent="handleSubmit">
        <div class="input-wrapper">
          <input
            type="text"
            v-model="inputMessage"
            placeholder="Type your message..."
          />
          <button type="submit" class="send-button">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </footer>
  </div>
</template>

<script>
import { reactive, onMounted, ref, watch, nextTick } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import db from './../db';
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const inputMessage = ref('');
    const messageBody = ref(null);

    const Logout = () => {
      store.username = '';
      router.replace('/login');
    };
    const handleSubmit = () => {
      const messagesRef = db.database().ref('messages');
      if (inputMessage.value === '' || inputMessage.value === null) {
        return;
      }
      const message = {
        username: store.state.username,
        content: inputMessage.value,
      };
      messagesRef.push(message);
      inputMessage.value = '';
    };
    watch(
      store.state.messages.length,
      () => {
        nextTick(() => {
          if (messageBody.value) {
            messageBody.value.scrollTop = messageBody.value.scrollHeight;
          }
        });
      },
      { deep: true, immediate: true }
    );
    onMounted(() => {
      const messagesRef = db.database().ref('messages');
      messagesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        let messages = [];
        Object.keys(data).forEach((key) => {
          messages.push({
            id: key,
            username: data[key].username,
            content: data[key].content,
          });
        });
        store.state.messages = messages;

        setTimeout(() => {
          if (messageBody.value) {
            messageBody.value.scrollTop = messageBody.value.scrollHeight;
          }
        }, 200);
      });
    });

    return {
      store,
      messageBody,
      inputMessage,
      handleSubmit,
      Logout,
    };
  },
};
</script>

<style lang="scss">
.view {
  width: 100%;
  max-width: 1000px;
  margin: auto;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Roboto', sans-serif;
  padding: 20px;

  &.chat {
    flex-direction: column;
    position: relative;
    display: flex;
    min-height: calc(100vh - 40px);
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.1),
      0 16px 48px rgba(0, 0, 0, 0.1),
      0 0 0 1px rgba(255, 255, 255, 0.1);

    header {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 20px 40px;
      background: linear-gradient(to right, #667eea, #764ba2);
      border-radius: 16px 16px 0 0;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

      .logout {
        position: absolute;
        right: 15px;
        background: rgba(255, 255, 255, 0.2);
        color: #fff;
        border: none;
        border-radius: 8px;
        padding: 8px 16px;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        gap: 6px;

        &:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-1px);
        }
      }

      h1 {
        font-size: 24px;
        font-weight: 500;
        color: #fff;
        margin: 0;
      }
    }

    .chat-box {
      flex: 1;
      padding: 30px;
      background: #ffffff;
      overflow-y: auto;
      scroll-behavior: smooth;

      .message {
        margin-bottom: 20px;
        display: flex;

        .message-inner {
          max-width: 70%;

          .username {
            font-size: 14px;
            color: #667eea;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 4px 10px;
            background: rgba(102, 126, 234, 0.1);
            border-radius: 12px;
            font-weight: 600;

            i {
              font-size: 16px;
            }
          }

          .content {
            padding: 12px 16px;
            background: #f0f4f8;
            border-radius: 16px;
            font-size: 15px;
            line-height: 1.5;
            color: #333;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
          }
        }

        &.current-user {
          justify-content: flex-end;

          .message-inner {
            .username {
              flex-direction: row-reverse;
              color: #6277b9;
              background: rgba(255, 255, 255, 0.2);
            }

            .content {
              background: linear-gradient(to right, #667eea, #764ba2);
              color: #fff;
            }
          }
        }
      }
    }

    footer {
      position: sticky;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 20px;
      background: #fff;
      border-radius: 0 0 16px 16px;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);

      form {
        width: 100%;
        
        .input-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f5f7fa;
          border-radius: 12px;
          padding: 6px 8px;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);

          input[type='text'] {
            flex: 1;
            padding: 12px 16px;
            border: none;
            background: transparent;
            font-size: 15px;
            color: #333;

            &::placeholder {
              color: #999;
            }

            &:focus {
              outline: none;
            }
          }

          .send-button {
            background: linear-gradient(to right, #667eea, #764ba2);
            color: #fff;
            border: none;
            border-radius: 8px;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;

            &:hover {
              transform: translateY(-1px);
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            i {
              font-size: 16px;
            }
          }
        }
      }
    }
  }
}

</style>

  
