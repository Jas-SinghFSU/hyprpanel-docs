# Migrating to AGSv2/Astal

If you are currently using AGSv1, then this guide will help you migrate to AGSv2/Astal.

## Installing HyprPanel

### Arch

```bash
yay -S ags-hyprpanel-git
```

### From Source

#### AGSv2

First you must install AGSv2. You can find the instructions [here](https://aylur.github.io/ags/guide/install.html).

#### Dependencies

##### Required

```bash
wireplumber
libgtop
bluez
bluez-utils
networkmanager
dart-sass
wl-clipboard
upower
gvfs
```

##### Optional

```bash
## Used for Tracking GPU Usage in your Dashboard (NVidia only)
python
python-gpustat

## To control screen/keyboard brightness
brightnessctl

## Only if a pywal hook from wallpaper changes applied through settings is desired
pywal

## To check for pacman updates in the default script used in the updates module
pacman-contrib

## To switch between power profiles in the battery module
power-profiles-daemon

## To take snapshots with the default snapshot shortcut in the dashboard
grimblast

## To record screen through the dashboard record shortcut
gpu-screen-recorder

## To enable the eyedropper color picker with the default snapshot shortcut in the dashboard
hyprpicker

## To enable hyprland's very own blue light filter
hyprsunset

## To enable hyprland's very own idle inhibitor
hypridle

## To click resource/stat bars in the dashboard and open btop
btop

## To enable matugen based color theming
matugen

## To enable matugen based color theming and setting wallpapers
swww
```

**On Arch Linux, you can install all the dependencies by running:**

Pacman:

```bash
 sudo pacman -S --needed wireplumber libgtop bluez bluez-utils btop networkmanager dart-sass wl-clipboard brightnessctl swww python upower pacman-contrib power-profiles-daemon gvfs
```

AUR:

```bash
yay -S --needed grimblast-git gpu-screen-recorder-git hyprpicker matugen-bin python-gpustat hyprsunset-git hypridle-git
```

### Installing

To install HyprPanel, you can run the following commands:

```bash
git clone https://github.com/Jas-SinghFSU/HyprPanel.git
cd HyprPanel
meson setup build
meson compile -C build
meson install -C build
```

## Running HyprPanel

Once you have installed HyprPanel, you can run it by running the following command:

```bash
hyprpanel

# Or add it to your startup via
exec-once = hyprpanel
```

## Migrating your configuration

The configuration for HyprPanel is now stored in `~/.config/hyprpanel`. If you have just migrated to HyprPanel v2, you must migrate your old configuration.

Fortunately, this is easy:

1. Launch HyprPanel via `hyprpanel`
2. Run the following command in the terminal:

```bash
hyprpanel migrateConfig
```

## Notes

### Scripts

Pre-packaged scripts for hyprpanel are now installed in `/usr/local/share/hyprpanel/scripts`.

You may have to go through your settings dialog and reset the location of these scripts by clicking the reset icon on the right side of the input field.

Resetting them will allow you to use the new script paths that come with HyprPanel.

### CLI Commands

Hyprpanel now has it's own CLI commands. You can run the following command to view all the available commands:

```bash
hyprpanel explain
```

If you want more information on a specific command, you can run:

```bash
hyprpanel explain <command>
```

For example, to check which required and optional dependencies are installed/missing, you can run:

```bash
hyprpanel checkDependencies
```
