# Installation

## Arch

```bash
yay -S ags-hyprpanel-git
```

## From Source

### Dependencies

#### Required

```sh
aylurs-gtk-shell-git
wireplumber
libgtop
bluez
bluez-utils
networkmanager
dart-sass
wl-clipboard
upower
gvfs
gtksourceview3
libsoup3
```

::: warning
HyprPanel may not run properly without the required dependencies.
:::

#### Optional

```sh
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
wf-recorder

## To enable the eyedropper color picker with the default snapshot shortcut in the dashboard
hyprpicker

## To enable hyprland's very own blue light filter
hyprsunset

## To click resource/stat bars in the dashboard and open btop
btop

## To enable matugen based color theming
matugen

## To enable matugen based color theming and setting wallpapers
swww
```

### Arch

To install the dependencies on Arch, you can use the following command:

```bash
yay -S --needed aylurs-gtk-shell-git wireplumber libgtop bluez bluez-utils btop networkmanager dart-sass wl-clipboard brightnessctl swww python upower pacman-contrib power-profiles-daemon gvfs gtksourceview3 libsoup3 grimblast-git wf-recorder-git hyprpicker matugen-bin python-gpustat hyprsunset-git
```

### Fedora

Add [solopasha/hyprland](https://copr.fedorainfracloud.org/coprs/solopasha/hyprland/) for most hyprland-related dependencies, and hues-sueh/packages for matugen. Both provide the swww package, so prioritise the former repo:

##### AGS

First you must install AGSv2. You can find the instructions [here](https://aylur.github.io/ags/guide/install.html).

##### COPR

```sh
sudo dnf copr enable solopasha/hyprland
sudo dnf copr enable heus-sueh/packages
sudo dnf config-manager --save --setopt=copr:copr.fedorainfracloud.org:heus-sueh:packages.priority=200
```

##### DNF

```sh
sudo dnf install wireplumber upower libgtop2 bluez bluez-tools grimblast hyprpicker btop NetworkManager wl-clipboard swww brightnessctl gnome-bluetooth power-profiles-daemon gvfs nodejs gtksourceview3 libsoup3
```

##### npm

```sh
npm install -g sass
```

##### flatpak

```sh
flatpak install flathub --system com.dec05eba.gpu_screen_recorder
```

#### Optional Dependencies

##### pip

```sh
sudo dnf install python python3-pip; pip install gpustat pywal
```

### Installing HyprPanel

To install HyprPanel, you can run the following commands:

```bash
git clone https://github.com/Jas-SinghFSU/HyprPanel.git
cd HyprPanel
npm i
meson setup build
meson compile -C build
meson install -C build
```

### Installing NerdFonts

HyprPanel uses [Nerdfonts](https://www.nerdfonts.com/) to display icons. You can install them using the following command from within the HyprPanel's `scripts` directory:

```sh
# Installs the JetBrainsMono NerdFonts used for icons
./scripts/install_fonts.sh
```

If you install the fonts after installing HyprPanel, you will need to restart HyprPanel for the changes to take effect.

## Running HyprPanel

Once you have installed HyprPanel, you can run it by running the following command:

```bash
hyprpanel

# Or add it to your startup via
exec-once = hyprpanel
```

## NixOS

HyprPanel is available in nixpkgs and has a home-manager module, just enable
the `programs.hyprpanel.enable` option. Below is an example of some of the
options that are available.

```nix
{ inputs, ... }:
{
  programs.hyprpanel = {
    # Configure and theme almost all options from the GUI.
    # See 'https://hyprpanel.com/configuration/settings.html'.
    # Default: <same as gui>
    settings = {

      # Configure bar layouts for monitors.
      # See 'https://hyprpanel.com/configuration/panel.html'.
      # Default: null
      bar.layouts = {
        "0" = {
          left = [ "dashboard" "workspaces" ];
          middle = [ "media" ];
          right = [ "volume" "systray" "notifications" ];
        };
      };

      bar.launcher.autoDetectIcon = true;
      bar.workspaces.show_icons = true;

      menus.clock = {
        time = {
          military = true;
          hideSeconds = true;
        };
        weather.unit = "metric";
      };

      menus.dashboard.directories.enabled = false;
      menus.dashboard.stats.enable_gpu = true;

      theme.bar.transparent = true;

      theme.font = {
        name = "CaskaydiaCove NF";
        size = "16px";
      };
    };
  };
}
```

You can see all options that are unique to the home-manager module in their documentation:
https://nix-community.github.io/home-manager/options.xhtml#opt-programs.hyprpanel.enable

:warning: **Caveat**: Currently, updating the configuration through the GUI will
overwrite the `config.json` file by deleting it and creating a new one in its
place. This is obviously problematic for Home Manager which can only back up
files once to symlink the next generation config. Just make sure to remember
what you changed and try to find the corresponding option in the module's
settings. One nice tip is to copy `config.json` and do a `vimdiff` to see
exactly what the option path is. The JSON key will be the exact same as the
setting attribute, just without the double quotes.

You can start Hyprpanel with the following command:

```sh
hyprpanel
```

::: warning
HyprPanel handles notifications through the Astal notification service. If you're already using a notification daemon such as Dunst, Mako or SwayNC, you may have to stop them to prevent conflicts with HyprPanel. See also https://nix-community.github.io/home-manager/options.xhtml#opt-programs.hyprpanel.dontAssertNotificationDaemons
:::

### Latest dev version

HyprPanel in nixpkgs usually updates twice a month, but if you want to use latest development version, you can use flake that we provide.

```nix
# flake.nix
{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable"; # can be stable
    hyprpanel = {
      url = "github:Jas-SinghFSU/HyprPanel";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = inputs @ { ... }: let
    system = "x86_64-linux"; # change to whatever your system should be
  in {
    homeConfigurations."username@my-hostname" = home-manager.lib.homeManagerConfiguration {
      # you need this line
      extraSpecialArgs = { inherit inputs; };
    };
  };
}
```

And specify this in a file, where you configure HyprPanel:

```nix
{ inputs, pkgs, ...}: {
  programs.hyprpanel = {
    package = inputs.hyprpanel.packages.${pkgs.system}.default;
  };
}
```
