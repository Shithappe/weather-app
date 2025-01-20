<script setup>
import { ref, onMounted } from 'vue';
import Groq from 'groq-sdk'; 

const props = defineProps(['current'])

const weatherResult = ref(null);
const qroqKey = useRuntimeConfig().public.qroqKey

onMounted(async () => {
  const groq = new Groq({ apiKey: qroqKey, dangerouslyAllowBrowser: true });

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `
            ответь в JSON формат, текст сообщений должен быть на русском языке
            {
              description: "тут нужно дать краткое описание погоды одним предложением",
              clothes: "перечисление 3-4 элементов одежды, подходящих для данной погоды"
            }
          `
        },
        {
          role: 'user',
          content: JSON.stringify(props.current),
        }
      ],
      model: 'mixtral-8x7b-32768',
      temperature: 1,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
      response_format: {
        type: 'json_object'
      },
      stop: null
    });

    // Сохранение результата
    weatherResult.value = JSON.parse(chatCompletion.choices[0].message.content);
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
  }
});
</script>

<template>
  <div>
    <div v-if="weatherResult">
      <span>
        {{ weatherResult.description }}
        <br>
        Рекомендуем надеть {{ weatherResult.clothes }}
      </span>
    </div>
    <div v-else>
      <p>Загрузка...</p>
    </div>
  </div>
</template>
