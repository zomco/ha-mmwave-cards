# MMWave Radar Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-orange.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/release/zomco/ha-mmwave-card.svg)](https://github.com/zomco/ha-mmwave-card/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Multi-model millimeter-wave radar calibration & live visualization card for [Home Assistant](https://www.home-assistant.io/).

---

## Supported Models

| Model | Freq | Targets | Z axis | Breathing | Heart rate | Sleep |
|---|---|---|---|---|---|---|
| [MicRadar R60ABD1](https://www.micradar.cn/) | 60 GHz | 1 | ✅ | ✅ | ✅ | ✅ |
| [Hi-Link LD2450](https://www.hlktech.net/) | 24 GHz | 3 | ❌ | ❌ | ❌ | ❌ |

Adding a new model requires only creating one file — see [Adding a New Model](#adding-a-new-model).

---

## Features

| Panel | Description |
|---|---|
| **① Geometry & Boundary** | Installation coordinates (X/Y/height), orientation (yaw/pitch/roll), optional room boundary polygon |
| **② Yaw Calibration** | Two-point geometric method — no IMU required |
| **③ Live View** | Real-time top-down map, time-faded trail, boundary filtering, multi-target support |

- Full 3-axis orientation: yaw · pitch · roll (for non-horizontal installations)
- Room boundary polygon: targets outside are shown with a dashed indicator and excluded from the trail
- Multi-target: LD2450 shows up to 3 targets simultaneously with index labels
- Per-model calibration saved separately in `localStorage`
- Visual config editor with model-aware entity picker

---

## Screenshots

> **Tab ① — Geometry & Boundary**
>
> ![Geometry and boundary panel](docs/screenshot-geo.png)

> **Tab ② — Yaw Calibration**
>
> ![Yaw calibration panel](docs/screenshot-yaw.png)

> **Tab ③ — Live View**
>
> ![Live view panel](docs/screenshot-live.png)

---

## Installation

### Via HACS (recommended)

[![Open your Home Assistant instance and open a repository inside HACS.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=zomco&repository=ha-mmwave-card&category=plugin)

Or: **HACS → Frontend → ⋮ → Custom repositories** → add this repo URL → category **Lovelace**.

### Manual

1. Download `mmwave-card.js` from the [latest release](https://github.com/zomco/ha-mmwave-card/releases/latest).
2. Copy to `<config>/www/mmwave-card.js`.
3. **Settings → Dashboards → ⋮ → Resources** → add `/local/mmwave-card.js` (type: module).

---

## Configuration

### R60ABD1

```yaml
type: custom:mmwave-card
radar_model: r60abd1
presence_entity: binary_sensor.r60abd1_presence
x_entity: sensor.r60abd1_x
y_entity: sensor.r60abd1_y
z_entity: sensor.r60abd1_z        # optional
breath_entity: sensor.r60abd1_breath  # optional
heart_entity:  sensor.r60abd1_heart   # optional
sleep_entity:  sensor.r60abd1_sleep   # optional
room_w: 400   # room width (cm)
room_d: 350   # room depth (cm)
```

### LD2450

```yaml
type: custom:mmwave-card
radar_model: ld2450
presence_entity: binary_sensor.ld2450_presence
target1_x: sensor.ld2450_target_1_x
target1_y: sensor.ld2450_target_1_y
target2_x: sensor.ld2450_target_2_x  # optional
target2_y: sensor.ld2450_target_2_y
target3_x: sensor.ld2450_target_3_x  # optional
target3_y: sensor.ld2450_target_3_y
room_w: 500
room_d: 400
```

### All options

| Option | Type | Default | Description |
|---|---|---|---|
| `radar_model` | string | **required** | Model ID: `r60abd1`, `ld2450`, … |
| `room_w` | number | `400` | Room width for canvas scaling (cm) |
| `room_d` | number | `350` | Room depth for canvas scaling (cm) |
| `presence_entity` | string | **required** | Binary sensor for presence |
| *(model entities)* | string | varies | See model tables above |

---

## Adding a New Model

1. **Create** `src/models/<your_model>/index.ts` and implement `RadarModelAdapter`:

```typescript
import type { RadarModelAdapter } from "../base";

export const myRadarAdapter: RadarModelAdapter = {
  info: {
    id: "my_radar",
    displayName: "My Radar XYZ",
    fovDegrees: 90,
    maxRangeM: 5,
    updateRateHz: 10,
    maxTargets: 1,
    hasZAxis: false,
    hasBreathing: false,
    hasHeartRate: false,
    hasSleep: false,
  },

  getEntitySchema: () => [
    { key: "presence_entity", labelKey: "editor.presence_entity", required: true,  domain: "binary_sensor" },
    { key: "x_entity",        labelKey: "editor.x_entity",        required: true,  domain: "sensor" },
    { key: "y_entity",        labelKey: "editor.y_entity",        required: true,  domain: "sensor" },
  ],

  validateConfig(config) {
    return this.getEntitySchema()
      .filter(f => f.required && !config[f.key])
      .map(f => `Missing: ${f.key}`);
  },

  readFromHass(hass, config) {
    const pres = hass.states[config.presence_entity as string];
    if (!pres || pres.state !== "on") return { present: false, targets: [] };
    const x = parseFloat(hass.states[config.x_entity as string]?.state) || 0;
    const y = parseFloat(hass.states[config.y_entity as string]?.state) || 0;
    return { present: true, targets: [{ index: 0, rawX: x, rawY: y, rawZ: 0 }] };
  },

  getDefaultCalibration() {
    return { ...DEFAULT_CALIBRATION, radar_height: 200 };
  },
};
```

2. **Register** it in `src/models/index.ts`:

```typescript
import { myRadarAdapter } from "./my_radar";

export const RADAR_MODELS: Record<string, RadarModelAdapter> = {
  r60abd1: r60abd1Adapter,
  ld2450:  ld2450Adapter,
  my_radar: myRadarAdapter,   // ← add here
};
```

3. **Build**: `npm run build`

That's all. The editor model picker, all three panels, and the calibration storage update automatically.

---

## Building from Source

```bash
git clone https://github.com/zomco/ha-mmwave-card.git
cd ha-mmwave-card
npm install
npm run build      # → dist/mmwave-card.js
npm start          # watch mode
```

Requires Node.js ≥ 18.

---

## Related

- [ESPHome R60ABD1 Component](https://github.com/zomco/esphome-r60abd1)

---

## License

MIT © zomco