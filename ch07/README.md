# 7. Vuetify의 다양한 컴포넌트 활용

---

## **7.1 Form 구성 요소와 Validation**

### **Form 컴포넌트란?**
Vuetify의 Form 컴포넌트는 다양한 입력 필드와 유효성 검사(Validation)를 제공하여 사용자의 입력 데이터를 처리하는 데 사용됩니다.

---

### **예제: 사용자 등록 Form**
**`src/components/UserForm.vue`**:
```vue
<template>
  <v-container>
    <h1>User Registration</h1>
    <v-form ref="form" v-model="isFormValid">
      <v-text-field
        v-model="user.name"
        label="Name"
        :rules="[rules.required]"
        required
      ></v-text-field>
      <v-text-field
        v-model="user.email"
        label="Email"
        :rules="[rules.required, rules.email]"
        required
      ></v-text-field>
      <v-select
        v-model="user.role"
        :items="roles"
        label="Role"
        :rules="[rules.required]"
      ></v-select>
      <v-btn :disabled="!isFormValid" color="primary" @click="submitForm">
        Submit
      </v-btn>
    </v-form>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const user = ref({ name: '', email: '', role: '' });
const roles = ['Admin', 'Editor', 'Viewer'];
const isFormValid = ref(false);

const rules = {
  required: (value) => !!value || 'Required.',
  email: (value) => {
    const pattern = /^[^@]+@[^@]+\.[a-z]{2,}$/;
    return pattern.test(value) || 'Invalid email.';
  },
};

const submitForm = () => {
  console.log('Form submitted:', user.value);
};
</script>
```

---

## **7.2 Data Table과 필터링**

### **Data Table이란?**
Data Table은 데이터를 표 형태로 표시하며, 필터링, 정렬, 페이지네이션 등의 기능을 제공합니다.

---

### **예제: 필터링 및 페이지네이션**
**`src/components/FilterableTable.vue`**:
```vue
<template>
  <v-container>
    <h1>Filterable Data Table</h1>
    <v-text-field v-model="search" label="Search" clearable></v-text-field>
    <v-data-table
      :items="items"
      :headers="headers"
      :search="search"
      :items-per-page="5"
      class="elevation-1"
    ></v-data-table>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const search = ref('');
const items = ref([
  { name: 'John Doe', email: 'john.doe@example.com' },
  { name: 'Jane Smith', email: 'jane.smith@example.com' },
  { name: 'Alice Brown', email: 'alice.brown@example.com' },
  { name: 'Bob Green', email: 'bob.green@example.com' },
  { name: 'Charlie White', email: 'charlie.white@example.com' },
]);

const headers = [
  { text: 'Name', value: 'name' },
  { text: 'Email', value: 'email' },
];
</script>
```

---

## **7.3 Dialog와 Modal**

### **Dialog란?**
Dialog는 중요한 정보를 표시하거나 사용자 작업을 확인하도록 요청할 때 사용됩니다.

---

### **예제: Form을 포함한 Dialog**
**`src/components/FormDialog.vue`**:
```vue
<template>
  <v-container>
    <v-btn color="primary" @click="showDialog = true">Add User</v-btn>

    <v-dialog v-model="showDialog" max-width="600">
      <v-card>
        <v-card-title>Add New User</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="isFormValid">
            <v-text-field
              v-model="newUser.name"
              label="Name"
              :rules="[rules.required]"
              required
            ></v-text-field>
            <v-text-field
              v-model="newUser.email"
              label="Email"
              :rules="[rules.required, rules.email]"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn text @click="closeDialog">Cancel</v-btn>
          <v-btn text :disabled="!isFormValid" color="primary" @click="submitUser">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const showDialog = ref(false);
const isFormValid = ref(false);
const newUser = ref({ name: '', email: '' });

const rules = {
  required: (value) => !!value || 'Required.',
  email: (value) => /^[^@]+@[^@]+\.[a-z]{2,}$/.test(value) || 'Invalid email.',
};

const closeDialog = () => {
  showDialog.value = false;
};

const submitUser = () => {
  console.log('User added:', newUser.value);
  closeDialog();
};
</script>
```

