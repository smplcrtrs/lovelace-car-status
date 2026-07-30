# Car Status Card

A Home Assistant Lovelace card that shows a stylised top-down view of your car, with doors,
windows, bonnet and boot reacting live to their sensors. Configurable sensor readouts sit in four
regions around the graphic.

Integration-agnostic — every entity is chosen by you. Developed against
[Kia/Hyundai Connect](https://github.com/Hyundai-Kia-Connect/kia_uvo), but nothing is tied to it.

> **Status: early.** The card renders, reacts to state and runs controls, all configured by YAML.
> The graphical editor and gauges are not built yet — see [Roadmap](#roadmap).

## Requirements

Home Assistant 2025.7 or newer, and a browser supporting CSS `color-mix()` (Chrome 111+,
Safari 16.2+, Firefox 113+). The card derives its outline and glass shades from your chosen body
colour, so on much older browsers the artwork will lose its panel edges.

## Installation

### HACS (custom repository)

1. HACS → ⋮ → **Custom repositories**
2. Add `https://github.com/smplcrtrs/lovelace-car-status`, category **Dashboard**
3. Install **Car Status Card**, then reload your browser

### Manual

Copy `car-status.js` from the latest release into `config/www/`, then add it under
Settings → Dashboards → ⋮ → Resources as a **JavaScript module**:

```
/local/car-status.js
```

## Configuration

```yaml
type: custom:car-status-card
name: Santa Fe

vehicle:
  preset: suv
  colors:
    body: grey
    accent: primary
    open: amber
    fault: red

open_style: swing # swing | highlight | both

openings:
  bonnet: binary_sensor.santa_fe_hood_is_open
  boot: binary_sensor.santa_fe_trunk_is_open
  door_fl: binary_sensor.santa_fe_front_left_door_is_open
  door_fr: binary_sensor.santa_fe_front_right_door_is_open
  door_rl: binary_sensor.santa_fe_back_left_door_is_open
  door_rr: binary_sensor.santa_fe_back_right_door_is_open
  window_fl: binary_sensor.santa_fe_front_left_window_is_open
  window_fr: binary_sensor.santa_fe_front_right_window_is_open
  window_rl: binary_sensor.santa_fe_back_left_window_is_open
  window_rr: binary_sensor.santa_fe_back_right_window_is_open

tyres:
  fl:
    pressure: sensor.santa_fe_tire_pressure_front_left
    warning: binary_sensor.santa_fe_tire_pressure_front_left_warning_is_on
  fr: { pressure: ..., warning: ... }
  rl: { pressure: ..., warning: ... }
  rr: { pressure: ..., warning: ... }

regions:
  left:
    - entity: sensor.santa_fe_fuel_level
      name: Fuel
      icon: mdi:fuel
    - entity: sensor.santa_fe_odometer
      name: Odometer
      icon: mdi:counter
  right:
    - entity: sensor.santa_fe_next_service_distance
      name: Service in
      icon: mdi:wrench-clock
    - entity: input_datetime.santa_fe_mot_due
      name: MOT
      icon: mdi:certificate
```

### Options

| Key                | Type             | Default   | Description                                                            |
| ------------------ | ---------------- | --------- | ---------------------------------------------------------------------- |
| `name`             | string           | —         | Card header. Omit for no header.                                       |
| `vehicle.preset`   | string           | `suv`     | Artwork to use. `suv` or `placeholder`.                                |
| `vehicle.colors.*` | string           | see below | Theme colour token (`amber`, `blue-grey`, …) or any CSS colour.        |
| `open_style`       | string           | `swing`   | `swing` moves panels; `highlight` only recolours them.                 |
| `openings.<panel>` | string \| object | —         | Entity id, or an object (below).                                       |
| `tyres.<pos>`      | object           | —         | `pressure` and/or `warning` entity. Positions: `fl`, `fr`, `rl`, `rr`. |
| `regions.<region>` | list             | —         | Sensor rows. Regions: `above`, `left`, `right`, `below`.               |

Colour defaults: body `grey`, accent `primary`, open `amber`, fault `red`, ok `green`. Using theme
tokens rather than hex keeps the card correct in both light and dark themes.

Panels: `bonnet`, `boot`, `door_fl`, `door_fr`, `door_rl`, `door_rr`, `window_fl`, `window_fr`,
`window_rl`, `window_rr`. `f`/`r` is front/rear, `l`/`r` is left/right as seen from above with the
nose pointing up.

#### Opening object form

Use this when the entity's states don't match the defaults (`on`, `open`, `opening`, `true`):

```yaml
openings:
  boot:
    entity: cover.santa_fe_tailgate
    open_state: open # state that counts as open
    invert: false # flip the result
    color: red # override the open colour for this panel
```

#### Region rows

```yaml
- entity: sensor.santa_fe_fuel_level
  name: Fuel # defaults to the entity's friendly name
  icon: mdi:fuel # optional — see below
  color: amber # tints the icon
```

Every row and control shows an icon without you configuring one. The card asks Home Assistant for
the entity's icon, which resolves in the usual order: the icon you set on the entity, then its
`device_class`, then a domain default. Setting `icon` here overrides that. Controls with an entity
get a state-aware icon, so a lock shows locked and unlocked differently.

`display`, `min` and `max` are accepted and reserved for the gauge renderer, but every sensor row
currently renders as text.

#### Controls

A region item with a `type` other than `sensor` renders as a control instead of a readout. Put
them in `above` or `below` and they lay out as a button row.

```yaml
regions:
  below:
    - type: lock # presses lock.lock / lock.unlock depending on current state
      entity: lock.santa_fe_doors
      name: Doors
      icon: mdi:car-door-lock

    - type: toggle # homeassistant.toggle — switches, lights
      entity: switch.santa_fe_hazards
      name: Hazards
      icon: mdi:hazard-lights
      color: red

    - type: button # button.press
      entity: button.santa_fe_force_update
      name: Refresh

    - type: action # any Home Assistant action
      name: Flash lights
      icon: mdi:car-light-high
      confirm: Flash the lights?
      tap_action:
        action: perform-action
        perform_action: kia_uvo.start_hazard_lights
        target:
          device_id: your_car_device_id

  above:
    - type: climate # −/+ setpoint stepper via climate.set_temperature
      entity: climate.santa_fe
      name: Climate
      min: 16
      max: 30
      step: 0.5
```

| Control key               | Applies to          | Description                                              |
| ------------------------- | ------------------- | -------------------------------------------------------- |
| `type`                    | all                 | `lock`, `toggle`, `button`, `climate` or `action`.       |
| `entity`                  | all but `action`    | The entity to drive.                                     |
| `name` / `icon` / `color` | all                 | Label, icon, and accent colour when active.              |
| `confirm`                 | all                 | Prompt with this text before acting.                     |
| `tap_action`              | `action`, `climate` | Standard HA action config. Required for `action`.        |
| `min` / `max` / `step`    | `climate`           | Setpoint bounds. Default to the entity's own attributes. |

Controls disable themselves when their entity is missing or unavailable, so a car that has gone
offline can't be sent a command that will silently fail.

#### Tyres

The four tyres are drawn in columns either side of the car rather than tucked under it, so their
status is legible and there is room for the pressure reading beneath each one. A tyre turns red
when its `warning` entity is on.

Tyres are only drawn when at least one is configured — otherwise they would be four orphan shapes
floating beside the car. Configure all four together so the positions read correctly.

### Layout

Rows in `left` and `right` flank the car on wide cards and stack above and below it once the card
is narrower than about 460px, so the card stays usable on mobile.

## Roadmap

- [x] Car graphic with door, window, bonnet and boot state
- [x] Configurable sensor regions
- [x] Control buttons — lock/unlock, hazards, climate
- [ ] Graphical configuration editor
- [x] Tyre pressures and warnings on the graphic
- [ ] Gauge and bar renderers for levels
- [ ] Light and fault indicators on the graphic

## Development

```bash
npm install
npm run dev
```

`dev/harness.html` renders the card against a stubbed `hass` in a plain browser — every panel
state, both open styles, and light and dark themes — so the artwork can be iterated without a
round-trip to Home Assistant. `dev/art.html` shows just the graphic, large, for judging the
drawing. Serve the repo root over HTTP and open either page.

Artwork lives behind the `CarArt` contract in `src/art/types.ts`. Adding a body style is a new
folder under `src/art/` plus one line in `src/art/index.ts`; the card and editor read the preset's
declared panel list, so neither needs changing.

## Credits

Type definitions in `src/ha/` are adapted from
[home-assistant/frontend](https://github.com/home-assistant/frontend) (Apache-2.0).

## Licence

MIT
