# Installation

## Arch

```bash
yay -S ags-hyprpanel-git
```

## From Source

### Dependencies

#### Required

```sh
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

### Arch

To install the dependencies on Arch, you can use the following commands:

##### pacman:

```bash
 sudo pacman -S --needed wireplumber libgtop bluez bluez-utils btop networkmanager dart-sass wl-clipboard brightnessctl swww python upower pacman-contrib power-profiles-daemon gvfs
```

##### AUR:

```bash
yay -S --needed grimblast-git gpu-screen-recorder-git hyprpicker matugen-bin python-gpustat hyprsunset-git hypridle-git
```

### Fedora

Add [solopasha/hyprland](https://copr.fedorainfracloud.org/coprs/solopasha/hyprland/) for most hyprland-related dependencies, and hues-sueh/packages for matugen. Both provide the swww package, so prioritise the former repo:

##### COPR

```sh
sudo dnf copr enable solopasha/hyprland
sudo dnf copr enable heus-sueh/packages
sudo dnf config-manager --save --setopt=copr:copr.fedorainfracloud.org:heus-sueh:packages.priority=200
```

##### DNF:

```sh
sudo dnf install wireplumber upower libgtop2 bluez bluez-tools grimblast hyprpicker btop NetworkManager wl-clipboard swww brightnessctl gnome-bluetooth aylurs-gtk-shell power-profiles-daemon gvfs nodejs
```

##### npm:

```sh
npm install -g sass
```

##### flatpak:

```sh
flatpak install flathub --system com.dec05eba.gpu_screen_recorder
```

#### Optional Dependencies

##### pip:

```sh
sudo dnf install python python3-pip; pip install gpustat pywal
```

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

If you install the fonts after installing HyperPanel, you will need to restart HyperPanel for the changes to take effect.

## Running HyprPanel

Once you have installed HyprPanel, you can run it by running the following command:

```bash
hyprpanel

# Or add it to your startup via
exec-once = hyprpanel
```

#### NixOS

On Nix you can start Hyprpanel with the following command:

```sh
hyprpanel
```

::: warning
HyprPanel handles notifications through the Astal notification service. If you're already using a notification daemon such as Dunst, Mako or SwayNC, you may have to stop them to prevent conflicts with HyprPanel.
:::
