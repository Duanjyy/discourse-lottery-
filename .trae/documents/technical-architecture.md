## 1. 架构设计
```mermaid
graph TD
    A["前端 (React)"] --> B["状态管理 (Zustand)"]
    A --> C["本地存储 (LocalStorage)"]
    B --> D["游戏核心逻辑"]
    B --> E["进度/收集系统"]
```

## 2. 技术栈说明
- 前端：React@18 + tailwindcss@3 + vite
- 初始化工具：vite-init
- 路由：react-router-dom
- 状态管理：zustand (配合 persist 中间件进行本地持久化)
- 图标库：lucide-react

## 3. 路由定义
| 路由 | 目的 |
|-------|---------|
| `/` | 首页 (主菜单、关卡入口) |
| `/game` | 核心游戏页 (游玩界面) |
| `/collection` | 收集与成就页 (图鉴、皮肤、成就) |

## 4. 数据模型 (Zustand State)
### 4.1 数据模型定义
```mermaid
erDiagram
    GameState {
        int currentLevel "当前关卡进度"
        array cards "所有卡牌信息(层级, 状态, 坐标)"
        array slot "卡槽中的卡牌"
        object props "道具剩余次数"
        boolean isGameOver "游戏是否结束"
        boolean isWin "游戏是否胜利"
    }
    PlayerProfile {
        int normalCleared "普通通关数"
        int hardCleared "困难通关数"
        int eliteCleared "精英通关数"
        int fragments "碎片数"
        int points "积分"
        array unlockedSkins "已解锁皮肤"
        array unlockedPatterns "已解锁图案"
    }
```

### 4.2 卡牌对象数据结构 (TypeScript Interface)
```typescript
interface Card {
  id: string; // 唯一ID
  type: string; // 卡牌图案类型 (如 🍎, 🍌)
  layer: number; // 所在层级
  row: number; // 行位置
  col: number; // 列位置
  isCovered: boolean; // 是否被上方卡牌遮挡
  status: 'idle' | 'in-slot' | 'eliminated'; // 卡牌状态
}
```
