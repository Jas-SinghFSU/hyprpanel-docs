# CLI Commnds

## Toggling Menus

Dropdown menus in Hyprpanel can be toggled via CLI commands using the `ags -t` followed by the dropdown menu name.

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
# On AGS v1
# To open the settings dialog
ags -t settings-dialog
# To open the audio menu
ags -t audiomenu

# On AGS v2
# To open the settings dialog
agsv1 -t settings-dialog
# To open the audio menu
agsv1 -t audiomenu
```

## Toggling/Hiding the Bars

Similarly to toggling menus, toggling the bar works the same way. In order to toggle the bar you provide the string `bar-#` where the `#` is the ID of the monitor on which you'd want to toggle the bar.

For example, if you want to toggle the bar on your first monitor, you would do so with the following command:

```bash
# On AGS v1
ags -t bar-0

# On AGS v2
agsv1 -t bar-0
```

Where `0` is the `ID` of your first monitor. Every subsequent monitor will have an ID that increments by 1. If you have 3 monitors, your ID will be: 0, 1, 2.

## Changing themes

You can also change themes via the command line. This is done via the `ags -r "useTheme('path/to/theme.json')"` command.

If you wanted to change your theme to the Nord theme via the command line, you would do so with the following command:

```bash
# On AGS v1
ags -r "useTheme('$HOME/.config/ags/themes/nord.json')"

# On AGS v2
agsv1 -r "useTheme('$HOME/.config/ags/themes/nord.json')"
```

You can pass in any file path as long as it represents a Hyprpanel theme.

## Utility Commands

Commands in AGS can be executed by using the -r flag and passing a function as a string. For example, to check if a bar is toggled, you can use the following command:

```bash
# On AGS v1
ags -r "isWindowVisible('bar-0')"

# On AGS v2
agsv1 -r "isWindowVisible('bar-0')"
```

Format:

```bash
# On AGS v1
ags -r "command()"

# On AGS v2
agsv1 -r "command()"
```

| Command                       | Description                                                        | Params        |
| ----------------------------- | ------------------------------------------------------------------ | ------------- |
| isWindowVisible('windowName') | Checks if an AGS window is toggled                                 | windowName    |
| getSystrayItems()             | Gets a list of IDs for the current applications in the system tray | --            |
| clearAllNotifications()       | Clears all of the notifications that currently exist               | --            |
| setWallpaper('wallpaperPath') | Sets the input file as the active wallpaper                        | wallpaperPath |