---

## **7.4 Cards와 Lists를 활용한 콘텐츠 표시**

### **Cards와 Lists란?**
- **Cards**: 콘텐츠를 정리하여 사용자에게 시각적으로 전달.
- **Lists**: 목록 형태로 데이터를 표시.

---

### **예제: User List with Cards**
**`src/components/UserCards.vue`**:
```vue
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" lg="4" v-for="user in users" :key="user.email">
        <v-card>
          <v-card-title>{{ user.name }}</v-card-title>
          <v-card-subtitle>{{ user.email }}</v-card-subtitle>
          <v-card-actions>
            <v-btn text color="primary">Edit</v-btn>
            <v-btn text color="error">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';

const users = ref([
  { name: 'John Doe', email: 'john.doe@example.com' },
  { name: 'Jane Smith', email: 'jane.smith@example.com' },
  { name: 'Alice Brown', email: 'alice.brown@example.com' },
]);
</script>
```

---
### **7.5 추가 Vuetify 컴포넌트 활용**

---

Vuetify는 다양한 컴포넌트를 제공하며, 각각의 컴포넌트는 여러 `props`와 `slots` 옵션을 통해 세부적인 제어가 가능합니다. 아래에서는 주요 컴포넌트와 그 `props` 옵션을 표 형태로 정리하여 설명합니다.  
추가적으로 컴포넌트 활용 예제도 함께 포함합니다.

---

### **1. Tooltip**
툴팁은 요소 위로 마우스를 올렸을 때 추가 정보를 표시하는 컴포넌트입니다.

#### **Props**
| Prop       | Type    | Default  | Description                         |
|------------|---------|----------|-------------------------------------|
| `text`     | String  | `''`     | 툴팁에 표시될 텍스트               |
| `position` | String  | `'top'`  | 툴팁의 위치 (top, bottom, left, right) |
| `open-delay` | Number | `0`      | 툴팁이 열리기 전 지연 시간 (ms)      |
| `close-delay` | Number | `0`      | 툴팁이 닫히기 전 지연 시간 (ms)      |

#### **예제**
```vue
<v-btn v-tooltip.bottom="'Click to Submit'">Submit</v-btn>
<v-btn v-tooltip.right="{ text: 'More Info', openDelay: 500 }">Info</v-btn>
```

---

### **2. Progress Bar**
작업의 진행 상황을 표시하는 데 사용됩니다.

#### **Props**
| Prop      | Type    | Default | Description                          |
|-----------|---------|---------|--------------------------------------|
| `value`   | Number  | `0`     | 진행 상황 값 (0~100)                |
| `color`   | String  | `null`  | 진행 바의 색상                      |
| `striped` | Boolean | `false` | 진행 바를 스트라이프 효과로 표시     |

#### **예제**
```vue
<v-progress-linear :value="progress" color="blue"></v-progress-linear>
<script setup>
import { ref } from 'vue';
const progress = ref(70);
</script>
```

---

### **3. Chips**
태그나 상태를 표시하는 데 사용됩니다.

#### **Props**
| Prop       | Type    | Default | Description                              |
|------------|---------|---------|------------------------------------------|
| `color`    | String  | `null`  | 칩의 색상                               |
| `outlined` | Boolean | `false` | 테두리가 있는 칩을 생성                  |
| `close`    | Boolean | `false` | 닫기 버튼을 추가                        |

#### **예제**
```vue
<v-chip color="green" dark>Active</v-chip>
<v-chip color="red" dark>Inactive</v-chip>
<v-chip color="blue" outlined>Information</v-chip>
```

---

### **4. Carousel**
이미지나 콘텐츠를 슬라이드 형태로 표시합니다.

