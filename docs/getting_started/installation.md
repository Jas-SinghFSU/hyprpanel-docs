# Installation

HyprPanel has a few dependencies that need to be installed before you can use it. You can find a list of these dependencies below:

## Dependencies

### Bun

Bun is used to transpile and bundle HyprPanel. You can install it using the following command:

```sh
curl -fsSL https://bun.sh/install | bash && \
  sudo ln -s $HOME/.bun/bin/bun /usr/local/bin/bun
```

### Panel Dependencies

#### Required

```sh
pipewire
libgtop
bluez
bluez-utils
grimblast
gpu-screen-recorder
hyprpicker
btop
networkmanager
matugen
wl-clipboard
swww
dart-sass
brightnessctl
gnome-bluetooth-3.0
```

::: warning
HyprPanel will not run without the required dependencies.
:::

#### Optional

```sh
## Used for Tracking GPU Usage in your Dashboard (NVidia only)
python
python-gpustat

## Only if a pywal hook from wallpaper changes applied through settings is desired
pywal

## To check for pacman updates in the default script used in the updates module
pacman-contrib

## To switch between power profiles in the battery module
power-profiles-daemon
```

### Arch

To install the dependencies on Arch, you can use the following commands:

##### pacman:

```sh
sudo pacman -S pipewire libgtop bluez bluez-utils btop networkmanager dart-sass wl-clipboard brightnessctl swww python gnome-bluetooth-3.0 pacman-contrib power-profiles-daemon
```

##### AUR:

```sh

yay -S grimblast-git gpu-screen-recorder hyprpicker matugen-bin python-gpustat aylurs-gtk-shell-git
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
sudo dnf install pipewire libgtop2 bluez bluez-tools grimblast hyprpicker btop NetworkManager wl-clipboard swww brightnessctl gnome-bluetooth aylurs-gtk-shell power-profiles-daemon gvfs
```

##### bun:

```sh
bun install -g sass
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
    hyprpanel,
    ...
  }: let
	system = "x86_64-linux"; # change to whatever your system should be
  in {
    nixosConfigurations."${host}" = nixpkgs.lib.nixosSystem {
      pkgs = import nixpkgs {
        inherit system;
        overlays = [
          inputs.hyprpanel.overlay
        ];
      };
      specialArgs = {
        inherit system;
        inherit inputs;
      };
    };
  };
}
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
}
```

Once you've set up the overlay, you can reference HyprPanel with `pkgs.hyprpanel` as if it were any other Nix package. This means you can reference it as a NixOS system/user package, a Home-Manager user package, or as a direct reference in your Hyprland configuration (if your configuration is managed by Home-Manager). The first three methods will add it to your `$PATH` (first globally, second two user-only), however the final will not.

**Make sure to** place `pkgs.hyprpanel` in `environment.systemPackages` or `home.packages`.

## Installing NerdFonts

HyprPanel uses [Nerdfonts](https://www.nerdfonts.com/) to display icons. You can install them using the following command from within the HyprPanel directory:

```sh
# Installs the JetBrainsMono NerdFonts used for icons
./install_fonts.sh
```

If you install the fonts after installing HyperPanel, you will need to restart HyperPanel for the changes to take effect.

## Running HyprPanel

Once you've installed the dependencies, you must put the contents of the `HyprPanel` repository in your `~/.config/ags` directory. The command to do this is provided below.

If you already have something in that directory, it is recommended that you back it up with the following command:

```sh
# Moves the current ~/.config/ags directory to ~/.config/ags.bkup
mv $HOME/.config/ags $HOME/.config/ags.bkup
```

You can then install HyprPanel with the following command:

```sh
# Installs HyprPanel to ~/.config/ags
git clone https://github.com/Jas-SinghFSU/HyprPanel.git && \
  ln -s $(pwd)/HyprPanel $HOME/.config/ags
```

### Launching the panel

Once you've installed HyprPanel, you can launch it using the following command:

```sh
ags
```

### Launching the panel on startup

To launch the panel on startup, you can add the following line to your `~/.config/hypr/hyprland.conf` file:

```sh
exec-once = ags
```

This will automatically launch HyprPanel on Hyprland startup.

::: warning
HyprPanel handles notifications through the AGS built-in notification service. If you're already using a notification daemon such as Dunst, Mako or SwayNC, you may have to stop them to prevent conflicts with HyprPanel.
:::
