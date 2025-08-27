# DarkVeil 背景颜色自定义说明

## 概述

DarkVeil 组件现在支持自定义背景颜色功能。通过 `backgroundColor` 属性，您可以轻松地修改组件的背景颜色，而不再局限于默认的黑色背景。

## 使用方法

### 基本语法

```tsx
<DarkVeil
  backgroundColor={[红色值, 绿色值, 蓝色值]} // RGB值，范围 0-1
  // 其他属性...
/>
```

### 参数说明

- `backgroundColor`: 可选参数，类型为 `[number, number, number]`
- 数组包含三个数值，分别代表红、绿、蓝三个颜色通道
- 每个值的范围是 0.0 到 1.0（而不是传统的 0-255）
- 默认值：`[0.0, 0.0, 0.0]`（黑色）

## 颜色示例

### 常用颜色配置

```tsx
// 黑色背景（默认）
<DarkVeil backgroundColor={[0.0, 0.0, 0.0]} />

// 深蓝色背景
<DarkVeil backgroundColor={[0.05, 0.1, 0.2]} />

// 深紫色背景
<DarkVeil backgroundColor={[0.1, 0.05, 0.15]} />

// 深绿色背景
<DarkVeil backgroundColor={[0.05, 0.15, 0.1]} />

// 深红色背景
<DarkVeil backgroundColor={[0.15, 0.05, 0.05]} />

// 深灰色背景
<DarkVeil backgroundColor={[0.1, 0.1, 0.1]} />

// 暖色调背景
<DarkVeil backgroundColor={[0.12, 0.08, 0.05]} />

// 冷色调背景
<DarkVeil backgroundColor={[0.05, 0.08, 0.12]} />
```

### RGB 转换公式

如果您有传统的 RGB 值（0-255 范围），可以使用以下公式转换：

```javascript
// 将 RGB(51, 102, 153) 转换为 DarkVeil 格式
const r = 51 / 255; // 0.2
const g = 102 / 255; // 0.4
const b = 153 / 255; // 0.6

// 使用转换后的值
<DarkVeil backgroundColor={[0.2, 0.4, 0.6]} />;
```

## 完整示例

```tsx
import DarkVeil from './components/DarkVeil';

function MyComponent() {
  return (
    <div className="relative h-screen">
      {/* 内容层 */}
      <div className="relative z-10">
        <h1>我的网站标题</h1>
        <p>网站内容...</p>
      </div>

      {/* 背景效果层 */}
      <div className="absolute inset-0 pointer-events-none">
        <DarkVeil
          speed={0.5}
          hueShift={56}
          noiseIntensity={0.2}
          scanlineIntensity={0}
          scanlineFrequency={0.5}
          warpAmount={0}
          backgroundColor={[0.05, 0.1, 0.2]} // 深蓝色背景
        />
      </div>
    </div>
  );
}
```

## 技术实现原理

1. **Shader 层面**：在片段着色器中添加了 `uniform vec3 uBackgroundColor` 变量
2. **颜色混合**：使用 GLSL 的 `mix()` 函数将背景颜色与生成的图案进行混合
3. **混合公式**：`col.rgb = mix(uBackgroundColor, col.rgb, col.a)`
   - `uBackgroundColor`：用户指定的背景颜色
   - `col.rgb`：CPPN 算法生成的颜色
   - `col.a`：透明度通道，控制混合程度

## 注意事项

1. **颜色范围**：确保 RGB 值在 0.0-1.0 范围内，超出范围可能导致意外效果
2. **性能影响**：背景颜色修改不会影响渲染性能
3. **兼容性**：该功能与所有其他 DarkVeil 参数完全兼容
4. **实时更新**：背景颜色可以实时修改，组件会自动重新渲染

## 推荐配色方案

- **科技感**：深蓝色 `[0.05, 0.1, 0.2]`
- **神秘感**：深紫色 `[0.1, 0.05, 0.15]`
- **自然感**：深绿色 `[0.05, 0.15, 0.1]`
- **温暖感**：暖灰色 `[0.12, 0.08, 0.05]`
- **冷酷感**：冷灰色 `[0.05, 0.08, 0.12]`
