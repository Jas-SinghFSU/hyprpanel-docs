# CLI Commnds

A list of all the CLI commands that Hyprpanel provides can be found by running the following command:

```bash
hyprpanel explain
```

In order to run this command, HyprPanel must be running.

## Toggling Menus

Dropdown menus in Hyprpanel can be toggled via CLI commands using the `hyprpanel toggleWindow` (or `hyprpanel t`) followed by the dropdown menu name.

Here are the names of the menus:

```bash
# Dashboard Menu
dashboardmenu
# Audio Menu (Volume levels/devices)
audiomenu
# Media Menu (Media playback controls)
mediamenu
# Network Menu
networkmenu
# Bluetooth Menu
bluetoothmenu
# Notifications Menu
notificationsmenu
# Calendar Menu
calendarmenu
# Battery menu
energymenu
# Power Actions Menu
powerdropdownmenu

# The settings dialog
settings-dialog
```

If you wanted to bind the **settings dialog** or the **audio menu** to a key-bind, you would bind the following commands:

```bash
# To open the settings dialog
hyprpanel toggleWindow settings-dialog
# To open the audio menu
hyprpanel t audiomenu
```

## Toggling/Hiding the Bars

Similarly to toggling menus, toggling the bar works the same way. In order to toggle the bar you provide the string `bar-#` where the `#` is the ID of the monitor on which you'd want to toggle the bar.

For example, if you want to toggle the bar on your first monitor, you would do so with the following command:

```bash
hyprpanel toggleWindow bar-0
```

Where `0` is the `ID` of your first monitor. Every subsequent monitor will have an ID that increments by 1. If you have 3 monitors, your ID will be: 0, 1, 2.

## Changing themes

You can also change themes via the command line. This is done via the `hyprpanel useTheme` command.

If you wanted to change your theme to the Nord theme via the command line, you would do so with the following command:

```bash
hyprpanel useTheme "/usr/share/hyprpanel/themes/nord.json"
```

You can pass in any file path as long as it represents a Hyprpanel theme.