#### **Props**
| Prop        | Type    | Default | Description                           |
|-------------|---------|---------|---------------------------------------|
| `height`    | String  | `'auto'`| 캐러셀의 높이                         |
| `show-arrows` | Boolean | `true` | 화살표 버튼 표시 여부                  |
| `cycle`     | Boolean | `false` | 자동 순환 활성화 여부                  |
| `interval`  | Number  | `6000`  | 자동 순환 간격 (ms)                   |

#### **예제**
```vue
<v-carousel>
  <v-carousel-item v-for="i in 3" :key="i">
    <v-container class="fill-height">
      <h1>Slide {{ i }}</h1>
    </v-container>
  </v-carousel-item>
</v-carousel>
```

---

### **5. Alert**
사용자에게 중요하거나 오류 상태를 알리는 메시지를 표시합니다.

#### **Props**
| Prop       | Type    | Default | Description                                |
|------------|---------|---------|--------------------------------------------|
| `type`     | String  | `'info'`| 알림의 유형 (info, success, warning, error) |
| `dismissible` | Boolean | `false` | 닫기 버튼 표시 여부                        |
| `text`     | Boolean | `false` | 단순한 텍스트 스타일 적용                  |

#### **예제**
```vue
<v-alert type="success" dismissible>
  Successfully saved your changes!
</v-alert>
<v-alert type="error" text>
  Something went wrong. Please try again.
</v-alert>
```

---

### **6. Badge**
텍스트나 아이콘 옆에 작은 상태 표시기를 추가합니다.

#### **Props**
| Prop       | Type    | Default | Description                              |
|------------|---------|---------|------------------------------------------|
| `color`    | String  | `null`  | 배지의 색상                             |
| `dot`      | Boolean | `false` | 점 형태의 배지를 생성                   |
| `icon`     | String  | `null`  | 배지에 표시할 아이콘                    |

#### **예제**
```vue
<v-badge color="red" content="5">
  <v-icon>mdi-email</v-icon>
</v-badge>
<v-badge color="green" dot>
  <v-icon>mdi-check-circle</v-icon>
</v-badge>
```

---

### **7. Expansion Panel**
데이터를 접거나 펼쳐서 표시합니다.

#### **Props**
| Prop       | Type    | Default | Description                              |
|------------|---------|---------|------------------------------------------|
| `value`    | Boolean | `false` | 확장 패널의 열림 상태                   |
| `expand-icon` | String | `'mdi-chevron-down'` | 확장 아이콘 커스터마이징      |
| `ripple`   | Boolean | `true`  | 클릭 시 물결 효과 활성화                |

#### **예제**
```vue
<v-expansion-panels>
  <v-expansion-panel>
    <v-expansion-panel-title>Panel 1</v-expansion-panel-title>
    <v-expansion-panel-text>Details for Panel 1</v-expansion-panel-text>
  </v-expansion-panel>
  <v-expansion-panel>
    <v-expansion-panel-title>Panel 2</v-expansion-panel-title>
    <v-expansion-panel-text>Details for Panel 2</v-expansion-panel-text>
  </v-expansion-panel>
</v-expansion-panels>
```

---

### **8. Divider**
콘텐츠를 구분하는 데 사용됩니다.

#### **Props**
| Prop       | Type    | Default | Description                              |
|------------|---------|---------|------------------------------------------|
| `inset`    | Boolean | `false` | 인셋 스타일을 적용                      |
| `vertical` | Boolean | `false` | 수직 분할선 생성                        |

#### **예제**
```vue
<v-divider></v-divider>
<v-divider inset></v-divider>
<v-divider vertical></v-divider>
```

---

### **추가 컴포넌트 예제 계속**

내용이 많아 나머지 컴포넌트(예: 메뉴, 텍스트 필드, 체크박스 등) 설명과 예제를 추가 작성하여 이어드리겠습니다. 😊

