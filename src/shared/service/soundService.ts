import { Howl, Howler } from "howler";
import { SOUND_KEY, type SoundKey } from "../constants/sounds";

import leverDownSrc from "../assets/sounds/lever_down.mp3";
import spinButtonSrc from "../assets/sounds/spin_button.mp3";
import spinningSrc from "../assets/sounds/baraban_spinning.mp3";
import slotRevealSrc from "../assets/sounds/slot_reveal.mp3";
import winSrc from "../assets/sounds/win.mp3";
import loseSrc from "../assets/sounds/lose.mp3";
import jackpotSrc from "../assets/sounds/jackpot.mp3";
import changeBetSrc from "../assets/sounds/change_bet_click.mp3";

const sounds: Record<SoundKey, Howl> = {
    [SOUND_KEY.LEVER_DOWN]: new Howl({ src: [leverDownSrc] }),
    [SOUND_KEY.SPIN_BUTTON]: new Howl({ src: [spinButtonSrc] }),
    [SOUND_KEY.SPINNING]: new Howl({ src: [spinningSrc], loop: true }),
    [SOUND_KEY.SLOT_REVEAL]: new Howl({ src: [slotRevealSrc] }),
    [SOUND_KEY.WIN]: new Howl({ src: [winSrc] }),
    [SOUND_KEY.LOSE]: new Howl({ src: [loseSrc] }),
    [SOUND_KEY.JACKPOT]: new Howl({ src: [jackpotSrc] }),
    [SOUND_KEY.CHANGE_BET]: new Howl({ src: [changeBetSrc] }),
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
