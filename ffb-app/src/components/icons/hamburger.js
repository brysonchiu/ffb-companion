export function IconHamburger({ settings, setSettings }) {
  const handleSettingsMenu = (settings) => {
    setSettings({
      ...settings,
      misc: {
        ...settings.misc,
        menu_open: true,
        menu_transition: true,
      },
    });
  };

  return (
    <button className="icon-humburger" onClick={() => handleSettingsMenu(settings)}>
      <svg width="33" height="28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.161 5.143h30.194c.641 0 1.161-.512 1.161-1.143V1.143c0-.631-.52-1.143-1.161-1.143H1.16C.52 0 0 .512 0 1.143V4c0 .631.52 1.143 1.161 1.143zm0 11.428h30.194c.641 0 1.161-.511 1.161-1.142V12.57c0-.63-.52-1.142-1.161-1.142H1.16C.52 11.429 0 11.94 0 12.57v2.858c0 .63.52 1.142 1.161 1.142zm0 11.429h30.194c.641 0 1.161-.512 1.161-1.143V24c0-.631-.52-1.143-1.161-1.143H1.16C.52 22.857 0 23.37 0 24v2.857C0 27.488.52 28 1.161 28z"
          fill="#00214D"
        />
      </svg>
    </button>
  );
}