### **7.5 추가 Vuetify 컴포넌트 활용 (계속)**

---

### **9. Menu**
메뉴는 드롭다운 형태로 사용자가 선택할 수 있는 항목을 제공합니다.

#### **Props**
| Prop         | Type    | Default | Description                              |
|--------------|---------|---------|------------------------------------------|
| `close-on-content-click` | Boolean | `true`  | 콘텐츠 클릭 시 메뉴 닫기                  |
| `open-on-hover`          | Boolean | `false` | 마우스 호버 시 메뉴 열기                  |
| `offset-y`               | Boolean | `false` | Y축으로 오프셋 적용                      |

#### **예제**
```vue
<v-menu>
  <template #activator="{ on, attrs }">
    <v-btn v-bind="attrs" v-on="on">Open Menu</v-btn>
  </template>
  <v-list>
    <v-list-item>Option 1</v-list-item>
    <v-list-item>Option 2</v-list-item>
    <v-list-item>Option 3</v-list-item>
  </v-list>
</v-menu>
```

---

### **10. Text Field**
사용자 입력을 받는 필드입니다.

#### **Props**
| Prop       | Type    | Default | Description                              |
|------------|---------|---------|------------------------------------------|
| `label`    | String  | `null`  | 입력 필드의 레이블                      |
| `type`     | String  | `'text'`| 입력 데이터 타입 (text, password 등)     |
| `outlined` | Boolean | `false` | 아웃라인 스타일 적용                    |

#### **예제**
```vue
<v-text-field label="Your Name" outlined></v-text-field>
<v-text-field label="Password" type="password" outlined></v-text-field>
```

---

### **11. Checkbox**
선택 가능한 상태를 표시하거나 변경할 수 있습니다.

#### **Props**
| Prop       | Type    | Default | Description                              |
|------------|---------|---------|------------------------------------------|
| `label`    | String  | `null`  | 체크박스 옆에 표시할 텍스트             |
| `value`    | Any     | `null`  | 체크박스 값                              |
| `indeterminate` | Boolean | `false` | 선택 상태가 불확실함을 표시           |

#### **예제**
```vue
<v-checkbox label="I agree to the terms" v-model="checked"></v-checkbox>
<script setup>
import { ref } from 'vue';
const checked = ref(false);
</script>
```

---

### **12. Switch**
체크박스와 유사하지만 슬라이더 형태로 동작합니다.

#### **Props**
| Prop       | Type    | Default | Description                              |
|------------|---------|---------|------------------------------------------|
| `label`    | String  | `null`  | 스위치 옆에 표시할 텍스트               |
| `value`    | Any     | `null`  | 스위치 값                                |

#### **예제**
```vue
<v-switch label="Enable Notifications" v-model="enabled"></v-switch>
<script setup>
import { ref } from 'vue';
const enabled = ref(false);
</script>
```

---

### **13. Radio Button**
여러 선택지 중 하나만 선택할 수 있습니다.

#### **Props**
| Prop       | Type    | Default | Description                              |
|------------|---------|---------|------------------------------------------|
| `label`    | String  | `null`  | 라디오 버튼 옆에 표시할 텍스트          |
| `value`    | Any     | `null`  | 라디오 버튼 값                           |

#### **예제**
```vue
<v-radio-group v-model="selected" column>
  <v-radio label="Option 1" value="1"></v-radio>
  <v-radio label="Option 2" value="2"></v-radio>
</v-radio-group>
<script setup>
import { ref } from 'vue';
const selected = ref(null);
</script>
```

---

### **14. Slider**
범위를 설정하거나 값을 조정할 때 사용됩니다.

#### **Props**
| Prop       | Type    | Default | Description                              |
|------------|---------|---------|------------------------------------------|
| `min`      | Number  | `0`     | 최소 값                                 |
| `max`      | Number  | `100`   | 최대 값                                 |
| `step`     | Number  | `1`     | 값 증가 단위                            |

