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
yay -S --needed aylurs-gtk-shell-git wireplumber libgtop bluez bluez-utils btop networkmanager dart-sass wl-clipboard brightnessctl swww python upower pacman-contrib power-profiles-daemon gvfs gtksourceview3 grimblast-git wf-recorder-git hyprpicker matugen-bin python-gpustat hyprsunset-git
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
sudo dnf install wireplumber upower libgtop2 bluez bluez-tools grimblast hyprpicker btop NetworkManager wl-clipboard swww brightnessctl gnome-bluetooth power-profiles-daemon gvfs nodejs
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

### NixOS & Home Manager

::: warning
NixOS instructions are pending updates for HyprPanel v2.
:::

Alternatively, if you're using NixOS and/or Home-Manager, you can setup AGS using the provided Nix Flake. First, add the repository to your Flake's inputs, and enable the overlay.

#### Example flake.nix without home-manager

```nix
{
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable"; # this can be stable, but if it is do not make hyprpanel follow it
    hyprpanel.url = "github:Jas-SinghFSU/HyprPanel";
  };
  # ...

  outputs = inputs @ {
    nixpkgs,
    ...
  }: let
    system = "x86_64-linux"; # change to whatever your system should be
  in {
    nixosConfigurations."${host}" = nixpkgs.lib.nixosSystem {
      specialArgs = {
        inherit system;
        inherit inputs;
      };
      modules = [
        {nixpkgs.overlays = [inputs.hyprpanel.overlay];}
      ];
    };
  };
}
```

#### Example flake.nix example with home-manager

```nix
{
  inputs = {
    hyprpanel.url = "github:Jas-SinghFSU/HyprPanel";
    home-manager.url = "github:nix-community/home-manager/master";
  };
  # ...

  outputs = inputs @ {
    home-manager,
    hyprpanel,
    ...
  }: let
    system = "x86_64-linux"; # change to whatever your system should be
  in {
    homeConfigurations."username@host" = home-manager.lib.homeManagerConfiguration {
      pkgs = import nixpkgs {
        inherit system;
        overlays = [
          inputs.hyprpanel.overlay
        ];
      };
      extraSpecialArgs = {
        inherit system;
        inherit inputs;
      };
    };
  };
}
```

Once you've set up the overlay, you can reference HyprPanel with `pkgs.hyprpanel` as if it were any other Nix package. This means you can reference it as a NixOS system/user package, a Home-Manager user package, or as a direct reference in your Hyprland configuration (if your configuration is managed by Home-Manager). The first three methods will add it to your `$PATH` (first globally, second two user-only), however the final will not.

**Make sure to** place `pkgs.hyprpanel` in `environment.systemPackages` or `home.packages`.

#### Home Manager module

If you want to configure HyprPanel with the Home Manager module instead, start from this section.

First, likewise with the overlay method, add HyprPanel to your flake.

```nix
# flake.nix
{
  inputs = {
    hyprpanel.url = "github:jas-singhfsu/hyprpanel";
    # If you're worried about mismatched versions
    # when using, e.g., `swww` from your own script,
    # you can also do the following.
    hyprpanel.inputs.nixpkgs.follows = "nixpkgs";
  };

  # ...
}
```

Next, import the Home Manager module and configure it as you wish.
Below is an example of some of the options that are available.

```nix
# *.nix
{ inputs, ... }:
{
  imports = [ inputs.hyprpanel.homeManagerModules.hyprpanel ];

  programs.hyprpanel = {

    # Enable the module.
    # Default: false
    enable = true;

    # Automatically restart HyprPanel with systemd.
    # Useful when updating your config so that you
    # don't need to manually restart it.
    # Default: false
    systemd.enable = true;

    # Add '/nix/store/.../hyprpanel' to your
    # Hyprland config 'exec-once'.
    # Default: false
    hyprland.enable = true;

    # Fix the overwrite issue with HyprPanel.
    # See below for more information.
    # Default: false
    overwrite.enable = true;

    # Import a theme from './themes/*.json'.
    # Default: ""
    theme = "gruvbox_split";

    # Override the final config with an arbitrary set.
    # Useful for overriding colors in your selected theme.
    # Default: {}
    override = {
      theme.bar.menus.text = "#123ABC";
    };

    # Configure bar layouts for monitors.
    # See 'https://hyprpanel.com/configuration/panel.html'.
    # Default: null
    layout = {
      "bar.layouts" = {
        "0" = {
          left = [ "dashboard" "workspaces" ];
          middle = [ "media" ];
          right = [ "volume" "systray" "notifications" ];
        };
      };
    };

    # Configure and theme almost all options from the GUI.
    # Options that require '{}' or '[]' are not yet implemented,
    # except for the layout above.
    # See 'https://hyprpanel.com/configuration/settings.html'.
    # Default: <same as gui>
    settings = {
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

:warning: **Caveat**: Currently, updating the configuration through the GUI will
overwrite the `config.json` file by deleting it and creating a new one in its
place. This is obviously problematic for Home Manager which can only back up
files once to symlink the next generation config. Hence, the `overwrite.enable`
option was implemented to automatically delete the file before generating a
new one. A big caveat to this is that configurations are no longer persistent,
which is expected of Home Manager, but at least you're able to see live changes
from the GUI. Just make sure to remember what you changed and try to find the
corresponding option in the module's settings. One nice tip is to copy
`config.json` and do a `vimdiff` to see exactly what the option path is.
The JSON key will be the exact same as the setting attribute, just without
the double quotes.

On Nix you can start Hyprpanel with the following command:

```sh
hyprpanel
```

::: warning
HyprPanel handles notifications through the Astal notification service. If you're already using a notification daemon such as Dunst, Mako or SwayNC, you may have to stop them to prevent conflicts with HyprPanel.
:::
