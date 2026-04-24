import { Howl, Howler } from "howler";
import { SOUND_KEY, type SoundKey } from "../constants/sounds";

const sounds: Record<SoundKey, Howl> = {
    [SOUND_KEY.LEVER_DOWN]: new Howl({
        src: ["/src/shared/assets/sounds/lever_down.mp3"],
    }),
    [SOUND_KEY.SPIN_BUTTON]: new Howl({
        src: ["/src/shared/assets/sounds/spin_button.mp3"],
    }),
    [SOUND_KEY.SPINNING]: new Howl({
        src: ["/src/shared/assets/sounds/baraban_spinning.mp3"],
        loop: true,
    }),
    [SOUND_KEY.SLOT_REVEAL]: new Howl({
        src: ["/src/shared/assets/sounds/slot_reveal.mp3"],
    }),
    [SOUND_KEY.WIN]: new Howl({ src: ["/src/shared/assets/sounds/win.mp3"] }),
    [SOUND_KEY.LOSE]: new Howl({ src: ["/src/shared/assets/sounds/lose.mp3"] }),
    [SOUND_KEY.JACKPOT]: new Howl({
        src: ["/src/shared/assets/sounds/jackpot.mp3"],
    }),
    [SOUND_KEY.CHANGE_BET]: new Howl({
        src: ["/src/shared/assets/sounds/change_bet_click.mp3"],
    }),
};

export const soundService = {
    play: (key: SoundKey): void => {
        sounds[key].play();
    },
    stop: (key: SoundKey): void => {
        sounds[key].stop();
    },
    setMuted: (muted: boolean): void => {
        Howler.mute(muted);
    },
};
