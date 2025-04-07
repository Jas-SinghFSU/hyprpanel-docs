# HyprPanel Custom Modules Guide

HyprPanel supports custom modules that allow you to extend the panel's functionality with your own configurations and styling. This guide provides complete details on how to define your custom modules in JSON and style them using SCSS.

---

## 1. Module Configuration

Custom modules are defined in the `modules.json` file located at:

```bash
~/.config/hyprpanel/modules.json
```

Each custom module should follow the pattern `custom/<module-name>`.

### Example Structure

```json
{
    "custom/module-name": {
        // Module configuration
    }
}
```

### Module Properties

| Property          | Type                                           | Description                                                                                                                                                                                             | Example                                                                                       |
| ----------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `icon`            | `string \| string[] \| Record<string, string>` | Defines the icon(s). Use a single string for a static icon, an array for percentage-based icons, or an object for state-based icons.                                                                    | **static**<br> `"🚀"`<br><br> **percentage**<br>`["󰕿", "󰖀", "󰕾"]` <br><br> **state**<br> `{ "arch": "󰣇", "nix": "󱄅", "ubuntu": "󰕈", "fedora": "󰣛" }`  |
| `label`           | `string`                                       | Template for displaying output. Use `{}` for plain text or `{path.to.value}` for JSON values.                                                                                                           | `"{percentage}%"`<br>`"Hello {user.name}"`<br>`"{}"`                                                |
| `tooltip`         | `string`                                       | Tooltip content. Same templating rules as `label`.                                                                                                                                                      | `"Volume: {percentage}%"`                                                                     |
| `truncationSize`  | `number`                                       | Truncates the label after this many characters. Use `-1` to disable truncation.                                                                                                                         | `15` or `-1`                                                                                  |
| `execute`         | `string`                                       | Shell command or script that outputs either valid JSON or plain text.                                                                                                                                   | `"/home/dwigt/scripts/volume.sh"`, `"date '+%H:%M'"`                                          |
| `executeOnAction` | `string`                                       | Command or script executed when the module is triggered via an action.                                                                                                                                  | `"notify-send 'clicked!'"`                                                                    |
| `interval`        | `number`                                       | Time interval in milliseconds between each execution of the command.                                                                                                                                    | `1000`                                                                                        |
| `hideOnEmpty`     | `boolean`                                      | If `true`, hides the module when the output is empty.                                                                                                                                                   | `true`                                                                                        |
| `scrollThreshold` | `number`                                       | Scrolling sensitivity where lower = less sensitive scrolling.                                                                                                                                           | `4`                                                                                           |
| `actions`         | `object`                                       | Defines mouse/scroll interactions:<br>• `onLeftClick`<br>• `onRightClick`<br>• `onMiddleClick`<br>• `onScrollUp`<br>• `onScrollDown`<br><br>Actions can also spawn menus as well (ex: `menu:dashboard`) | `menu:audio`                                                                                  |

---

## 2. Command Output Requirements

### Icons

#### Static Icon

- Displays the provided icon (string).

```json
{
    "icon": ""
}
```

#### Percentage-Based Icons (`string[]`)

- Output must be valid JSON with a `percentage` key.
- The `percentage` value must be between 0–100.
- Icon is selected based on percentage range:

```json
["󰕿", "󰖀", "󰕾"]
```

```text
percentage: 0–33.33       →   "󰕿"
percentage: 33.34–66.66   →   "󰖀"
percentage: 66.67–100     →   "󰕾"
```

#### State-Based Icons (`Record<string,string>`)

- Output must be JSON with an `alt` key.
- Value must match one of the keys in the icon object.
- Optional `default` key can be used as fallback.

**icon**

```json
{
    "icon": {
        "arch": "󰣇",
        "nix": "󱄅",
        "ubuntu": "󰕈",
        "fedora": "󰣛"
    }
}
```

**expected shell command output (parsed)**

```json
{
    "alt": "arch"
}
```

If the above is the output of your shell command, then the icon displayed will be the `arch` icon.

### Label and Tooltip

**JSON Example Output**

```json
{
    "percentage": 75,
    "server": {
        "status": "up"
    }
}
```

**Template Examples:**

- `{percentage}%` → displays `75%`
- `{server.status}` → displays `up`

**Plain Text Example:**

- Output: `Hello World`
- Label: `{}` → displays `Hello World`

---

## 3. Volume Module Example

### Volume

```json
{
    "custom/volume": {
        "icon": ["󰕿", "󰖀", "󰕾"],
        "label": "{percentage}%",
        "tooltip": "Current Volume: {percentage}%",
        "truncationSize": -1,
        "execute": "pactl get-sink-volume @DEFAULT_SINK@ | awk '{print $5}' | sed 's/[^0-9]*//g' | xargs -I{} echo '{\"percentage\": {}}'",
        "executeOnAction": "",
        "interval": 1000,
        "hideOnEmpty": true,
        "scrollThreshold": 1,
        "actions": {
            "onLeftClick": "menu:audio",
            "onRightClick": "",
            "onMiddleClick": "",
            "onScrollUp": "hyprpanel vol +5",
            "onScrollDown": "hyprpanel vol -5"
        }
    }
}
```

---

## 4. Module Styling

Custom styles can be defined in the SCSS file located at:

```bash
~/.config/hyprpanel/modules.scss
```

Use the `@include styleModule()` mixin to define appearance rules for each module.

For the remaining styling properties, you can change those via the settings dialog as usual.

### Mixin Parameters

1. **Module Class Name** — Use the format `cmodule-<name>` (e.g., `cmodule-volume` for `custom/volume`).
2. **Properties Map** — A map of optional style values.

### Styling Example

```scss
/* ##################################
 * #  Custom Volume Module Styling  #
 * ################################## */
@include styleModule(
    // class name
    'cmodule-volume',
    // styling properties
    (
            'text-color': #cba6f7,
            'icon-color': #242438,
            'icon-background': #cba6f7,
            'label-background': #242438,
            'inner-spacing': 0.5em,
            'border-enabled': false,
            'border-color': #cba6f7,
            'icon-size': 1.2em
        )
);
```

### Notes

- **Naming Convention:** The class must match the `custom/` module name with `cmodule-` as the prefix.
- **All Properties Optional:** Only specify the ones you want to override.
- **`icon-background` Note:** Only applied when using split button-style mode in panel settings.

## 5. Enabling Custom Modules

Once you've defined your custom modules, you can assign them to a bar in your HyprPanel settings dialog, as you would with regular modules.

For example, in order to enable the `custom/volume` module, you can add it to your **Layout** in **Configuration > Bar > Layouts > Bar Layouts for Monitors**:

```json
{
    "0": {
        "left": ["dashboard"],
        "middle": ["workspaces"],
        "right": ["custom/volume"]
    }
}
```

---
