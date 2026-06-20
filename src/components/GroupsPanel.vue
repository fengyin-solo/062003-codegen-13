<template>
  <div class="groups-panel card">
    <h3>🌟 出道组合</h3>
    <div v-if="groups.length === 0" class="empty">暂无出道组合</div>
    <div v-for="group in groups" :key="group.id" class="group-item">
      <div class="group-head">
        <strong>{{ group.name }}</strong>
        <span class="debut-day">第 {{ group.debutedDay }} 天出道</span>
      </div>

      <div v-if="group.leaderType" class="leader-info">
        <span class="leader-icon">{{ leaderTypes[group.leaderType]?.icon }}</span>
        <span class="leader-label">{{ leaderTypes[group.leaderType]?.label }}</span>
        <span class="leader-desc">{{ leaderTypes[group.leaderType]?.description }}</span>
      </div>

      <div class="members">
        <div
          v-for="id in group.memberIds"
          :key="id"
          class="member-row"
        >
          <span class="member-name">{{ memberName(id) }}</span>
          <template v-if="editingGroup === group.id">
            <select
              v-model="editPositions[id]"
              class="pos-select sm"
              @change="onPositionChange(group.id, id)"
            >
              <option value="">-- 无担当 --</option>
              <option v-for="(cfg, key) in memberRoles" :key="key" :value="key">
                {{ cfg.icon }} {{ cfg.label }}
              </option>
            </select>
          </template>
          <template v-else>
            <span v-if="getPosition(group, id)" class="member-pos">
              {{ memberRoles[getPosition(group, id)]?.icon }}
              {{ memberRoles[getPosition(group, id)]?.label }}
            </span>
            <span v-else class="member-pos muted">未分配</span>
          </template>
        </div>
      </div>

      <div class="group-stats">
        <span>总销量 {{ group.totalSales.toLocaleString() }}</span>
        <span>{{ group.singles.length }} 张单曲</span>
      </div>

      <div class="group-actions">
        <button
          class="btn ghost sm"
          @click="toggleEdit(group)"
        >
          {{ editingGroup === group.id ? '✓ 完成' : '✏️ 编辑分工' }}
        </button>
        <button
          class="btn primary sm"
          :disabled="money < singleCost"
          @click="$emit('release', group.id)"
        >
          发行单曲 (¥{{ singleCost.toLocaleString() }})
        </button>
      </div>

      <div v-if="editingGroup === group.id" class="leader-edit">
        <label class="edit-label">队长类型：</label>
        <select v-model="editLeaderType" class="pos-select">
          <option v-for="(cfg, key) in leaderTypes" :key="key" :value="key">
            {{ cfg.icon }} {{ cfg.label }}
          </option>
        </select>
        <button class="btn primary xs" @click="onLeaderChange(group.id)">应用</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { GAME_CONFIG } from '../config/gameConfig'

const props = defineProps({
  groups: Array,
  trainees: Array,
  money: Number,
})

const emit = defineEmits(['release', 'set-positions'])

const singleCost = GAME_CONFIG.single.creationCost
const leaderTypes = GAME_CONFIG.positions.leaderTypes
const memberRoles = GAME_CONFIG.positions.memberRoles

const editingGroup = ref(null)
const editPositions = reactive({})
const editLeaderType = ref('')

function memberName(id) {
  return props.trainees.find((t) => t.id === id)?.name || '未知'
}

function getPosition(group, traineeId) {
  const trainee = props.trainees.find((t) => t.id === traineeId)
  return trainee?.position || group.positions?.[traineeId] || null
}

function toggleEdit(group) {
  if (editingGroup.value === group.id) {
    editingGroup.value = null
  } else {
    editingGroup.value = group.id
    editLeaderType.value = group.leaderType || 'allrounder'
    for (const id of group.memberIds) {
      editPositions[id] = getPosition(group, id) || ''
    }
  }
}

function onPositionChange(groupId, traineeId) {
  const positions = {}
  positions[traineeId] = editPositions[traineeId] || null
  emit('set-positions', groupId, positions, null)
}

function onLeaderChange(groupId) {
  emit('set-positions', groupId, {}, editLeaderType.value)
}
</script>

<style scoped>
.groups-panel h3 { margin-bottom: 0.75rem; }

.empty {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.group-item {
  padding: 0.75rem;
  background: var(--bg-secondary);
  border-radius: 8px;
  margin-bottom: 0.75rem;
}

.group-head {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  align-items: center;
}

.debut-day {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.leader-info {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.4rem 0.6rem;
  background: var(--accent-soft);
  border-radius: 6px;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
}

.leader-icon { font-size: 1.1rem; }
.leader-label { font-weight: 600; color: var(--accent); }
.leader-desc { color: var(--text-muted); font-size: 0.72rem; margin-left: auto; }

.members {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  margin-bottom: 0.5rem;
}

.member-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
}

.member-name {
  font-size: 0.85rem;
  color: var(--text-secondary);
  min-width: 60px;
}

.member-pos {
  font-size: 0.78rem;
  padding: 0.1rem 0.45rem;
  border-radius: 4px;
  background: var(--bg-primary);
  color: var(--text-primary);
}

.member-pos.muted {
  color: var(--text-muted);
  font-style: italic;
}

.pos-select {
  padding: 0.25rem 0.5rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg-primary);
  color: var(--text-primary);
  font-size: 0.78rem;
}

.pos-select.sm {
  padding: 0.15rem 0.4rem;
  font-size: 0.75rem;
}

.group-stats {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.group-actions {
  display: flex;
  gap: 0.5rem;
}

.leader-edit {
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border);
}

.edit-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.btn.xs {
  padding: 0.2rem 0.5rem;
  font-size: 0.75rem;
}
</style>