#### **예제**
```vue
<v-slider v-model="volume" :max="100" :step="5"></v-slider>
<script setup>
import { ref } from 'vue';
const volume = ref(50);
</script>
```

---

### **15. Tabs**
여러 페이지를 탭 형태로 구성합니다.

#### **Props**
| Prop       | Type    | Default | Description                              |
|------------|---------|---------|------------------------------------------|
| `v-model`  | Any     | `null`  | 활성화된 탭                             |
| `stacked`  | Boolean | `false` | 스택형 탭 스타일 적용                   |

#### **예제**
```vue
<v-tabs v-model="tab">
  <v-tab>Tab 1</v-tab>
  <v-tab>Tab 2</v-tab>
</v-tabs>
<v-tabs-items v-model="tab">
  <v-tab-item>Content for Tab 1</v-tab-item>
  <v-tab-item>Content for Tab 2</v-tab-item>
</v-tabs-items>
<script setup>
import { ref } from 'vue';
const tab = ref(0);
</script>
```

---

### **16. Date Picker**
날짜 선택 컴포넌트입니다.

#### **Props**
| Prop       | Type    | Default | Description                              |
|------------|---------|---------|------------------------------------------|
| `type`     | String  | `'date'`| 선택할 타입 (date, month, year)         |
| `min`      | String  | `null`  | 선택 가능한 최소 날짜                   |
| `max`      | String  | `null`  | 선택 가능한 최대 날짜                   |

#### **예제**
```vue
<v-date-picker v-model="date"></v-date-picker>
<script setup>
import { ref } from 'vue';
const date = ref(new Date().toISOString().substr(0, 10));
</script>
```

---
Vuetify는 매우 많은 컴포넌트를 제공하므로, 주요 컴포넌트를 다루었는지 확인하고, 누락된 컴포넌트를 아래에 추가로 작성합니다. 

---

### **17. Pagination**
페이지네이션 컴포넌트는 데이터를 페이지별로 나누는 데 사용됩니다.

#### **Props**
| Prop        | Type    | Default | Description                       |
|-------------|---------|---------|-----------------------------------|
| `length`    | Number  | `0`     | 총 페이지 수                     |
| `total-visible` | Number  | `7`     | 표시할 페이지 번호 개수          |
| `value`     | Number  | `null`  | 현재 페이지 값                   |

#### **예제**
```vue
<v-pagination v-model="currentPage" :length="10"></v-pagination>
<script setup>
import { ref } from 'vue';
const currentPage = ref(1);
</script>
```

---

### **18. Skeleton Loader**
로딩 중 콘텐츠를 시각적으로 대체하는 컴포넌트입니다.

#### **Props**
| Prop          | Type    | Default  | Description                   |
|---------------|---------|----------|-------------------------------|
| `loading`     | Boolean | `true`   | 로딩 상태 여부               |
| `type`        | String  | `'card'` | 로더 형태 (card, list 등)     |
| `animation`   | String  | `'wave'` | 애니메이션 스타일             |

#### **예제**
```vue
<v-skeleton-loader loading>
  <template #default>
    <p>Content is loaded!</p>
  </template>
</v-skeleton-loader>
```

---

### **19. Stepper**
단계별 진행 상태를 표시합니다.

#### **Props**
| Prop          | Type    | Default | Description                              |
|---------------|---------|---------|------------------------------------------|
| `v-model`     | Number  | `null`  | 현재 활성 단계                          |
| `vertical`    | Boolean | `false` | 세로 방향으로 표시                      |

#### **예제**
```vue
<v-stepper v-model="step">
  <v-stepper-header>
    <v-stepper-step step="1">Step 1</v-stepper-step>
    <v-divider></v-divider>
    <v-stepper-step step="2">Step 2</v-stepper-step>
  </v-stepper-header>

  <v-stepper-items>
    <v-stepper-content step="1">Step 1 Content</v-stepper-content>
    <v-stepper-content step="2">Step 2 Content</v-stepper-content>
  </v-stepper-items>
</v-stepper>
<script setup>
import { ref } from 'vue';
const step = ref(1);
</script>
```

