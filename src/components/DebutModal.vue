<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal card large">
      <h3>🎉 组队出道</h3>
      <p class="desc">
        选择 {{ minSize }}-{{ maxSize }} 名达标练习生组成出道组合
      </p>

      <div class="name-input">
        <label>组合名</label>
        <input v-model="groupName" placeholder="输入组合名称" />
      </div>

      <div class="section">
        <label class="section-label">👑 选择队长类型</label>
        <div class="leader-types">
          <label
            v-for="(cfg, key) in leaderTypes"
            :key="key"
            class="leader-type"
            :class="{ selected: leaderType === key }"
          >
            <input type="radio" :value="key" v-model="leaderType" />
            <span class="leader-icon">{{ cfg.icon }}</span>
            <span class="leader-info">
              <strong>{{ cfg.label }}</strong>
              <small>{{ cfg.description }}</small>
            </span>
          </label>
        </div>
      </div>

      <div class="section">
        <label class="section-label">🌟 选择出道成员</label>
        <div class="candidate-list">
          <label
            v-for="t in candidates"
            :key="t.id"
            class="candidate"
            :class="{ selected: selected.includes(t.id), disabled: !t.canDebut }"
          >
            <input
              type="checkbox"
              :value="t.id"
              :disabled="!t.canDebut"
              v-model="selected"
            />
            <span class="c-name">{{ t.name }}</span>
            <span class="score">{{ t.score }}分</span>
          </label>
        </div>
      </div>

      <div v-if="selected.length > 0" class="section">
        <label class="section-label">💫 分配成员担当</label>
        <div class="positions-list">
          <div v-for="id in selected" :key="id" class="position-row">
            <span class="pos-name">{{ getCandidate(id)?.name }}</span>
            <select v-model="positions[id]" class="pos-select">
              <option value="">-- 无担当 --</option>
              <option v-for="(cfg, key) in memberRoles" :key="key" :value="key">
                {{ cfg.icon }} {{ cfg.label }}
              </option>
            </select>
          </div>
        </div>
        <p v-if="selected.length > 0" class="hint">
          提示：担当匹配核心属性可获得训练和单曲加成
        </p>
      </div>

      <p v-if="error" class="error">{{ error }}</p>

      <div class="modal-actions">
        <button class="btn primary" :disabled="selected.length < minSize" @click="confirm">
          确认出道
        </button>
        <button class="btn ghost" @click="$emit('close')">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { GAME_CONFIG } from '../config/gameConfig'

const props = defineProps({
  candidates: Array,
})
const emit = defineEmits(['close', 'confirm'])

const minSize = GAME_CONFIG.rating.minGroupSize
const maxSize = GAME_CONFIG.rating.maxGroupSize
const leaderTypes = GAME_CONFIG.positions.leaderTypes
const memberRoles = GAME_CONFIG.positions.memberRoles

const selected = ref([])
const groupName = ref('')
const leaderType = ref('allrounder')
const positions = reactive({})
const error = ref('')

function getCandidate(id) {
  return props.candidates.find((t) => t.id === id)
}

function confirm() {
  error.value = ''
  if (selected.value.length < minSize || selected.value.length > maxSize) {
    error.value = `请选择 ${minSize}-${maxSize} 名成员`
    return
  }
  if (!leaderType.value) {
    error.value = '请选择队长类型'
    return
  }
  emit('confirm', selected.value, groupName.value, leaderType.value, { ...positions })
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 110;
  padding: 1rem;
}

.modal {
  max-width: 520px;
  width: 100%;
  padding: 1.5rem;
  max-height: 90vh;
  overflow-y: auto;
}

.modal.large { max-width: 560px; }

.desc {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.section {
  margin-bottom: 1rem;
}

.section-label {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.name-input {
  margin-bottom: 1rem;
}

.name-input label {
  display: block;
  font-size: 0.85rem;
  margin-bottom: 0.35rem;
  color: var(--text-secondary);
}

.name-input input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--bg-secondary);
  color: var(--text-primary);
  font-size: 0.95rem;
}

.leader-types {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.leader-type {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  background: var(--bg-secondary);
}

.leader-type.selected {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.leader-icon {
  font-size: 1.4rem;
}

.leader-info {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.leader-info small {
  font-size: 0.7rem;
  color: var(--text-muted);
  margin-top: 2px;
}

.candidate-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  max-height: 200px;
  overflow-y: auto;
}

.candidate {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
}

.candidate.selected { border-color: var(--accent); background: var(--accent-soft); }
.candidate.disabled { opacity: 0.4; cursor: not-allowed; }

.c-name { flex: 1; }

.score {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.positions-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.position-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.4rem 0.6rem;
  background: var(--bg-secondary);
  border-radius: 6px;
}

.pos-name {
  flex: 1;
  font-size: 0.9rem;
}

.pos-select {
  padding: 0.35rem 0.6rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 0.85rem;
  min-width: 140px;
}

.hint {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.error {
  color: var(--danger);
  font-size: 0.85rem;
  margin-bottom: 0.75rem;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}
</style>