---

### **20. Timeline**
시간순으로 정렬된 항목을 표시합니다.

#### **Props**
| Prop        | Type    | Default  | Description                   |
|-------------|---------|----------|-------------------------------|
| `reverse`   | Boolean | `false`  | 타임라인 역순으로 표시         |
| `dense`     | Boolean | `false`  | 간결한 타임라인 스타일 적용     |

#### **예제**
```vue
<v-timeline>
  <v-timeline-item color="blue" icon="mdi-star">Event 1</v-timeline-item>
  <v-timeline-item color="green" icon="mdi-check">Event 2</v-timeline-item>
</v-timeline>
```

---

### **21. Rating**
별점을 사용하여 평가를 표시하거나 선택할 수 있습니다.

#### **Props**
| Prop      | Type    | Default | Description                              |
|-----------|---------|---------|------------------------------------------|
| `value`   | Number  | `0`     | 별점 값                                  |
| `max`     | Number  | `5`     | 최대 별점 수                             |
| `color`   | String  | `null`  | 별점의 색상                              |

#### **예제**
```vue
<v-rating v-model="rating" :max="5" color="yellow"></v-rating>
<script setup>
import { ref } from 'vue';
const rating = ref(3);
</script>
```

---

### **22. Breadcrumbs**
페이지의 계층 구조를 표시합니다.

#### **Props**
| Prop      | Type    | Default | Description                              |
|-----------|---------|---------|------------------------------------------|
| `items`   | Array   | `[]`    | 각 계층을 나타내는 항목 배열             |
| `divider` | String  | `'/'`   | 각 항목을 구분하는 기호                 |

#### **예제**
```vue
<v-breadcrumbs :items="breadcrumbs" divider=">"></v-breadcrumbs>
<script setup>
const breadcrumbs = [
  { text: 'Home', disabled: false, href: '/' },
  { text: 'Dashboard', disabled: true },
];
</script>
```

---

### **23. Image**
이미지를 표시하며, 로딩 상태와 오류 처리를 지원합니다.

#### **Props**
| Prop      | Type    | Default | Description                              |
|-----------|---------|---------|------------------------------------------|
| `src`     | String  | `null`  | 이미지 경로                              |
| `alt`     | String  | `''`    | 이미지 설명                              |
| `lazy`    | Boolean | `false` | 지연 로딩 활성화                        |

#### **예제**
```vue
<v-img src="https://example.com/image.jpg" alt="Example Image"></v-img>
```

---

### **24. Snackbar**
알림 메시지를 표시합니다.

#### **Props**
| Prop      | Type    | Default | Description                              |
|-----------|---------|---------|------------------------------------------|
| `v-model` | Boolean | `false` | 스낵바 표시 상태                         |
| `timeout` | Number  | `3000`  | 자동으로 사라지는 시간 (ms)              |

#### **예제**
```vue
<v-snackbar v-model="snackbar" timeout="3000">Action Successful!</v-snackbar>
<script setup>
import { ref } from 'vue';
const snackbar = ref(false);

const showSnackbar = () => {
  snackbar.value = true;
};
</script>
```

---

### **다룬 컴포넌트 목록**
- Tooltip
- Progress Bar
- Chips
- Carousel
- Alert
- Badge
- Expansion Panel
- Divider
- Menu
- Text Field
- Checkbox
- Switch
- Radio Button
- Slider
- Tabs
- Date Picker
- Pagination
- Skeleton Loader
- Stepper
- Timeline
- Rating
- Breadcrumbs
- Image
- Snackbar


---

## **7.6 학습 자료**

- [Vuetify 공식 문서](https://vuetifyjs.com/)
- [Material Design 가이드](https://material.io/design)

